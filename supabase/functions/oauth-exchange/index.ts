
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OAuthExchangeRequest {
  platform: string;
  code: string;
  state: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { platform, code, state }: OAuthExchangeRequest = await req.json()

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    
    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    // Get OAuth app configuration
    const { data: oauthApp, error: appError } = await supabase
      .from('oauth_apps')
      .select('*')
      .eq('platform', platform)
      .eq('is_active', true)
      .single()

    if (appError || !oauthApp) {
      throw new Error(`OAuth app not configured for ${platform}`)
    }

    // Verify state token
    const { data: socialAccount, error: accountError } = await supabase
      .from('social_accounts')
      .select('oauth_state')
      .eq('user_id', user.id)
      .eq('platform', platform)
      .single()

    if (accountError || socialAccount?.oauth_state !== state) {
      throw new Error('Invalid state token')
    }

    // Exchange code for access token based on platform
    let tokenData;
    switch (platform) {
      case 'twitter':
        tokenData = await exchangeTwitterCode(code, oauthApp)
        break
      case 'facebook':
        tokenData = await exchangeFacebookCode(code, oauthApp)
        break
      case 'linkedin':
        tokenData = await exchangeLinkedInCode(code, oauthApp)
        break
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }

    // Get user profile data from the social platform
    const profileData = await getUserProfile(platform, tokenData.access_token)

    // Store encrypted tokens and profile data
    const { error: updateError } = await supabase
      .from('social_accounts')
      .upsert({
        user_id: user.id,
        platform,
        account_name: profileData.name,
        account_username: profileData.username,
        followers_count: profileData.followers_count || 0,
        oauth_user_id: profileData.id,
        oauth_username: profileData.username,
        is_connected: true,
        // Note: In production, encrypt these tokens before storing
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        token_expires_at: tokenData.expires_at ? new Date(tokenData.expires_at).toISOString() : null,
        last_synced_at: new Date().toISOString(),
        oauth_state: null // Clear the state token
      })

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('OAuth exchange error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})

async function exchangeTwitterCode(code: string, oauthApp: any) {
  const tokenUrl = 'https://api.twitter.com/2/oauth2/token'
  
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${oauthApp.client_id}:${oauthApp.client_secret}`)}`
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: oauthApp.redirect_uri,
      code_verifier: 'challenge', // In production, use proper PKCE
    })
  })

  if (!response.ok) {
    throw new Error('Failed to exchange Twitter code for token')
  }

  return await response.json()
}

async function exchangeFacebookCode(code: string, oauthApp: any) {
  const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token`
  
  const response = await fetch(tokenUrl + '?' + new URLSearchParams({
    client_id: oauthApp.client_id,
    client_secret: oauthApp.client_secret,
    redirect_uri: oauthApp.redirect_uri,
    code: code
  }))

  if (!response.ok) {
    throw new Error('Failed to exchange Facebook code for token')
  }

  return await response.json()
}

async function exchangeLinkedInCode(code: string, oauthApp: any) {
  const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken'
  
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: oauthApp.redirect_uri,
      client_id: oauthApp.client_id,
      client_secret: oauthApp.client_secret,
    })
  })

  if (!response.ok) {
    throw new Error('Failed to exchange LinkedIn code for token')
  }

  return await response.json()
}

async function getUserProfile(platform: string, accessToken: string) {
  switch (platform) {
    case 'twitter':
      const twitterResponse = await fetch('https://api.twitter.com/2/users/me?user.fields=public_metrics', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      const twitterData = await twitterResponse.json()
      return {
        id: twitterData.data.id,
        name: twitterData.data.name,
        username: `@${twitterData.data.username}`,
        followers_count: twitterData.data.public_metrics?.followers_count || 0
      }

    case 'facebook':
      const facebookResponse = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${accessToken}`)
      const facebookData = await facebookResponse.json()
      return {
        id: facebookData.id,
        name: facebookData.name,
        username: `@${facebookData.name.toLowerCase().replace(/\s+/g, '')}`,
        followers_count: 0 // Facebook doesn't provide follower count in basic API
      }

    case 'linkedin':
      const linkedinResponse = await fetch('https://api.linkedin.com/v2/people/~:(id,firstName,lastName)', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
      const linkedinData = await linkedinResponse.json()
      const fullName = `${linkedinData.firstName.localized.en_US} ${linkedinData.lastName.localized.en_US}`
      return {
        id: linkedinData.id,
        name: fullName,
        username: `@${fullName.toLowerCase().replace(/\s+/g, '')}`,
        followers_count: 0 // LinkedIn requires additional permissions for connection count
      }

    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }
}

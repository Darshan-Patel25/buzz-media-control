import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OAuthInitRequest {
  platform: string;
}

const OAUTH_CONFIG = {
  twitter: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    scope: 'tweet.read tweet.write users.read offline.access',
    responseType: 'code',
    codeChallenge: 'challenge' // In production, use proper PKCE
  },
  facebook: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scope: 'pages_manage_posts,pages_read_engagement,pages_show_list',
    responseType: 'code'
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scope: 'w_member_social r_liteprofile',
    responseType: 'code'
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { platform }: OAuthInitRequest = await req.json()

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

    // Generate state token for security
    const stateToken = crypto.randomUUID()
    
    // Get or create OAuth app configuration for demo
    const mockClientId = `demo_${platform}_client_id`
    const redirectUri = `${Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '')}/functions/v1/oauth-callback/${platform}`
    
    // Store state token in social account
    const { error: updateError } = await supabase
      .from('social_accounts')
      .upsert({
        user_id: user.id,
        platform,
        account_name: `Connecting ${platform}...`,
        account_username: `@${platform}_user`,
        oauth_state: stateToken,
        is_connected: false
      }, {
        onConflict: 'user_id,platform'
      })

    if (updateError) {
      throw updateError
    }

    // Get platform configuration
    const config = OAUTH_CONFIG[platform as keyof typeof OAUTH_CONFIG]
    if (!config) {
      throw new Error(`Unsupported platform: ${platform}`)
    }

    // Build authorization URL
    const params = new URLSearchParams({
      client_id: mockClientId,
      redirect_uri: redirectUri,
      scope: config.scope,
      response_type: config.responseType,
      state: stateToken,
      ...(platform === 'twitter' && { code_challenge: config.codeChallenge, code_challenge_method: 'plain' })
    })

    const authUrl = `${config.authUrl}?${params.toString()}`

    return new Response(
      JSON.stringify({ 
        success: true,
        auth_url: authUrl,
        state: stateToken,
        platform
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('OAuth initiate error:', error)
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
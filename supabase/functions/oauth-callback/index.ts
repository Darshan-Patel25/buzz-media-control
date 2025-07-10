import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const platform = url.pathname.split('/').pop()
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const error = url.searchParams.get('error')

    if (error) {
      return new Response(`
        <html>
          <body>
            <script>
              window.opener?.postMessage({
                type: 'OAUTH_ERROR',
                platform: '${platform}',
                error: '${error}'
              }, '*');
              window.close();
            </script>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      })
    }

    if (!code || !state || !platform) {
      throw new Error('Missing required parameters')
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Find user by state token
    const { data: socialAccount, error: findError } = await supabase
      .from('social_accounts')
      .select('user_id, oauth_state')
      .eq('platform', platform)
      .eq('oauth_state', state)
      .single()

    if (findError || !socialAccount) {
      throw new Error('Invalid state token or expired session')
    }

    // Simulate token exchange and profile fetch (demo mode)
    const mockProfileData = {
      twitter: {
        id: `tw_${Date.now()}`,
        name: 'John Doe',
        username: '@johndoe',
        followers_count: Math.floor(Math.random() * 10000)
      },
      facebook: {
        id: `fb_${Date.now()}`,
        name: 'Jane Smith',
        username: '@janesmith',
        followers_count: Math.floor(Math.random() * 5000)
      },
      linkedin: {
        id: `li_${Date.now()}`,
        name: 'Alex Johnson',
        username: '@alexjohnson',
        followers_count: Math.floor(Math.random() * 3000)
      }
    }

    const profileData = mockProfileData[platform as keyof typeof mockProfileData]
    
    if (!profileData) {
      throw new Error(`Unsupported platform: ${platform}`)
    }

    // Update social account with profile data
    const { error: updateError } = await supabase
      .from('social_accounts')
      .update({
        account_name: profileData.name,
        account_username: profileData.username,
        followers_count: profileData.followers_count,
        oauth_user_id: profileData.id,
        oauth_username: profileData.username,
        is_connected: true,
        access_token: `demo_access_token_${Date.now()}`,
        refresh_token: `demo_refresh_token_${Date.now()}`,
        last_synced_at: new Date().toISOString(),
        oauth_state: null // Clear state token
      })
      .eq('user_id', socialAccount.user_id)
      .eq('platform', platform)

    if (updateError) {
      throw updateError
    }

    // Return success page that communicates with parent window
    return new Response(`
      <html>
        <head>
          <title>Authentication Successful</title>
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container { 
              background: white; 
              padding: 2rem; 
              border-radius: 10px; 
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 400px;
            }
            .success-icon { 
              font-size: 3rem; 
              color: #10b981; 
              margin-bottom: 1rem; 
            }
            h1 { color: #1f2937; margin-bottom: 0.5rem; }
            p { color: #6b7280; margin-bottom: 1.5rem; }
            .platform { color: #3b82f6; font-weight: 600; text-transform: capitalize; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✅</div>
            <h1>Successfully Connected!</h1>
            <p>Your <span class="platform">${platform}</span> account has been connected successfully.</p>
            <p>You can close this window now.</p>
          </div>
          <script>
            // Send success message to parent window
            if (window.opener) {
              window.opener.postMessage({
                type: 'OAUTH_SUCCESS',
                platform: '${platform}',
                data: {
                  name: '${profileData.name}',
                  username: '${profileData.username}',
                  followers_count: ${profileData.followers_count}
                }
              }, '*');
            }
            
            // Auto-close after 3 seconds
            setTimeout(() => {
              window.close();
            }, 3000);
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })

  } catch (error) {
    console.error('OAuth callback error:', error)
    
    return new Response(`
      <html>
        <head>
          <title>Authentication Failed</title>
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              min-height: 100vh; 
              margin: 0;
              background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
            }
            .container { 
              background: white; 
              padding: 2rem; 
              border-radius: 10px; 
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 400px;
            }
            .error-icon { 
              font-size: 3rem; 
              color: #ef4444; 
              margin-bottom: 1rem; 
            }
            h1 { color: #1f2937; margin-bottom: 0.5rem; }
            p { color: #6b7280; margin-bottom: 1.5rem; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-icon">❌</div>
            <h1>Authentication Failed</h1>
            <p>There was an error connecting your account. Please try again.</p>
            <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
          <script>
            setTimeout(() => window.close(), 5000);
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    })
  }
})
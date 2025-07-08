
-- Add OAuth token storage columns to social_accounts table if not already present
ALTER TABLE public.social_accounts 
ADD COLUMN IF NOT EXISTS access_token_encrypted TEXT,
ADD COLUMN IF NOT EXISTS refresh_token_encrypted TEXT,
ADD COLUMN IF NOT EXISTS token_salt TEXT,
ADD COLUMN IF NOT EXISTS oauth_state TEXT;

-- Create OAuth apps configuration table for storing platform credentials
CREATE TABLE IF NOT EXISTS public.oauth_apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL UNIQUE,
  client_id TEXT NOT NULL,
  client_secret_encrypted TEXT NOT NULL,
  redirect_uri TEXT NOT NULL,
  scopes TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on oauth_apps table
ALTER TABLE public.oauth_apps ENABLE ROW LEVEL SECURITY;

-- Only allow service role to manage OAuth apps (admin only)
CREATE POLICY "Service role can manage OAuth apps" ON public.oauth_apps
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to initiate OAuth flow
CREATE OR REPLACE FUNCTION public.initiate_oauth_flow(
  platform_name TEXT,
  user_id_param UUID
) RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  app_config RECORD;
  auth_url TEXT;
  state_token TEXT;
BEGIN
  -- Get OAuth app configuration
  SELECT * INTO app_config FROM public.oauth_apps 
  WHERE platform = platform_name AND is_active = true;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'OAuth app not configured for platform: %', platform_name;
  END IF;
  
  -- Generate state token for security
  state_token := encode(gen_random_bytes(32), 'hex');
  
  -- Store state token temporarily (you might want to use a separate table for this)
  UPDATE public.social_accounts 
  SET oauth_state = state_token 
  WHERE user_id = user_id_param AND platform = platform_name;
  
  -- Build authorization URL based on platform
  CASE platform_name
    WHEN 'twitter' THEN
      auth_url := 'https://twitter.com/i/oauth2/authorize?response_type=code&client_id=' || 
                  app_config.client_id || '&redirect_uri=' || 
                  app_config.redirect_uri || '&scope=' || 
                  array_to_string(app_config.scopes, ' ') || '&state=' || state_token;
    WHEN 'facebook' THEN
      auth_url := 'https://www.facebook.com/v18.0/dialog/oauth?client_id=' || 
                  app_config.client_id || '&redirect_uri=' || 
                  app_config.redirect_uri || '&scope=' || 
                  array_to_string(app_config.scopes, ',') || '&state=' || state_token;
    WHEN 'linkedin' THEN
      auth_url := 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=' || 
                  app_config.client_id || '&redirect_uri=' || 
                  app_config.redirect_uri || '&scope=' || 
                  array_to_string(app_config.scopes, ' ') || '&state=' || state_token;
    ELSE
      RAISE EXCEPTION 'Unsupported platform: %', platform_name;
  END CASE;
  
  RETURN json_build_object(
    'auth_url', auth_url,
    'state', state_token,
    'platform', platform_name
  );
END;
$$;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to oauth_apps table if not exists
DROP TRIGGER IF EXISTS update_oauth_apps_updated_at ON public.oauth_apps;
CREATE TRIGGER update_oauth_apps_updated_at
  BEFORE UPDATE ON public.oauth_apps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

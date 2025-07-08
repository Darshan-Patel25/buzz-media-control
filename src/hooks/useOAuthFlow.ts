
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts, useUpdateSocialAccount } from '@/hooks/useSupabaseData';
import { SocialPlatform } from '@/types';

interface OAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
  authUrl: string;
}

const OAUTH_CONFIGS: Record<SocialPlatform, Partial<OAuthConfig>> = {
  twitter: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    scope: 'tweet.read tweet.write users.read offline.access',
  },
  facebook: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scope: 'pages_manage_posts,pages_read_engagement,publish_to_groups',
  },
  linkedin: {
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scope: 'w_member_social,r_basicprofile',
  },
  instagram: {
    authUrl: 'https://api.instagram.com/oauth/authorize',
    scope: 'user_profile,user_media',
  },
  youtube: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'https://www.googleapis.com/auth/youtube.upload',
  },
  tiktok: {
    authUrl: 'https://www.tiktok.com/auth/authorize/',
    scope: 'user.info.basic,video.upload',
  },
  telegram: {
    authUrl: 'https://telegram.org/oauth/authorize',
    scope: 'bot',
  },
  pinterest: {
    authUrl: 'https://www.pinterest.com/oauth/',
    scope: 'read_public,write_public',
  },
  tumblr: {
    authUrl: 'https://www.tumblr.com/oauth/authorize',
    scope: 'write',
  },
};

export const useOAuthFlow = () => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const { toast } = useToast();
  const { refetch } = useSocialAccounts();
  const updateAccountMutation = useUpdateSocialAccount();

  const initiateOAuth = useCallback(async (platform: SocialPlatform) => {
    setIsConnecting(platform);
    
    try {
      const config = OAUTH_CONFIGS[platform];
      if (!config) {
        throw new Error(`OAuth not configured for ${platform}`);
      }

      // In a real implementation, these would come from environment variables
      // For now, we'll show a message about configuration needed
      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        toast({
          title: "OAuth Configuration Needed",
          description: `Please configure OAuth credentials for ${platform} in your environment variables.`,
          variant: "destructive",
        });
        return;
      }

      const state = generateRandomState();
      const redirectUri = `${window.location.origin}/auth/${platform}/callback`;
      
      const authUrl = new URL(config.authUrl!);
      authUrl.searchParams.set('client_id', process.env[`VITE_${platform.toUpperCase()}_CLIENT_ID`] || '');
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', config.scope!);
      authUrl.searchParams.set('state', state);
      authUrl.searchParams.set('response_type', 'code');

      // Store state for validation
      sessionStorage.setItem(`oauth_state_${platform}`, state);

      // Open OAuth popup
      const popup = window.open(
        authUrl.toString(),
        'oauth',
        'width=600,height=600,scrollbars=yes,resizable=yes'
      );

      // Listen for OAuth callback
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'OAUTH_SUCCESS' && event.data.platform === platform) {
          const { data } = event.data;
          
          // Validate state
          const storedState = sessionStorage.getItem(`oauth_state_${platform}`);
          if (data.state !== storedState) {
            throw new Error('Invalid OAuth state');
          }

          // Exchange code for access token (this would typically be done on the backend)
          handleOAuthSuccess(platform, data);
          popup?.close();
          window.removeEventListener('message', handleMessage);
          sessionStorage.removeItem(`oauth_state_${platform}`);
        } else if (event.data.type === 'OAUTH_ERROR') {
          throw new Error(event.data.error);
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Clean up if popup is closed manually
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsConnecting(null);
          sessionStorage.removeItem(`oauth_state_${platform}`);
        }
      }, 1000);

    } catch (error) {
      console.error('OAuth error:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(null);
    }
  }, [toast, updateAccountMutation]);

  const handleOAuthSuccess = async (platform: SocialPlatform, data: any) => {
    try {
      // In a real implementation, this would call your backend to exchange the code for tokens
      // For now, we'll simulate the process
      const mockAccountData = {
        name: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Account`,
        username: `@${platform}user`,
        followers_count: Math.floor(Math.random() * 10000),
        access_token: data.code,
      };

      toast({
        title: "Account Connected",
        description: `Successfully connected your ${platform} account!`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to complete account connection. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    initiateOAuth,
    isConnecting,
  };
};

function generateRandomState(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

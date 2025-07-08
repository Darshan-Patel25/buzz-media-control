
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts, useUpdateSocialAccount } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { SocialPlatform } from '@/types';

export const useOAuthFlow = () => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const { toast } = useToast();
  const { refetch } = useSocialAccounts();
  const updateAccountMutation = useUpdateSocialAccount();
  const { user } = useAuth();

  const initiateOAuth = useCallback(async (platform: SocialPlatform) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to connect social media accounts.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(platform);
    
    try {
      // Call Supabase function to initiate OAuth flow
      const { data, error } = await supabase.rpc('initiate_oauth_flow', {
        platform_name: platform,
        user_id_param: user.id
      });

      if (error) {
        throw error;
      }

      if (!data || !data.auth_url) {
        throw new Error(`OAuth not configured for ${platform}. Please set up OAuth credentials first.`);
      }

      // Open OAuth popup with the URL from database
      const popup = window.open(
        data.auth_url,
        'oauth',
        'width=600,height=600,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // Listen for OAuth callback
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'OAUTH_SUCCESS' && event.data.platform === platform) {
          const { data: callbackData } = event.data;
          
          // Validate state token for security
          if (callbackData.state !== data.state) {
            throw new Error('Invalid OAuth state - possible CSRF attack');
          }

          // Handle successful OAuth
          handleOAuthSuccess(platform, callbackData);
          popup.close();
          window.removeEventListener('message', handleMessage);
        } else if (event.data.type === 'OAUTH_ERROR') {
          throw new Error(event.data.error);
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Clean up if popup is closed manually
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsConnecting(null);
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
  }, [toast, user, refetch]);

  const handleOAuthSuccess = async (platform: SocialPlatform, data: any) => {
    try {
      // Call edge function to exchange code for tokens
      const { data: result, error } = await supabase.functions.invoke('oauth-exchange', {
        body: {
          platform,
          code: data.code,
          state: data.state
        }
      });

      if (error) throw error;

      if (result.success) {
        toast({
          title: "Account Connected",
          description: `Successfully connected your ${platform} account!`,
        });
        
        refetch();
      } else {
        throw new Error(result.error || 'Failed to exchange OAuth code');
      }
    } catch (error) {
      console.error('OAuth exchange error:', error);
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

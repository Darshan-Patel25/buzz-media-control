
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts, useConnectSocialAccount } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { SocialPlatform } from '@/types';

interface OAuthResponse {
  auth_url: string;
  state: string;
  platform: string;
}

export const useOAuthFlow = () => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const { toast } = useToast();
  const { refetch } = useSocialAccounts();
  const connectAccountMutation = useConnectSocialAccount();
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
      // Call our edge function to initiate OAuth
      const { data, error } = await supabase.functions.invoke('oauth-initiate', {
        body: { platform }
      });

      if (error) throw error;

      const { auth_url, state } = data;

      // Open OAuth popup
      const popup = window.open(
        auth_url,
        `oauth_${platform}`,
        'width=600,height=700,scrollbars=yes,resizable=yes'
      );

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // Listen for OAuth completion
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'OAUTH_SUCCESS' && event.data.platform === platform) {
          window.removeEventListener('message', handleMessage);
          
          toast({
            title: "Account Connected",
            description: `Successfully connected your ${platform} account!`,
          });
          
          refetch();
          setIsConnecting(null);
        } else if (event.data.type === 'OAUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          
          toast({
            title: "Connection Failed",
            description: event.data.error || "Failed to connect account.",
            variant: "destructive",
          });
          
          setIsConnecting(null);
        }
      };

      window.addEventListener('message', handleMessage);

      // Check if popup was closed manually
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsConnecting(null);
        }
      }, 1000);

    } catch (error) {
      console.error('OAuth initiate error:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to initiate OAuth flow.",
        variant: "destructive",
      });
      setIsConnecting(null);
    }
  }, [toast, user, refetch]);

  return {
    initiateOAuth,
    isConnecting,
  };
};

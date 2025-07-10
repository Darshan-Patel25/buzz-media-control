
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
      // For demo purposes, simulate OAuth flow without real API keys
      // In production, you would call the real OAuth endpoints
      const mockOAuthData: OAuthResponse = {
        auth_url: `https://mock-oauth.example.com/${platform}/authorize?state=demo123`,
        state: 'demo123',
        platform: platform
      };

      // Simulate OAuth popup
      const confirmed = window.confirm(
        `This would normally open ${platform} OAuth in a popup. Click OK to simulate successful connection.`
      );

      if (confirmed) {
        // Simulate successful OAuth callback
        await handleOAuthSuccess(platform, {
          code: 'mock_auth_code',
          state: 'demo123'
        });
      }

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
      // Simulate successful account connection with mock data
      const mockProfileData = {
        twitter: {
          name: 'Twitter User',
          username: '@twitter_user',
          followers_count: 1250
        },
        facebook: {
          name: 'Facebook User',
          username: '@facebook_user',
          followers_count: 850
        },
        linkedin: {
          name: 'LinkedIn User',
          username: '@linkedin_user',
          followers_count: 500
        },
        instagram: {
          name: 'Instagram User',
          username: '@instagram_user',
          followers_count: 2100
        }
      };

      const profileData = mockProfileData[platform] || {
        name: `${platform} User`,
        username: `@${platform}_user`,
        followers_count: 100
      };

      // Create social account with mock data
      await connectAccountMutation.mutateAsync({
        platform,
        account_name: profileData.name,
        account_username: profileData.username,
        followers_count: profileData.followers_count
      });

      toast({
        title: "Account Connected",
        description: `Successfully connected your ${platform} account!`,
      });
      
      refetch();
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

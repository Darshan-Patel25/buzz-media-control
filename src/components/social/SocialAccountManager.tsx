
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts, useUpdateSocialAccount } from '@/hooks/useSupabaseData';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';

interface SocialAccountManagerProps {
  onAccountConnected?: () => void;
}

const SocialAccountManager: React.FC<SocialAccountManagerProps> = ({ onAccountConnected }) => {
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const { data: socialAccounts = [], refetch } = useSocialAccounts();
  const updateAccountMutation = useUpdateSocialAccount();
  const { toast } = useToast();

  const platforms = [
    {
      id: 'twitter' as SocialPlatform,
      name: 'Twitter',
      description: 'Connect your Twitter account to post tweets',
      authUrl: 'https://api.twitter.com/oauth/authorize',
      available: true
    },
    {
      id: 'facebook' as SocialPlatform,
      name: 'Facebook',
      description: 'Connect your Facebook page to post updates',
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
      available: true
    },
    {
      id: 'linkedin' as SocialPlatform,
      name: 'LinkedIn',
      description: 'Connect your LinkedIn profile to share posts',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
      available: true
    },
    {
      id: 'instagram' as SocialPlatform,
      name: 'Instagram',
      description: 'Connect your Instagram account (via Facebook)',
      authUrl: 'https://api.instagram.com/oauth/authorize',
      available: false // Requires business verification
    }
  ];

  const handleConnect = async (platform: SocialPlatform) => {
    setIsConnecting(platform);
    
    try {
      // For demo purposes, simulate OAuth flow
      // In production, this would redirect to the actual OAuth URL
      const authWindow = window.open(
        `/auth/${platform}`,
        'auth',
        'width=600,height=600,scrollbars=yes,resizable=yes'
      );

      // Listen for OAuth callback
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'OAUTH_SUCCESS') {
          const { platform: connectedPlatform, data } = event.data;
          
          if (connectedPlatform === platform) {
            // Update or create social account
            const existingAccount = socialAccounts.find(
              account => account.platform === platform
            );

            if (existingAccount) {
              updateAccountMutation.mutate({
                id: existingAccount.id,
                is_connected: true,
                account_name: data.name,
                account_username: data.username,
                followers_count: data.followers_count || 0
              });
            }

            toast({
              title: "Account Connected",
              description: `Successfully connected your ${platform} account!`,
            });

            authWindow?.close();
            onAccountConnected?.();
            refetch();
          }
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Clean up listener when window closes
      const checkClosed = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsConnecting(null);
        }
      }, 1000);

    } catch (error) {
      console.error('OAuth error:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = async (accountId: string, platform: string) => {
    try {
      await updateAccountMutation.mutateAsync({
        id: accountId,
        is_connected: false
      });

      toast({
        title: "Account Disconnected",
        description: `Successfully disconnected your ${platform} account.`,
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Connect Social Accounts</h2>
        <p className="text-muted-foreground">
          Connect your social media accounts to start posting and managing your content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {platforms.map((platform) => {
          const connectedAccount = socialAccounts.find(
            account => account.platform === platform.id && account.is_connected
          );
          const isConnected = !!connectedAccount;

          return (
            <Card key={platform.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <SocialIcon platform={platform.id} size={32} />
                  <div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{connectedAccount.account_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {connectedAccount.account_username}
                        </p>
                        {connectedAccount.followers_count && (
                          <p className="text-xs text-muted-foreground">
                            {connectedAccount.followers_count.toLocaleString()} followers
                          </p>
                        )}
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Connected
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisconnect(connectedAccount.id, platform.name)}
                      className="w-full"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleConnect(platform.id)}
                      disabled={!platform.available || isConnecting === platform.id}
                      className="w-full"
                    >
                      {isConnecting === platform.id ? 'Connecting...' : `Connect ${platform.name}`}
                    </Button>
                    {!platform.available && (
                      <p className="text-xs text-muted-foreground">
                        Coming soon - requires business verification
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm font-medium">!</span>
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">OAuth Setup Required</h3>
              <p className="text-sm text-blue-800 mb-3">
                To connect real social media accounts, you'll need to set up OAuth applications 
                for each platform and configure the redirect URLs.
              </p>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>Twitter:</strong> Create an app at developer.twitter.com</p>
                <p><strong>Facebook:</strong> Create an app at developers.facebook.com</p>
                <p><strong>LinkedIn:</strong> Create an app at developer.linkedin.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialAccountManager;

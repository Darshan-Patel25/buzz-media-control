
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts, useUpdateSocialAccount } from '@/hooks/useSupabaseData';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { useOAuthFlow } from '@/hooks/useOAuthFlow';
import OAuthSetupGuide from './OAuthSetupGuide';

interface SocialAccountManagerProps {
  onAccountConnected?: () => void;
}

const SocialAccountManager: React.FC<SocialAccountManagerProps> = ({ onAccountConnected }) => {
  const { data: socialAccounts = [], refetch } = useSocialAccounts();
  const updateAccountMutation = useUpdateSocialAccount();
  const { toast } = useToast();
  const { initiateOAuth, isConnecting } = useOAuthFlow();

  const platforms = [
    {
      id: 'twitter' as SocialPlatform,
      name: 'Twitter',
      description: 'Connect your Twitter account to post tweets',
      available: true
    },
    {
      id: 'facebook' as SocialPlatform,
      name: 'Facebook',
      description: 'Connect your Facebook page to post updates',
      available: true
    },
    {
      id: 'linkedin' as SocialPlatform,
      name: 'LinkedIn',
      description: 'Connect your LinkedIn profile to share posts',
      available: true
    },
    {
      id: 'instagram' as SocialPlatform,
      name: 'Instagram',
      description: 'Connect your Instagram account (via Facebook)',
      available: false // Requires business verification
    }
  ];

  const handleConnect = async (platform: SocialPlatform) => {
    try {
      await initiateOAuth(platform);
      onAccountConnected?.();
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect account. Please try again.",
        variant: "destructive",
      });
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

      <OAuthSetupGuide />

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
    </div>
  );
};

export default SocialAccountManager;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useSocialAccounts, useUpdateSocialAccount } from '@/hooks/useSupabaseData';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { useOAuthFlow } from '@/hooks/useOAuthFlow';
import { useAuth } from '@/contexts/AuthContext';

interface SocialAccountManagerProps {
  onAccountConnected?: () => void;
}

const SocialAccountManager: React.FC<SocialAccountManagerProps> = ({ onAccountConnected }) => {
  const { data: socialAccounts = [], refetch } = useSocialAccounts();
  const updateAccountMutation = useUpdateSocialAccount();
  const { toast } = useToast();
  const { initiateOAuth, isConnecting } = useOAuthFlow();
  const { user } = useAuth();

  const platforms = [
    {
      id: 'twitter' as SocialPlatform,
      name: 'Twitter',
      description: 'Connect your Twitter account to post tweets and engage with your audience',
      available: true,
      features: ['Post tweets', 'Schedule content', 'View analytics']
    },
    {
      id: 'facebook' as SocialPlatform,
      name: 'Facebook',
      description: 'Connect your Facebook page to post updates and manage your presence',
      available: true,
      features: ['Post updates', 'Manage pages', 'View insights']
    },
    {
      id: 'linkedin' as SocialPlatform,
      name: 'LinkedIn',
      description: 'Connect your LinkedIn profile to share professional content',
      available: true,
      features: ['Share posts', 'Professional networking', 'Business content']
    },
    {
      id: 'instagram' as SocialPlatform,
      name: 'Instagram',
      description: 'Connect your Instagram account for photos and stories',
      available: true,
      features: ['Photo/video posts', 'Stories', 'Reels']
    }
  ];

  const handleConnect = async (platform: SocialPlatform) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to connect social media accounts.",
        variant: "destructive",
      });
      return;
    }

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

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Please log in to manage your social media accounts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Connect Social Media Accounts</h2>
        <p className="text-muted-foreground">
          Connect your social media accounts to start posting and managing your content directly.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">i</span>
          </div>
          <div>
            <p className="text-blue-900 font-medium text-sm">Demo Mode</p>
            <p className="text-blue-800 text-sm mt-1">
              This demonstration simulates social media account connections. 
              In a production environment, you would set up real OAuth applications 
              with each social media platform to enable actual API access.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
                  <div className="space-y-4">
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
                        {connectedAccount.last_synced_at && (
                          <p className="text-xs text-muted-foreground">
                            Last synced: {new Date(connectedAccount.last_synced_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Connected
                      </span>
                    </div>
                    
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-2">Available features:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {platform.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
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
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <p className="text-sm font-medium mb-2">Features you'll get:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {platform.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting === platform.id}
                      className="w-full"
                    >
                      {isConnecting === platform.id ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Connecting...
                        </div>
                      ) : (
                        `Connect ${platform.name}`
                      )}
                    </Button>
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

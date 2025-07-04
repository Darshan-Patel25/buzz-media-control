
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { useDisconnectSocialAccount } from '@/hooks/useSupabaseData';
import { useToast } from '@/hooks/use-toast';

interface ConnectedAccountCardProps {
  platform: SocialPlatform;
  platformLabel: string;
  accountName: string;
  accountUsername: string;
  followersCount?: number;
  isConnected: boolean;
  accountId?: string;
  onConnect: () => void;
  onDisconnect?: () => void;
}

const ConnectedAccountCard: React.FC<ConnectedAccountCardProps> = ({
  platform,
  platformLabel,
  accountName,
  accountUsername,
  followersCount,
  isConnected,
  accountId,
  onConnect,
  onDisconnect,
}) => {
  const disconnectMutation = useDisconnectSocialAccount();
  const { toast } = useToast();

  const handleDisconnect = async () => {
    if (!accountId) return;
    
    try {
      await disconnectMutation.mutateAsync(accountId);
      toast({
        title: "Account disconnected",
        description: `Your ${platformLabel} account has been disconnected.`,
      });
      onDisconnect?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3">
            <SocialIcon platform={platform} size={32} />
          </div>
          
          <h3 className="text-lg font-medium mb-1">{platformLabel}</h3>
          
          {isConnected ? (
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium">{accountName}</p>
              <p className="text-sm text-muted-foreground">{accountUsername}</p>
              {followersCount !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {followersCount.toLocaleString()} followers
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-4">
              Connect your {platformLabel} account
            </p>
          )}
          
          {isConnected ? (
            <div className="space-y-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Connected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                disabled={disconnectMutation.isPending}
                className="mt-2"
              >
                {disconnectMutation.isPending ? 'Disconnecting...' : 'Disconnect'}
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={onConnect}>
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectedAccountCard;

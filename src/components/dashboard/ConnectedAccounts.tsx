
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { useSocialAccounts } from '@/hooks/useSupabaseData';
import ConnectAccountDialog from '@/components/social/ConnectAccountDialog';

const ConnectedAccounts: React.FC = () => {
  const { data: socialAccounts = [], refetch } = useSocialAccounts();
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{
    id: SocialPlatform;
    label: string;
  } | null>(null);

  // Available platforms for connection
  const availablePlatforms = [
    { id: 'twitter' as SocialPlatform, label: 'Twitter' },
    { id: 'facebook' as SocialPlatform, label: 'Facebook' },
    { id: 'instagram' as SocialPlatform, label: 'Instagram' },
    { id: 'linkedin' as SocialPlatform, label: 'LinkedIn' },
  ];

  const handleConnectPlatform = (platform: { id: SocialPlatform; label: string }) => {
    setSelectedPlatform(platform);
    setConnectDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setConnectDialogOpen(false);
    setSelectedPlatform(null);
    refetch();
  };

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Connected Accounts</h2>
        <p className="text-sm text-muted-foreground">Manage your social media accounts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {availablePlatforms.map((platform) => {
          const connectedAccount = socialAccounts.find(sa => sa.platform === platform.id && sa.is_connected);
          const isConnected = !!connectedAccount;
          
          return (
            <Card 
              key={platform.id} 
              className={`text-center p-6 bg-white cursor-pointer transition-all hover:shadow-md ${
                !isConnected ? 'border-dashed border-2 hover:border-primary/50' : ''
              }`}
              onClick={() => !isConnected && handleConnectPlatform(platform)}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <SocialIcon platform={platform.id} size={48} />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {connectedAccount?.account_name || platform.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {connectedAccount?.account_username || 'Not connected'}
                  </p>
                  <span className={`text-xs font-medium ${isConnected ? 'text-green-600' : 'text-gray-500'}`}>
                    {isConnected ? 'Connected' : 'Click to connect'}
                  </span>
                  {connectedAccount?.followers_count && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {connectedAccount.followers_count.toLocaleString()} followers
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}

        <Card 
          className="text-center p-6 border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer bg-white"
          onClick={() => {
            // Show a list of platforms to connect
            const unconnectedPlatforms = availablePlatforms.filter(
              platform => !socialAccounts.find(sa => sa.platform === platform.id && sa.is_connected)
            );
            if (unconnectedPlatforms.length > 0) {
              handleConnectPlatform(unconnectedPlatforms[0]);
            }
          }}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-sm">Add Account</p>
              <span className="text-xs text-muted-foreground">Connect a new platform</span>
            </div>
          </div>
        </Card>
      </div>

      {selectedPlatform && (
        <ConnectAccountDialog
          isOpen={connectDialogOpen}
          onClose={handleCloseDialog}
          platform={selectedPlatform.id}
          platformLabel={selectedPlatform.label}
        />
      )}
    </div>
  );
};

export default ConnectedAccounts;

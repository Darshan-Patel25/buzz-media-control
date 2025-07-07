
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { useSocialAccounts } from '@/hooks/useSupabaseData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SocialAccountManager from '@/components/social/SocialAccountManager';
import { Button } from '@/components/ui/button';

const ConnectedAccounts: React.FC = () => {
  const { data: socialAccounts = [] } = useSocialAccounts();
  const [showConnectDialog, setShowConnectDialog] = useState(false);

  // Available platforms for display
  const availablePlatforms = [
    { id: 'twitter' as SocialPlatform, label: 'Twitter' },
    { id: 'facebook' as SocialPlatform, label: 'Facebook' },
    { id: 'instagram' as SocialPlatform, label: 'Instagram' },
    { id: 'linkedin' as SocialPlatform, label: 'LinkedIn' },
  ];

  return (
    <div className="mb-8">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-1">Connected Accounts</h2>
          <p className="text-sm text-muted-foreground">Manage your social media accounts</p>
        </div>
        <Button 
          onClick={() => setShowConnectDialog(true)}
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Connect Account
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {availablePlatforms.map((platform) => {
          const connectedAccount = socialAccounts.find(sa => sa.platform === platform.id && sa.is_connected);
          const isConnected = !!connectedAccount;
          
          return (
            <Card 
              key={platform.id} 
              className={`text-center p-6 bg-white transition-all hover:shadow-md ${
                !isConnected ? 'border-dashed border-2 opacity-60' : 'border-solid'
              }`}
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
          onClick={() => setShowConnectDialog(true)}
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

      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Connect Social Media Accounts</DialogTitle>
          </DialogHeader>
          <SocialAccountManager 
            onAccountConnected={() => {
              setShowConnectDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConnectedAccounts;

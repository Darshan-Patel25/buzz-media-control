
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { useSocialAccounts } from '@/hooks/useSupabaseData';

const ConnectedAccounts: React.FC = () => {
  const { data: socialAccounts = [] } = useSocialAccounts();

  // Create account cards with real data and placeholders
  const accountCards = [
    { platform: 'twitter' as SocialPlatform, name: 'Twitter', username: '@yourbrand' },
    { platform: 'facebook' as SocialPlatform, name: 'Facebook', username: 'Your Brand' },
    { platform: 'instagram' as SocialPlatform, name: 'Instagram', username: '@yourbrand' },
    { platform: 'linkedin' as SocialPlatform, name: 'LinkedIn', username: 'Your Brand' },
  ];

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Connected Accounts</h2>
        <p className="text-sm text-muted-foreground">Manage your social media accounts</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {accountCards.map((account) => {
          const connectedAccount = socialAccounts.find(sa => sa.platform === account.platform);
          const isConnected = !!connectedAccount;
          
          return (
            <Card key={account.platform} className="text-center p-6 bg-white">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <SocialIcon platform={account.platform} size={48} />
                </div>
                <div>
                  <p className="font-medium text-sm">{connectedAccount?.account_username || account.username}</p>
                  <span className={`text-xs font-medium ${isConnected ? 'text-green-600' : 'text-gray-500'}`}>
                    {isConnected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}

        <Card className="text-center p-6 border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer bg-white">
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
    </div>
  );
};

export default ConnectedAccounts;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SocialAccount } from '@/lib/types';

export const AccountsOverview = () => {
  // Mock data for social accounts
  const socialAccounts: SocialAccount[] = [
    {
      id: '1',
      platform: 'twitter',
      username: '@yourbrand',
      profileImage: 'https://github.com/shadcn.png',
      connected: true
    },
    {
      id: '2',
      platform: 'facebook',
      username: 'Your Brand',
      profileImage: 'https://github.com/shadcn.png',
      connected: true
    },
    {
      id: '3',
      platform: 'instagram',
      username: '@yourbrand',
      profileImage: 'https://github.com/shadcn.png',
      connected: true
    },
    {
      id: '4',
      platform: 'linkedin',
      username: 'Your Brand',
      profileImage: 'https://github.com/shadcn.png',
      connected: false
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>Manage your social media accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {socialAccounts.map((account) => (
            <div 
              key={account.id} 
              className={`p-4 rounded-lg border ${account.connected ? 'bg-card' : 'bg-muted/50'} flex flex-col items-center text-center`}
            >
              <SocialIcon platform={account.platform} withBackground size={24} />
              <p className="mt-2 font-medium text-sm">{account.username}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {account.connected ? 'Connected' : 'Not connected'}
              </p>
            </div>
          ))}
          <div className="p-4 rounded-lg border border-dashed flex flex-col items-center justify-center text-center">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full mb-2">
              <Plus size={20} />
            </Button>
            <p className="text-sm font-medium">Add Account</p>
            <p className="text-xs text-muted-foreground mt-1">Connect a new platform</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useConnectSocialAccount } from '@/hooks/useSupabaseData';
import { useToast } from '@/hooks/use-toast';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';

interface ConnectAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  platform: SocialPlatform;
  platformLabel: string;
}

const ConnectAccountDialog: React.FC<ConnectAccountDialogProps> = ({
  isOpen,
  onClose,
  platform,
  platformLabel,
}) => {
  const [accountName, setAccountName] = useState('');
  const [accountUsername, setAccountUsername] = useState('');
  const [followersCount, setFollowersCount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const connectAccountMutation = useConnectSocialAccount();
  const { toast } = useToast();

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountName.trim() || !accountUsername.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both account name and username.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await connectAccountMutation.mutateAsync({
        platform,
        account_name: accountName.trim(),
        account_username: accountUsername.trim(),
        followers_count: followersCount ? parseInt(followersCount) : 0,
      });

      toast({
        title: "Account Connected",
        description: `Your ${platformLabel} account has been successfully connected.`,
      });

      // Reset form and close dialog
      setAccountName('');
      setAccountUsername('');
      setFollowersCount('');
      onClose();
    } catch (error) {
      console.error('Error connecting account:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setAccountName('');
    setAccountUsername('');
    setFollowersCount('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <SocialIcon platform={platform} size={24} />
            <div>
              <DialogTitle>Connect {platformLabel} Account</DialogTitle>
              <DialogDescription>
                Enter your {platformLabel} account details to connect it to your workspace.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleConnect} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-name">Account Name/Display Name</Label>
            <Input
              id="account-name"
              type="text"
              placeholder="e.g., My Business Page"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-username">Username/Handle</Label>
            <Input
              id="account-username"
              type="text"
              placeholder={`e.g., @yourusername`}
              value={accountUsername}
              onChange={(e) => setAccountUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="followers-count">Followers Count (Optional)</Label>
            <Input
              id="followers-count"
              type="number"
              placeholder="e.g., 1000"
              value={followersCount}
              onChange={(e) => setFollowersCount(e.target.value)}
              min="0"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Connecting...' : `Connect ${platformLabel}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectAccountDialog;

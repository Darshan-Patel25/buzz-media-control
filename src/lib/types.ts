
export type SocialPlatform = 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'pinterest' | 'tiktok';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  profileImage: string;
  connected: boolean;
}

export interface ScheduledPost {
  id: string;
  content: string;
  media?: string[];
  platforms: SocialPlatform[];
  scheduledDate: string;
  status: 'scheduled' | 'published' | 'failed';
}

export interface Activity {
  id: string;
  type: 'post_published' | 'post_scheduled' | 'account_connected' | 'engagement';
  description: string;
  timestamp: string;
  platform?: SocialPlatform;
}

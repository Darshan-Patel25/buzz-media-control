export interface SocialProfile {
  id: string;
  name: string;
  platform: SocialPlatform;
  profileImage: string;
  connected: boolean;
  paused?: boolean;
}

export type SocialPlatform = 
  | 'facebook' 
  | 'twitter' 
  | 'linkedin' 
  | 'instagram' 
  | 'tiktok' 
  | 'telegram'
  | 'pinterest'
  | 'youtube'
  | 'tumblr';

export interface Post {
  id: string;
  content: string;
  attachments: Attachment[];
  scheduledDate?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  socialProfiles: string[];
  category?: string;
  createdAt: Date | string;
  engagement?: PostEngagement;
  variations?: PostVariation[];
}

export interface PostVariation {
  id: string;
  content: string;
  attachments: Attachment[];
  socialProfiles: string[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'link';
  url: string;
  thumbnail?: string;
}

export interface PostEngagement {
  likes: number;
  shares: number;
  comments: number;
  clicks?: number;
  reach?: number;
  impressions?: number;
}

export interface ContentCategory {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  postsCount: number;
}

export interface AnalyticsData {
  period: string;
  platform: SocialPlatform;
  metrics: {
    followers: number;
    engagement: number;
    reach: number;
    posts: number;
    clicks: number;
    impressions: number;
  };
  history: {
    date: string;
    value: number;
  }[];
}

export interface TelegramBot {
  id: string;
  name: string;
  token: string;
  subscribers: number;
  active: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  profileImage?: string;
}

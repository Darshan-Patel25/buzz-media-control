
-- Create posts table to store social media posts
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  content TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'twitter', 'linkedin', 'instagram', 'tiktok', 'telegram', 'youtube', 'pinterest', 'tumblr')),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  published_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  reach_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social_accounts table to store connected social media accounts
CREATE TABLE public.social_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'twitter', 'linkedin', 'instagram', 'tiktok', 'telegram', 'youtube', 'pinterest', 'tumblr')),
  account_name TEXT NOT NULL,
  account_username TEXT NOT NULL,
  is_connected BOOLEAN DEFAULT true,
  followers_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Create analytics_metrics table to store daily analytics data
CREATE TABLE public.analytics_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'twitter', 'linkedin', 'instagram', 'tiktok', 'telegram', 'youtube', 'pinterest', 'tumblr')),
  date DATE NOT NULL,
  followers_count INTEGER DEFAULT 0,
  engagement_count INTEGER DEFAULT 0,
  reach_count INTEGER DEFAULT 0,
  impressions_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, platform, date)
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for posts
CREATE POLICY "Users can view their own posts" 
  ON public.posts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own posts" 
  ON public.posts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
  ON public.posts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
  ON public.posts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for social_accounts
CREATE POLICY "Users can view their own social accounts" 
  ON public.social_accounts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own social accounts" 
  ON public.social_accounts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social accounts" 
  ON public.social_accounts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social accounts" 
  ON public.social_accounts 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for analytics_metrics
CREATE POLICY "Users can view their own analytics" 
  ON public.analytics_metrics 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analytics" 
  ON public.analytics_metrics 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics" 
  ON public.analytics_metrics 
  FOR UPDATE 
  USING (auth.uid() = user_id);

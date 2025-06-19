export interface Post {
  id: string;
  content: string;
  image?: string;
  platforms: string[];
  status: 'scheduled' | 'published' | 'draft';
  scheduledDate?: string;
  scheduledTime?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface AnalyticsData {
  platform: string;
  followers: number;
  posts: number;
  engagement: number;
  reach: number;
  history: {
    date: string;
    followers: number;
    posts: number;
    engagement: number;
    reach: number;
  }[];
}

export interface Comment {
  id: string;
  platform: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  postPreview: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    content: "Exciting news! We're launching our new product next week. Stay tuned for more updates! #newproduct #launch",
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=60',
    platforms: ['instagram', 'facebook', 'twitter'],
    status: 'scheduled',
    scheduledDate: '2025-04-20',
    scheduledTime: '09:00 AM',
  },
  {
    id: '2',
    content: 'Check out our latest blog post about social media trends in 2025. Link in bio! #socialmedia #trends #marketing',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=60',
    platforms: ['instagram'],
    status: 'published',
    scheduledDate: '2025-04-15',
    scheduledTime: '10:30 AM',
    engagement: {
      likes: 243,
      comments: 18,
      shares: 32,
    },
  },
  {
    id: '3',
    content: "We're thrilled to announce our partnership with @techcompany to bring you innovative solutions in the coming months.",
    platforms: ['twitter', 'facebook'],
    status: 'published',
    scheduledDate: '2025-04-12',
    scheduledTime: '02:15 PM',
    engagement: {
      likes: 527,
      comments: 46,
      shares: 128,
    },
  },
  {
    id: '4',
    content: "Here's a quick tip for improving your productivity: set clear goals for each day and prioritize your tasks accordingly.",
    platforms: ['instagram', 'facebook'],
    status: 'draft',
  },
  {
    id: '5',
    content: "Join us for a special livestream event this Friday at 3 PM where we'll be discussing future trends in technology and answering your questions!",
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=60',
    platforms: ['instagram', 'facebook', 'twitter', 'telegram'],
    status: 'scheduled',
    scheduledDate: '2025-04-22',
    scheduledTime: '03:00 PM',
  },
  {
    id: '6',
    content: 'Happy Monday! What are your goals for this week? Share in the comments below. #MondayMotivation #Goals',
    platforms: ['instagram', 'facebook'],
    status: 'published',
    scheduledDate: '2025-04-08',
    scheduledTime: '08:45 AM',
    engagement: {
      likes: 185,
      comments: 27,
      shares: 12,
    },
  },
  {
    id: '7',
    content: 'Did you know? Our customer service team is available 24/7 to assist you with any questions or concerns. Just drop us a message!',
    platforms: ['facebook', 'twitter', 'telegram'],
    status: 'scheduled',
    scheduledDate: '2025-04-24',
    scheduledTime: '11:30 AM',
  },
  {
    id: '8',
    content: "Behind the scenes look at our product development process. We're always working to improve our offerings based on your feedback!",
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=60',
    platforms: ['instagram'],
    status: 'draft',
  },
];

const mockAnalytics: Record<string, AnalyticsData> = {
  all: {
    platform: 'all',
    followers: 24500,
    posts: 342,
    engagement: 3.7,
    reach: 86000,
    history: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        followers: 24000 + Math.floor(Math.random() * 1000),
        posts: 310 + i,
        engagement: 2.5 + Math.random() * 2,
        reach: 80000 + Math.floor(Math.random() * 12000),
      };
    }),
  },
  instagram: {
    platform: 'instagram',
    followers: 12300,
    posts: 185,
    engagement: 4.2,
    reach: 45000,
    history: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        followers: 12000 + Math.floor(Math.random() * 500),
        posts: 170 + i / 2,
        engagement: 3.8 + Math.random() * 1.5,
        reach: 43000 + Math.floor(Math.random() * 5000),
      };
    }),
  },
  facebook: {
    platform: 'facebook',
    followers: 8500,
    posts: 110,
    engagement: 2.8,
    reach: 32000,
    history: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        followers: 8300 + Math.floor(Math.random() * 300),
        posts: 100 + i / 3,
        engagement: 2.5 + Math.random() * 1.2,
        reach: 30000 + Math.floor(Math.random() * 4000),
      };
    }),
  },
  twitter: {
    platform: 'twitter',
    followers: 3200,
    posts: 47,
    engagement: 3.1,
    reach: 9000,
    history: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        followers: 3100 + Math.floor(Math.random() * 200),
        posts: 40 + i / 4,
        engagement: 2.8 + Math.random() * 1.3,
        reach: 8500 + Math.floor(Math.random() * 1000),
      };
    }),
  },
  telegram: {
    platform: 'telegram',
    followers: 500,
    posts: 12,
    engagement: 1.9,
    reach: 1500,
    history: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        followers: 450 + Math.floor(Math.random() * 100),
        posts: 8 + i / 5,
        engagement: 1.5 + Math.random() * 0.8,
        reach: 1300 + Math.floor(Math.random() * 500),
      };
    }),
  },
};

const mockComments: Comment[] = [
  {
    id: '1',
    platform: 'instagram',
    author: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    content: "This is amazing! Can't wait to try it out.",
    date: '2025-04-16T12:30:00Z',
    postPreview: "Exciting news! We're launching our new product next week...",
  },
  {
    id: '2',
    platform: 'facebook',
    author: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    content: 'Is this available worldwide or just in the US?',
    date: '2025-04-16T10:15:00Z',
    postPreview: "Exciting news! We're launching our new product next week...",
  },
  {
    id: '3',
    platform: 'twitter',
    author: 'Jessica Williams',
    avatar: 'https://i.pravatar.cc/150?u=jessica',
    content: 'Super excited about this! #innovation',
    date: '2025-04-16T09:45:00Z',
    postPreview: "We're thrilled to announce our partnership with @techcompany...",
  },
  {
    id: '4',
    platform: 'instagram',
    author: 'David Lee',
    avatar: 'https://i.pravatar.cc/150?u=david',
    content: 'The photos look stunning! Great job on the marketing.',
    date: '2025-04-15T16:20:00Z',
    postPreview: 'Check out our latest blog post about social media trends in 2025...',
  },
  {
    id: '5',
    platform: 'facebook',
    author: 'Emily Rodriguez',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    content: "I've been using your product for a year now and love it!",
    date: '2025-04-15T14:05:00Z',
    postPreview: 'Join us for a special livestream event this Friday...',
  },
  {
    id: '6',
    platform: 'telegram',
    author: 'Alexander Kim',
    avatar: 'https://i.pravatar.cc/150?u=alexander',
    content: "Will there be a recording for those who can't attend live?",
    date: '2025-04-15T11:30:00Z',
    postPreview: 'Join us for a special livestream event this Friday...',
  },
];

export const mockData = {
  posts: mockPosts,
  analytics: mockAnalytics,
  comments: mockComments,
};

export default mockData;
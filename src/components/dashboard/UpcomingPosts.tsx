
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import SocialIcon from '../common/SocialIcon';
import { SocialPlatform } from '@/types';

// Sample data for upcoming posts
const upcomingPosts = [
  {
    id: '1',
    content: 'Exciting news coming soon! Stay tuned for our latest product announcement! #exciting #newproduct',
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
    platforms: ['facebook', 'twitter', 'linkedin'] as SocialPlatform[],
  },
  {
    id: '2',
    content: 'Check out our latest blog post on social media strategies for 2025! Link in bio.',
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
    platforms: ['instagram', 'facebook'] as SocialPlatform[],
  },
  {
    id: '3',
    content: 'Watch our CEO\'s interview on the future of digital marketing. #digitalmarketing #interview',
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours from now
    platforms: ['linkedin', 'twitter'] as SocialPlatform[],
  },
];

const UpcomingPosts: React.FC = () => {
  // Format date to display relative time (e.g., "in 2 hours")
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffHours * 60);
      return `in ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      const hours = Math.floor(diffHours);
      return `in ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(diffHours / 24);
      return `in ${days} day${days !== 1 ? 's' : ''}`;
    }
  };

  return (
    <Card className="col-span-full xl:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Upcoming Posts</CardTitle>
        <Button asChild size="sm" variant="ghost">
          <Link to="/schedule">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingPosts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4 bg-white">
              <div className="mb-2 flex justify-between items-start">
                <div className="flex space-x-1">
                  {post.platforms.map((platform) => (
                    <SocialIcon key={platform} platform={platform} size={18} />
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{formatRelativeTime(post.scheduledDate)}</span>
                </div>
              </div>
              <p className="text-sm line-clamp-2 mb-3">{post.content}</p>
              <div className="flex justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>
                    {post.scheduledDate.toLocaleDateString()} at {post.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;

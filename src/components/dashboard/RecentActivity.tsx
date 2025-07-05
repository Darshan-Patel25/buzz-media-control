
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { usePosts } from '@/hooks/useSupabaseData';

const RecentActivity: React.FC = () => {
  const { data: posts = [] } = usePosts();

  // Create recent activity items based on real data and mock data
  const recentActivities = [
    {
      id: 1,
      platform: 'twitter' as SocialPlatform,
      title: 'Post published on Twitter',
      time: '30 mins ago'
    },
    {
      id: 2,
      platform: 'instagram' as SocialPlatform,
      title: 'Post scheduled for Instagram',
      time: '2 hours ago'
    },
    {
      id: 3,
      platform: 'linkedin' as SocialPlatform,
      title: 'LinkedIn account connected',
      time: '5 hours ago'
    },
    {
      id: 4,
      platform: 'facebook' as SocialPlatform,
      title: 'New comments on Facebook post',
      time: 'Jun 10'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">Latest actions from your accounts</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <SocialIcon platform={activity.platform} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { Activity } from '@/lib/types';
import { format } from 'date-fns';

export const RecentActivity = () => {
  // Mock data for recent activities
  const activities: Activity[] = [
    {
      id: '1',
      type: 'post_published',
      description: 'Post published on Twitter',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      platform: 'twitter'
    },
    {
      id: '2',
      type: 'post_scheduled',
      description: 'Post scheduled for Instagram',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      platform: 'instagram'
    },
    {
      id: '3',
      type: 'account_connected',
      description: 'LinkedIn account connected',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      platform: 'linkedin'
    },
    {
      id: '4',
      type: 'engagement',
      description: 'New comments on Facebook post',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      platform: 'facebook'
    }
  ];

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      if (diffInHours < 1) {
        const minutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
      }
      return `${Math.floor(diffInHours)} hour${Math.floor(diffInHours) !== 1 ? 's' : ''} ago`;
    }
    
    return format(date, 'MMM d');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-start">
              <div className="flex gap-3">
                {activity.platform && (
                  <SocialIcon platform={activity.platform} withBackground size={16} className="mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

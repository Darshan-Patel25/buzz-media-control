
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { usePosts, useSocialAccounts } from '@/hooks/useSupabaseData';
import { formatDistanceToNow } from 'date-fns';

const RecentActivity: React.FC = () => {
  const { data: posts = [] } = usePosts();
  const { data: socialAccounts = [] } = useSocialAccounts();

  // Generate recent activities from real data
  const recentActivities = React.useMemo(() => {
    const activities = [];

    // Add recent posts
    const recentPosts = posts
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 3);

    recentPosts.forEach(post => {
      const action = post.status === 'published' ? 'published' : 
                   post.status === 'scheduled' ? 'scheduled' : 'drafted';
      
      activities.push({
        id: `post-${post.id}`,
        platform: post.platform as SocialPlatform,
        title: `Post ${action} on ${post.platform}`,
        description: post.content.length > 50 ? 
          `${post.content.substring(0, 50)}...` : post.content,
        time: formatDistanceToNow(new Date(post.created_at), { addSuffix: true }),
        type: action,
        timestamp: new Date(post.created_at)
      });
    });

    // Add recent account connections
    const recentAccounts = socialAccounts
      .filter(account => account.is_connected)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 2);

    recentAccounts.forEach(account => {
      activities.push({
        id: `account-${account.id}`,
        platform: account.platform as SocialPlatform,
        title: `${account.platform} account connected`,
        description: `@${account.account_username}`,
        time: formatDistanceToNow(new Date(account.created_at), { addSuffix: true }),
        type: 'connected',
        timestamp: new Date(account.created_at)
      });
    });

    // Sort all activities by timestamp and take the most recent ones
    return activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);
  }, [posts, socialAccounts]);

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'drafted':
        return 'bg-gray-100 text-gray-800';
      case 'connected':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <p className="text-sm text-muted-foreground">Latest actions from your accounts</p>
      </CardHeader>
      <CardContent>
        {recentActivities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start by connecting accounts and creating posts
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border">
                  <SocialIcon platform={activity.platform} size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <Badge variant="secondary" className={`text-xs ${getActivityBadgeColor(activity.type)}`}>
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

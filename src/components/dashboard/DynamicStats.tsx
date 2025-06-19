
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePosts, useSocialAccounts } from '@/hooks/useSupabaseData';
import { TrendingUp, Calendar, Users, BarChart3 } from 'lucide-react';

const DynamicStats: React.FC = () => {
  const { data: posts = [] } = usePosts();
  const { data: socialAccounts = [] } = useSocialAccounts();

  // Calculate dynamic stats
  const totalPosts = posts.length;
  const scheduledPosts = posts.filter(post => post.status === 'scheduled').length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;
  const connectedAccounts = socialAccounts.filter(account => account.is_connected).length;
  
  // Calculate total engagement (sum of all engagement metrics)
  const totalEngagement = posts.reduce((sum, post) => {
    return sum + (post.likes_count || 0) + (post.comments_count || 0) + (post.shares_count || 0);
  }, 0);

  const stats = [
    {
      title: 'Total Posts',
      value: totalPosts.toString(),
      icon: BarChart3,
      description: `${publishedPosts} published, ${scheduledPosts} scheduled`
    },
    {
      title: 'Connected Accounts',
      value: connectedAccounts.toString(),
      icon: Users,
      description: `${socialAccounts.length} total accounts`
    },
    {
      title: 'Scheduled Posts',
      value: scheduledPosts.toString(),
      icon: Calendar,
      description: 'Ready to publish'
    },
    {
      title: 'Total Engagement',
      value: totalEngagement.toString(),
      icon: TrendingUp,
      description: 'Likes, comments & shares'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DynamicStats;

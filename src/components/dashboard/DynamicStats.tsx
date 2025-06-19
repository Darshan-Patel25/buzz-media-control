
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePosts, useSocialAccounts } from '@/hooks/useSupabaseData';
import { TrendingUp, Calendar, Users, BarChart3 } from 'lucide-react';

const DynamicStats: React.FC = () => {
  const { data: posts = [] } = usePosts();
  const { data: socialAccounts = [] } = useSocialAccounts();

  // Calculate dynamic stats with real-time updates
  const totalPosts = posts.length;
  const scheduledPosts = posts.filter(post => post.status === 'scheduled').length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;
  const draftPosts = posts.filter(post => post.status === 'draft').length;
  const connectedAccounts = socialAccounts.filter(account => account.is_connected).length;
  
  // Calculate total engagement (sum of all engagement metrics)
  const totalEngagement = posts.reduce((sum, post) => {
    return sum + (post.likes_count || 0) + (post.comments_count || 0) + (post.shares_count || 0);
  }, 0);

  // Calculate growth metrics (comparing last 7 days vs previous 7 days)
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);

  const recentPosts = posts.filter(post => new Date(post.created_at) >= lastWeek);
  const previousPosts = posts.filter(post => 
    new Date(post.created_at) >= twoWeeksAgo && new Date(post.created_at) < lastWeek
  );

  const postGrowth = previousPosts.length > 0 
    ? ((recentPosts.length - previousPosts.length) / previousPosts.length * 100).toFixed(1)
    : recentPosts.length > 0 ? '100' : '0';

  const recentEngagement = recentPosts.reduce((sum, post) => 
    sum + (post.likes_count || 0) + (post.comments_count || 0) + (post.shares_count || 0), 0
  );
  
  const previousEngagement = previousPosts.reduce((sum, post) => 
    sum + (post.likes_count || 0) + (post.comments_count || 0) + (post.shares_count || 0), 0
  );

  const engagementGrowth = previousEngagement > 0 
    ? ((recentEngagement - previousEngagement) / previousEngagement * 100).toFixed(1)
    : recentEngagement > 0 ? '100' : '0';

  const stats = [
    {
      title: 'Total Posts',
      value: totalPosts.toString(),
      icon: BarChart3,
      description: `${publishedPosts} published, ${scheduledPosts} scheduled, ${draftPosts} drafts`,
      growth: postGrowth,
      growthLabel: 'vs last week'
    },
    {
      title: 'Connected Accounts',
      value: connectedAccounts.toString(),
      icon: Users,
      description: `${socialAccounts.length} total accounts`,
      growth: null,
      growthLabel: null
    },
    {
      title: 'Scheduled Posts',
      value: scheduledPosts.toString(),
      icon: Calendar,
      description: 'Ready to publish',
      growth: null,
      growthLabel: null
    },
    {
      title: 'Total Engagement',
      value: totalEngagement.toLocaleString(),
      icon: TrendingUp,
      description: 'Likes, comments & shares',
      growth: engagementGrowth,
      growthLabel: 'vs last week'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        const hasPositiveGrowth = stat.growth && parseFloat(stat.growth) > 0;
        const hasNegativeGrowth = stat.growth && parseFloat(stat.growth) < 0;
        
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                {stat.growth && stat.growthLabel && (
                  <div className={`text-xs font-medium ${
                    hasPositiveGrowth ? 'text-green-600' : 
                    hasNegativeGrowth ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {hasPositiveGrowth ? '+' : ''}{stat.growth}% {stat.growthLabel}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DynamicStats;

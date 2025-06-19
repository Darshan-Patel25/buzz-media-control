
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, MessageSquare, Share2 } from 'lucide-react';
import MetricCard from '../common/MetricCard';
import { usePosts, useSocialAccounts, useAnalyticsMetrics } from '@/hooks/useSupabaseData';

const QuickStats: React.FC = () => {
  const { data: posts = [] } = usePosts();
  const { data: accounts = [] } = useSocialAccounts();
  const { data: metrics = [] } = useAnalyticsMetrics();

  // Calculate totals from real data
  const totalPosts = posts.length;
  const totalAccounts = accounts.length;
  const totalEngagement = metrics.reduce((sum, metric) => sum + (metric.engagement_count || 0), 0);
  const totalFollowers = accounts.reduce((sum, account) => sum + (account.followers_count || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <MetricCard
        title="Total Posts"
        value={totalPosts}
        icon={<TrendingUp className="h-4 w-4" />}
        change={5.2}
        iconClassName="bg-blue-100 text-blue-600"
      />
      <MetricCard
        title="Total Followers"
        value={totalFollowers.toLocaleString()}
        icon={<Users className="h-4 w-4" />}
        change={2.1}
        iconClassName="bg-green-100 text-green-600"
      />
      <MetricCard
        title="Engagement"
        value={totalEngagement.toLocaleString()}
        icon={<MessageSquare className="h-4 w-4" />}
        change={8.7}
        iconClassName="bg-purple-100 text-purple-600"
      />
      <MetricCard
        title="Connected Accounts"
        value={totalAccounts}
        icon={<Share2 className="h-4 w-4" />}
        change={0}
        iconClassName="bg-orange-100 text-orange-600"
      />
    </div>
  );
};

export default QuickStats;

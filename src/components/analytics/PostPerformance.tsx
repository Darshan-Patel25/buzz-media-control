
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { usePosts, useSocialAccounts } from '@/hooks/useSupabaseData';

interface PostPerformanceProps {
  title: string;
  description: string;
}

const PostPerformance: React.FC<PostPerformanceProps> = ({ title, description }) => {
  const { data: posts = [] } = usePosts();
  const { data: socialAccounts = [] } = useSocialAccounts();

  // Generate platform distribution data
  const platformData = React.useMemo(() => {
    const platformCounts = posts.reduce((acc, post) => {
      acc[post.platform] = (acc[post.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];
    
    return Object.entries(platformCounts).map(([platform, count], index) => ({
      name: platform.charAt(0).toUpperCase() + platform.slice(1),
      value: count,
      color: colors[index % colors.length]
    }));
  }, [posts]);

  // Generate engagement distribution data
  const engagementData = React.useMemo(() => {
    const ranges = [
      { name: 'Low (0-5)', min: 0, max: 5, color: '#ff4d4f' },
      { name: 'Medium (6-20)', min: 6, max: 20, color: '#faad14' },
      { name: 'High (21-50)', min: 21, max: 50, color: '#52c41a' },
      { name: 'Very High (50+)', min: 51, max: Infinity, color: '#1890ff' }
    ];

    const distribution = ranges.map(range => {
      const count = posts.filter(post => {
        const engagement = (post.likes_count || 0) + (post.comments_count || 0) + (post.shares_count || 0);
        return engagement >= range.min && engagement <= range.max;
      }).length;

      return {
        name: range.name,
        value: count,
        color: range.color
      };
    }).filter(item => item.value > 0);

    return distribution;
  }, [posts]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm">Posts: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const hasData = posts.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="space-y-6">
            {/* Platform Distribution */}
            {platformData.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Content by Platform</h4>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`platform-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {platformData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center gap-1 text-xs">
                      <div 
                        className="w-3 h-3 rounded" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span>{entry.name} ({entry.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement Distribution */}
            {engagementData.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Engagement Distribution</h4>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={engagementData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {engagementData.map((entry, index) => (
                          <Cell key={`engagement-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {engagementData.map((entry, index) => (
                    <div key={`legend-eng-${index}`} className="flex items-center gap-1 text-xs">
                      <div 
                        className="w-3 h-3 rounded" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span>{entry.name} ({entry.value})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{posts.length}</div>
                <div className="text-xs text-gray-500">Total Posts</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {socialAccounts.reduce((sum, acc) => sum + (acc.followers_count || 0), 0).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Total Followers</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-gray-500">
            <div className="text-center">
              <p className="text-sm">No Data Available</p>
              <p className="text-xs mt-1">Create posts to see audience insights</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostPerformance;

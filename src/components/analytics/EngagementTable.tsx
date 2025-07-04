
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { usePosts } from '@/hooks/useSupabaseData';

interface EngagementTableProps {
  title: string;
  description: string;
}

const EngagementTable: React.FC<EngagementTableProps> = ({ title, description }) => {
  const { data: posts = [] } = usePosts();
  
  // Categorize posts by type (this is simplified - in a real app you'd have a post_type field)
  const contentTypes = [
    { name: 'Text', posts: posts.filter(p => p.content.length < 100) },
    { name: 'Long Text', posts: posts.filter(p => p.content.length >= 100) },
    { name: 'Scheduled', posts: posts.filter(p => p.status === 'scheduled') },
    { name: 'Published', posts: posts.filter(p => p.status === 'published') },
    { name: 'Draft', posts: posts.filter(p => p.status === 'draft') }
  ];
  
  const calculateStats = (typePosts: any[]) => {
    if (typePosts.length === 0) return { median: 0, total: 0, avgEngagement: 0 };
    
    const engagements = typePosts.map(post => 
      (post.likes_count || 0) + (post.comments_count || 0) + (post.shares_count || 0)
    );
    
    const total = engagements.reduce((sum, eng) => sum + eng, 0);
    const sorted = engagements.sort((a, b) => a - b);
    const median = sorted.length % 2 === 0 
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    
    return {
      median: Math.round(median),
      total,
      avgEngagement: Math.round(total / typePosts.length),
      count: typePosts.length
    };
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contentTypes.map((type) => {
            const stats = calculateStats(type.posts);
            const maxTotal = Math.max(...contentTypes.map(t => calculateStats(t.posts).total));
            const totalWidth = maxTotal > 0 ? (stats.total / maxTotal) * 100 : 0;
            const medianWidth = maxTotal > 0 ? (stats.median / maxTotal) * 100 : 0;
            
            return (
              <div key={type.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{type.name}</span>
                  <span className="text-xs text-gray-500">({stats.count} posts)</span>
                </div>
                
                <div className="relative h-6 bg-gray-100 rounded">
                  {/* Total Engagement Bar */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-200 rounded"
                    style={{ width: `${totalWidth}%` }}
                  />
                  {/* Median Engagement Bar */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-purple-400 rounded"
                    style={{ width: `${medianWidth}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                      <span>Median: {stats.median}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-blue-200"></span>
                      <span>Total: {stats.total}</span>
                    </div>
                  </div>
                  <span>Avg: {stats.avgEngagement}</span>
                </div>
              </div>
            );
          })}
          
          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No posts available for analysis</p>
              <p className="text-sm mt-1">Create some posts to see engagement metrics</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-purple-400"></span>
                <span className="text-gray-600">Median Engagement</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-blue-200"></span>
                <span className="text-gray-600">Total Engagement</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementTable;

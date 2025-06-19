
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import SocialIcon from '../common/SocialIcon';
import { SocialPlatform } from '@/types';
import { usePosts } from '@/hooks/useSupabaseData';

const UpcomingPosts: React.FC = () => {
  const { data: posts = [], isLoading } = usePosts();

  // Filter for upcoming scheduled posts
  const upcomingPosts = posts
    .filter(post => 
      post.status === 'scheduled' && 
      post.scheduled_date && 
      new Date(post.scheduled_date) > new Date()
    )
    .sort((a, b) => 
      new Date(a.scheduled_date!).getTime() - new Date(b.scheduled_date!).getTime()
    )
    .slice(0, 3); // Show only first 3 upcoming posts

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

  if (isLoading) {
    return (
      <Card className="col-span-full xl:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Upcoming Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="text-sm text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          {upcomingPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-10 w-10 text-gray-300 mb-3" />
              <p className="text-sm text-muted-foreground">No upcoming posts scheduled</p>
              <Button asChild size="sm" className="mt-2">
                <Link to="/create-post">Create your first post</Link>
              </Button>
            </div>
          ) : (
            upcomingPosts.map((post) => {
              const scheduledDate = new Date(post.scheduled_date!);
              
              return (
                <div key={post.id} className="border rounded-lg p-4 bg-white">
                  <div className="mb-2 flex justify-between items-start">
                    <div className="flex space-x-1">
                      <SocialIcon platform={post.platform as SocialPlatform} size={18} />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatRelativeTime(scheduledDate)}</span>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2 mb-3">{post.content}</p>
                  <div className="flex justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {scheduledDate.toLocaleDateString()} at {scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="w-6 h-6" asChild>
                        <Link to={`/content?edit=${post.id}`}>
                          <Edit className="w-3 h-3" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="w-6 h-6" asChild>
                        <Link to={`/content?view=${post.id}`}>
                          <Eye className="w-3 h-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPosts;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { Button } from '@/components/ui/button';
import { ScheduledPost, SocialPlatform } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar, Clock, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UpcomingPosts = () => {
  // Mock data for scheduled posts
  const scheduledPosts: ScheduledPost[] = [
    {
      id: '1',
      content: 'Check out our latest blog post about social media strategies for 2025! #socialmediatips #marketing',
      platforms: ['twitter', 'linkedin'],
      scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // 2 hours from now
      status: 'scheduled'
    },
    {
      id: '2',
      content: "We're excited to announce our new product line launching next week! Stay tuned for updates.",
      media: ['https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'],
      platforms: ['facebook', 'instagram'],
      scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day from now
      status: 'scheduled'
    },
    {
      id: '3',
      content: 'Join our webinar on Thursday to learn more about digital marketing trends in 2025!',
      platforms: ['linkedin', 'twitter', 'facebook'],
      scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(), // 2 days from now
      status: 'scheduled'
    }
  ];

  const formatScheduledDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy');
  };

  const formatScheduledTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'h:mm a');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Posts</CardTitle>
          <CardDescription>Your scheduled content</CardDescription>
        </div>
        <Button variant="outline" size="sm">View Calendar</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4">
              <div className="flex justify-between mb-3">
                <div className="flex space-x-1.5">
                  {post.platforms.map((platform) => (
                    <SocialIcon key={platform} platform={platform as SocialPlatform} size={18} />
                  ))}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                      <Edit size={14} />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-destructive cursor-pointer">
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm mb-3">{post.content}</p>
              {post.media && (
                <div className="mb-3">
                  <img 
                    src={post.media[0]} 
                    alt="Post media" 
                    className="h-32 w-full object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatScheduledDate(post.scheduledDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{formatScheduledTime(post.scheduledDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Grid, List, ChevronLeft, ChevronRight, Calendar as CalendarComponent } from 'lucide-react';
import { format, addMonths, subMonths, getMonth, getYear, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/common/StatusBadge';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for scheduled posts
const generateScheduledPosts = () => {
  const platforms: SocialPlatform[] = ['facebook', 'twitter', 'linkedin', 'instagram', 'tiktok'];
  const posts = [];
  const now = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + Math.floor(Math.random() * 31) - 5); // -5 to +25 days from today
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    
    const randomPlatforms = platforms
      .filter(() => Math.random() > 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    if (randomPlatforms.length === 0) {
      randomPlatforms.push(platforms[Math.floor(Math.random() * platforms.length)]);
    }
    
    posts.push({
      id: `post-${i}`,
      content: `Scheduled post #${i + 1} with some example content that might be a bit longer in some cases.`,
      scheduledDate: date,
      status: Math.random() > 0.2 ? 'scheduled' : 'draft',
      platforms: randomPlatforms
    });
  }
  
  return posts;
};

const scheduledPosts = generateScheduledPosts();

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter((post) => 
      isSameDay(post.scheduledDate, date)
    );
  };

  const getCalendarDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  return (
    <div className="space-y-6 pl-4 pr-3">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Scheduled Posts</h1>
          <p className="text-muted-foreground">Manage and view your upcoming social media posts</p>
        </div>
        <Button>Create New Post</Button>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Schedule</CardTitle>
          <div className="flex space-x-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'calendar')}>
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center">
                  <Grid className="w-4 h-4 mr-2" />
                  <span>Grid</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>Calendar</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-medium">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
          </div>
          
          {viewMode === 'grid' && (
            <div className="space-y-6">
              {getCalendarDays().map((day, index) => {
                const postsForDay = getPostsForDate(day);
                if (postsForDay.length === 0) return null;
                
                return (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 font-medium border-b">
                      {format(day, 'EEEE, MMMM d, yyyy')}
                    </div>
                    <div className="divide-y">
                      {postsForDay.map((post) => (
                        <div key={post.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col flex-grow space-y-2">
                            <div className="flex items-center space-x-2">
                              <StatusBadge status={post.status as any} />
                              <span className="text-sm text-muted-foreground">
                                {format(post.scheduledDate, 'h:mm a')}
                              </span>
                            </div>
                            <p className="line-clamp-2">{post.content}</p>
                            <div className="flex space-x-1">
                              {post.platforms.map((platform) => (
                                <SocialIcon key={platform} platform={platform} size={16} />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 self-end sm:self-center">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {viewMode === 'calendar' && (
            <div>
              <div className="calendar-header">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="calendar-grid">
                {Array.from({ length: new Date(getYear(currentDate), getMonth(currentDate), 1).getDay() }, (_, i) => (
                  <div key={`empty-${i}`} className="calendar-day bg-gray-50"></div>
                ))}
                
                {getCalendarDays().map((day, i) => {
                  const postsForDay = getPostsForDate(day);
                  
                  return (
                    <div key={i} className="calendar-day">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{format(day, 'd')}</span>
                        {postsForDay.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {postsForDay.length}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        {postsForDay.slice(0, 3).map((post) => {
                          // Determine the class based on first platform
                          const platformClass = post.platforms.length > 0 
                            ? `post-${post.platforms[0]}`
                            : 'bg-gray-200';
                          
                          return (
                            <div 
                              key={post.id} 
                              className={`calendar-post ${platformClass} cursor-pointer`}
                            >
                              {format(post.scheduledDate, 'h:mm a')} - {post.content.substring(0, 15)}...
                            </div>
                          );
                        })}
                        
                        {postsForDay.length > 3 && (
                          <div className="text-xs text-center text-blue-500 cursor-pointer">
                            +{postsForDay.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;

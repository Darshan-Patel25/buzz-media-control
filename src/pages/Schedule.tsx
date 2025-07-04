
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Grid, List, ChevronLeft, ChevronRight, Plus, Edit, Trash } from 'lucide-react';
import { format, addMonths, subMonths, getMonth, getYear, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isPast } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import StatusBadge from '@/components/common/StatusBadge';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePosts, useUpdatePost, useDeletePost } from '@/hooks/useSupabaseData';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PlatformSelector from '@/components/post/PlatformSelector';

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: posts = [], isLoading } = usePosts();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();
  const { toast } = useToast();

  // Filter posts to only show scheduled ones
  const scheduledPosts = posts.filter(post => 
    post.status === 'scheduled' && 
    post.scheduled_date &&
    (platformFilter === 'all' || post.platform === platformFilter)
  );

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter((post) => 
      post.scheduled_date && isSameDay(new Date(post.scheduled_date), date)
    );
  };

  const getCalendarDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  };

  const handleEditPost = (post: any) => {
    setSelectedPost({
      ...post,
      selectedPlatforms: [post.platform] as SocialPlatform[],
      scheduledDate: post.scheduled_date ? format(new Date(post.scheduled_date), 'yyyy-MM-dd') : '',
      scheduledTime: post.scheduled_date ? format(new Date(post.scheduled_date), 'HH:mm') : ''
    });
    setEditDialogOpen(true);
  };

  const handleUpdatePost = async () => {
    if (!selectedPost) return;

    try {
      const scheduledDateTime = new Date(`${selectedPost.scheduledDate}T${selectedPost.scheduledTime}`);
      
      await updatePostMutation.mutateAsync({
        id: selectedPost.id,
        content: selectedPost.content,
        platform: selectedPost.selectedPlatforms[0],
        scheduled_date: scheduledDateTime.toISOString(),
      });

      toast({
        title: "Post updated",
        description: "Your scheduled post has been updated successfully.",
      });
      setEditDialogOpen(false);
      setSelectedPost(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePostMutation.mutateAsync(postId);
      toast({
        title: "Post deleted",
        description: "The scheduled post has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePublishNow = async (post: any) => {
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        status: 'published',
        published_date: new Date().toISOString(),
        scheduled_date: null,
      });

      toast({
        title: "Post published",
        description: "Your post has been published successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading scheduled posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pl-4 pr-3">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Scheduled Posts</h1>
          <p className="text-muted-foreground">Manage and view your upcoming social media posts</p>
        </div>
        <Button onClick={() => window.location.href = '/create'}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Post
        </Button>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Schedule ({scheduledPosts.length} posts)</CardTitle>
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
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
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
                <SelectItem value="telegram">Telegram</SelectItem>
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
              {scheduledPosts.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled posts</h3>
                  <p className="text-gray-500 mb-6">Start creating content to see your schedule here.</p>
                  <Button onClick={() => window.location.href = '/create'}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Post
                  </Button>
                </div>
              ) : (
                getCalendarDays().map((day, index) => {
                  const postsForDay = getPostsForDate(day);
                  if (postsForDay.length === 0) return null;
                  
                  return (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className={`px-4 py-2 font-medium border-b flex justify-between items-center ${
                        isToday(day) ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                      }`}>
                        <span>{format(day, 'EEEE, MMMM d, yyyy')}</span>
                        <Badge variant="outline">{postsForDay.length} posts</Badge>
                      </div>
                      <div className="divide-y">
                        {postsForDay.map((post) => (
                          <div key={post.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex flex-col flex-grow space-y-2">
                              <div className="flex items-center space-x-2">
                                <StatusBadge status={post.status as any} />
                                <span className="text-sm text-muted-foreground">
                                  {format(new Date(post.scheduled_date), 'h:mm a')}
                                </span>
                                {isPast(new Date(post.scheduled_date)) && (
                                  <Badge variant="destructive" className="text-xs">Overdue</Badge>
                                )}
                              </div>
                              <p className="line-clamp-2">{post.content}</p>
                              <div className="flex space-x-1">
                                <SocialIcon platform={post.platform as SocialPlatform} size={16} />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 self-end sm:self-center">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditPost(post)}
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handlePublishNow(post)}
                                className="text-green-600 hover:text-green-700"
                              >
                                Publish Now
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDeletePost(post.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
          
          {viewMode === 'calendar' && (
            <div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-sm">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: new Date(getYear(currentDate), getMonth(currentDate), 1).getDay() }, (_, i) => (
                  <div key={`empty-${i}`} className="h-24 bg-gray-50 rounded"></div>
                ))}
                
                {getCalendarDays().map((day, i) => {
                  const postsForDay = getPostsForDate(day);
                  
                  return (
                    <div key={i} className={`h-24 p-2 border rounded ${
                      isToday(day) ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{format(day, 'd')}</span>
                        {postsForDay.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {postsForDay.length}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        {postsForDay.slice(0, 2).map((post) => (
                          <div 
                            key={post.id} 
                            className={`text-xs p-1 rounded cursor-pointer transition-colors ${
                              post.platform === 'facebook' ? 'bg-blue-100 text-blue-800' :
                              post.platform === 'twitter' ? 'bg-sky-100 text-sky-800' :
                              post.platform === 'linkedin' ? 'bg-blue-100 text-blue-800' :
                              post.platform === 'instagram' ? 'bg-pink-100 text-pink-800' :
                              post.platform === 'tiktok' ? 'bg-black text-white' :
                              'bg-gray-100 text-gray-800'
                            }`}
                            onClick={() => handleEditPost(post)}
                          >
                            <div className="flex items-center space-x-1">
                              <SocialIcon platform={post.platform as SocialPlatform} size={12} />
                              <span className="truncate">
                                {format(new Date(post.scheduled_date), 'HH:mm')}
                              </span>
                            </div>
                            <div className="truncate mt-1">
                              {post.content.substring(0, 20)}...
                            </div>
                          </div>
                        ))}
                        
                        {postsForDay.length > 2 && (
                          <div className="text-xs text-center text-blue-500 cursor-pointer">
                            +{postsForDay.length - 2} more
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

      {/* Edit Post Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Scheduled Post</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <PlatformSelector
                  selectedPlatforms={selectedPost.selectedPlatforms}
                  onPlatformsChange={(platforms) => 
                    setSelectedPost({...selectedPost, selectedPlatforms: platforms})
                  }
                />
              </div>
              
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content"
                  value={selectedPost.content}
                  onChange={(e) => setSelectedPost({...selectedPost, content: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Scheduled Date</Label>
                  <Input 
                    id="date"
                    type="date"
                    value={selectedPost.scheduledDate}
                    onChange={(e) => setSelectedPost({...selectedPost, scheduledDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Scheduled Time</Label>
                  <Input 
                    id="time"
                    type="time"
                    value={selectedPost.scheduledTime}
                    onChange={(e) => setSelectedPost({...selectedPost, scheduledTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdatePost}
                  disabled={updatePostMutation.isPending}
                >
                  {updatePostMutation.isPending ? 'Updating...' : 'Update Post'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;

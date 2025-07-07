
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePost } from '@/hooks/useSupabaseData';
import { useToast } from '@/hooks/use-toast';
import PlatformSelector from '@/components/PlatformSelector';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState('');
  
  const createPostMutation = useCreatePost();
  const { toast } = useToast();

  const handlePostNow = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPlatform) {
      toast({
        title: "Error",
        description: "Please select a platform.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        content,
        platform: selectedPlatform,
        status: 'published'
      });

      toast({
        title: "Success",
        description: `Post published to ${selectedPlatform}!`,
      });

      // Reset form
      setContent('');
      setSelectedPlatform('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSchedulePost = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPlatform) {
      toast({
        title: "Error",
        description: "Please select a platform.",
        variant: "destructive",
      });
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Error",
        description: "Please select both date and time for scheduling.",
        variant: "destructive",
      });
      return;
    }

    try {
      const [hours, minutes] = scheduledTime.split(':');
      const scheduleDateTime = new Date(scheduledDate);
      scheduleDateTime.setHours(parseInt(hours), parseInt(minutes));

      // Check if scheduled time is in the future
      if (scheduleDateTime <= new Date()) {
        toast({
          title: "Error",
          description: "Scheduled time must be in the future.",
          variant: "destructive",
        });
        return;
      }

      await createPostMutation.mutateAsync({
        content,
        platform: selectedPlatform,
        scheduled_date: scheduleDateTime.toISOString(),
        status: 'scheduled'
      });

      toast({
        title: "Success",
        description: `Post scheduled for ${scheduleDateTime.toLocaleString()} on ${selectedPlatform}!`,
      });

      // Reset form and close dialog
      setContent('');
      setSelectedPlatform('');
      setScheduledDate(undefined);
      setScheduledTime('');
      setIsScheduleDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Post</h1>
        <p className="text-gray-600 mt-1">
          Create and publish content across your social media platforms.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              {content.length}/280 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Platform</label>
            <PlatformSelector
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
            />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handlePostNow}
              disabled={createPostMutation.isPending}
              className="flex-1"
            >
              {createPostMutation.isPending ? 'Publishing...' : 'Post Now'}
            </Button>
            
            <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  Schedule Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={scheduledDate}
                      onSelect={setScheduledDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Select Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleSchedulePost}
                    disabled={createPostMutation.isPending}
                    className="w-full"
                  >
                    {createPostMutation.isPending ? 'Scheduling...' : 'Schedule Post'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePost;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import PlatformSelector from '@/components/PlatformSelector';
import { Instagram, Twitter, Facebook, Send, Search, MessageSquareText, Heart, Repeat, CheckCheck, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { usePosts, useSocialAccounts } from '@/hooks/useSupabaseData';

interface Comment {
  id: string;
  author: string;
  content: string;
  platform: string;
  date: string;
  postPreview: string;
  avatar?: string;
}

export default function Engage() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [commentFilter, setCommentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComment, setSelectedComment] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  // Get real data from hooks
  const { data: posts = [] } = usePosts();
  const { data: socialAccounts = [] } = useSocialAccounts();

  // Generate dynamic comments based on real posts
  const generateCommentsFromPosts = (): Comment[] => {
    const comments: Comment[] = [];
    
    posts.forEach((post, index) => {
      // Generate 1-3 comments per post
      const commentCount = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < commentCount; i++) {
        comments.push({
          id: `${post.id}-${i}`,
          author: `User ${index + i + 1}`,
          content: `Great post! ${['👍', '🔥', '💯', '✨'][Math.floor(Math.random() * 4)]}`,
          platform: post.platform,
          date: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
          postPreview: post.content.substring(0, 50) + '...',
          avatar: undefined
        });
      }
    });

    return comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const comments = generateCommentsFromPosts();

  const filteredComments = comments.filter(comment => {
    const matchesPlatform = selectedPlatform === 'all' 
      ? true 
      : comment.platform === selectedPlatform;
    
    const matchesSearch = searchQuery === '' 
      ? true 
      : comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPlatform && matchesSearch;
  });

  const handleReply = (commentId: string) => {
    if (replyText.trim() === '') {
      toast({
        title: "Reply cannot be empty",
        description: "Please enter a reply message.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reply sent",
      description: "Your reply has been published successfully.",
    });
    
    setReplyText('');
    setSelectedComment(null);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'linkedin':
        return <div className="h-4 w-4 bg-blue-600 rounded text-white flex items-center justify-center text-xs">in</div>;
      default:
        return null;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className='px-3 sm:px-5'>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Engagement</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Respond to comments and messages across your social platforms</p>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelect={setSelectedPlatform}
        />
      </div>

      <Tabs defaultValue="comments" className="mb-4 sm:mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comments" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <MessageSquareText className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Comments</span>
            <span className="sm:hidden">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Messages</span>
            <span className="sm:hidden">Msg</span>
          </TabsTrigger>
          <TabsTrigger value="mentions" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <CheckCheck className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Mentions</span>
            <span className="sm:hidden">@</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base sm:text-lg">Comments</CardTitle>
                <div>
                  <Badge className="bg-primary text-white text-xs">{filteredComments.length}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-3 border-b space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search comments..."
                    className="pl-10 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                  <Select defaultValue={commentFilter} onValueChange={setCommentFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Comments</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Mark All Read
                  </Button>
                </div>
              </div>
              
              <div className="max-h-[400px] sm:max-h-[600px] overflow-y-auto">
                {filteredComments.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <p className="text-sm">
                      {posts.length === 0 
                        ? "No posts available. Create some posts to see comments!" 
                        : "No comments found"
                      }
                    </p>
                  </div>
                ) : (
                  filteredComments.map(comment => (
                    <div 
                      key={comment.id}
                      className={cn(
                        "p-3 border-b hover:bg-gray-50 cursor-pointer",
                        selectedComment === comment.id && "bg-gray-50"
                      )}
                      onClick={() => setSelectedComment(comment.id)}
                    >
                      <div className="flex gap-2 sm:gap-3">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback className="text-xs">{getInitials(comment.author)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                            <div className="font-medium truncate text-sm">{comment.author}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              {getPlatformIcon(comment.platform)}
                              <span>{new Date(comment.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm line-clamp-2 text-gray-700">{comment.content}</p>
                          <p className="text-xs text-gray-500 mt-1 truncate">{comment.postPreview}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedComment ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <CardTitle className="text-base sm:text-lg">Reply to Comment</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1 text-xs sm:text-sm">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Like</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 text-xs sm:text-sm">
                      <Repeat className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                {(() => {
                  const comment = filteredComments.find(c => c.id === selectedComment);
                  if (!comment) return null;
                  
                  return (
                    <>
                      <div className="mb-4 border-b pb-4">
                        <div className="flex gap-2 sm:gap-3">
                          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback className="text-xs">{getInitials(comment.author)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm sm:text-base">{comment.author}</span>
                              {getPlatformIcon(comment.platform)}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500">{new Date(comment.date).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 bg-gray-50 rounded-lg p-2 sm:p-3">
                          <p className="text-xs sm:text-sm text-gray-500 mb-1">Commenting on:</p>
                          <p className="text-xs sm:text-sm">{comment.postPreview}</p>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm sm:text-base">{comment.content}</p>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <label className="text-sm font-medium mb-2 block">Your Reply</label>
                        <Textarea 
                          placeholder="Write your reply..." 
                          className="min-h-24 sm:min-h-32 text-sm"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4">
                          <Button variant="outline" onClick={() => setSelectedComment(null)} className="text-sm">
                            Cancel
                          </Button>
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700 text-sm" 
                            onClick={() => handleReply(comment.id)}
                          >
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center p-6">
                <div className="bg-gray-100 p-3 sm:p-4 rounded-full inline-block mb-4">
                  <MessageSquareText className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                <h3 className="text-base sm:text-lg font-medium">Select a comment</h3>
                <p className="text-gray-500 mt-1 max-w-md text-sm">
                  Choose a comment from the list to view details and respond.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

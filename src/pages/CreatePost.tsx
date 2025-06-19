
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Image, 
  Video, 
  PenLine,
  Bold, 
  Italic, 
  Underline, 
  Link as LinkIcon,
  Calendar,
  Hash,
  Sparkles,
  Tag,
  ExternalLink,
  Save,
  X,
  Filter,
  Plus,
  Clock,
  Edit,
  Eye,
  Search,
  Send
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import PlatformSelector from '@/components/post/PlatformSelector';
import { useCreatePost, usePosts } from '@/hooks/useSupabaseData';
import { useToast } from '@/hooks/use-toast';

const CreatePost: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(['linkedin']);
  const [postContent, setPostContent] = useState('');
  const [postNow, setPostNow] = useState(true);
  const [activeRightTab, setActiveRightTab] = useState('preview');

  const createPostMutation = useCreatePost();
  const { data: drafts = [] } = usePosts();
  const { toast } = useToast();

  const handleCreatePost = async (isDraft = false) => {
    if (!postContent.trim()) {
      toast({
        title: "Content required",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Platform required",
        description: "Please select at least one platform.",
        variant: "destructive",
      });
      return;
    }

    try {
      for (const platform of selectedPlatforms) {
        await createPostMutation.mutateAsync({
          content: postContent,
          platform,
          status: isDraft ? 'draft' : (postNow ? 'published' : 'scheduled'),
          scheduled_date: postNow ? undefined : new Date().toISOString(),
        });
      }

      toast({
        title: isDraft ? "Draft saved" : "Post created",
        description: isDraft 
          ? "Your post has been saved as a draft."
          : postNow 
            ? "Your post has been published successfully."
            : "Your post has been scheduled successfully.",
      });

      // Reset form
      setPostContent('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="border-b bg-white items-center justify-between px-2 sm:px-4 h-12">
        <h1 className="text-xl sm:text-2xl font-bold pl-2 sm:pl-4">Create Post</h1>
      </div>
      
      <div className="flex flex-col h-full px-3 sm:px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-4 sm:mb-6 gap-4">
          <div className="flex space-x-2 sm:space-x-4 border-b-2 border-transparent overflow-x-auto">
            <Button 
              variant={activeTab === 'create' ? 'link' : 'ghost'} 
              onClick={() => setActiveTab('create')}
              className={`px-2 whitespace-nowrap ${activeTab === 'create' ? 'border-b-2 border-primary -mb-[2px]' : ''}`}
            >
              Create Post
            </Button>
            <Button 
              variant={activeTab === 'drafts' ? 'link' : 'ghost'} 
              onClick={() => setActiveTab('drafts')}
              className={`px-2 whitespace-nowrap ${activeTab === 'drafts' ? 'border-b-2 border-primary -mb-[2px]' : ''}`}
            >
              Drafts ({drafts.filter(p => p.status === 'draft').length})
            </Button>
            <Button 
              variant={activeTab === 'feed' ? 'link' : 'ghost'} 
              onClick={() => setActiveTab('feed')}
              className={`px-2 whitespace-nowrap ${activeTab === 'feed' ? 'border-b-2 border-primary -mb-[2px]' : ''}`}
            >
              Feed Content
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-sm">
              Bulk Import
            </Button>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {activeTab === 'create' && (
          <>
            <div className="mb-4 sm:mb-6">
              <Label className="text-sm font-medium mb-2 block">Select Platforms</Label>
              <PlatformSelector
                selectedPlatforms={selectedPlatforms}
                onPlatformsChange={setSelectedPlatforms}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-grow">
              <div className="lg:col-span-2 space-y-4">
                <Card className="border rounded-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-2 border-b bg-gray-50 flex overflow-x-auto">
                      {selectedPlatforms.map((platform) => (
                        <Button 
                          key={platform}
                          variant="ghost" 
                          size="sm" 
                          className="rounded-none bg-blue-50 whitespace-nowrap"
                        >
                          <div className="flex items-center gap-2">
                            <SocialIcon platform={platform} size={16} />
                            <span>Original Draft</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                    
                    <div className="p-3 sm:p-4">
                      <Textarea 
                        placeholder="Start writing post caption or ✨ Generate with AI Pilot" 
                        className="min-h-[150px] sm:min-h-[180px] mb-2 border-0 focus-visible:ring-0 resize-none text-sm sm:text-base"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex border-t p-2 justify-between items-center">
                      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                        <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                          <Image className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 bg-blue-100 text-blue-600 flex-shrink-0">
                          <span className="text-xs sm:text-sm">C</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                          <span className="text-sm sm:text-lg">😊</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                          <LinkIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                          <Hash className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">{postContent.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <Button variant="ghost" className="flex items-center gap-1 justify-start">
                    <Tag className="h-4 w-4" />
                    <span>Add Tags</span>
                  </Button>
                  <Button variant="ghost" className="flex items-center gap-1 justify-start">
                    <ExternalLink className="h-4 w-4" />
                    <span>Connect Shortener</span>
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-auto pt-6">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 justify-center"
                    onClick={() => handleCreatePost(true)}
                    disabled={createPostMutation.isPending}
                  >
                    <Save className="h-4 w-4" />
                    Save as Draft
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 justify-center"
                      onClick={() => handleCreatePost(false)}
                      disabled={createPostMutation.isPending}
                    >
                      <Send className="h-4 w-4" />
                      {createPostMutation.isPending ? 'Publishing...' : 'Post Now'}
                    </Button>
                    <Button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 justify-center">
                      <Calendar className="h-4 w-4" />
                      Schedule Post
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="border-b">
                      <Tabs value={activeRightTab} onValueChange={setActiveRightTab}>
                        <TabsList className="w-full">
                          <TabsTrigger value="preview" className="flex-1 text-xs sm:text-sm">Preview</TabsTrigger>
                          <TabsTrigger value="comments" className="flex-1 text-xs sm:text-sm">Comments</TabsTrigger>
                          <TabsTrigger value="accounts" className="flex-1 text-xs sm:text-sm">Accounts</TabsTrigger>
                        </TabsList>
                      
                        <TabsContent value="preview" className="flex-grow p-3 sm:p-4">
                          {postContent ? (
                            <div className="border rounded-lg p-3 sm:p-4">
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-blue-600 font-semibold text-sm">U</span>
                                </div>
                                <div>
                                  <p className="font-medium text-sm sm:text-base">User Name</p>
                                  <p className="text-xs text-gray-500">Just now</p>
                                </div>
                              </div>
                              <p className="text-sm sm:text-base mb-3">{postContent}</p>
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500 flex flex-col items-center justify-center h-full">
                              <PenLine className="w-8 h-8 sm:w-12 sm:h-12 mb-3 opacity-20" />
                              <p className="text-sm">Start typing to see a preview</p>
                            </div>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="comments" className="flex-grow p-3 sm:p-4">
                          <div className="text-center py-8 text-gray-500">
                            <p className="text-sm">No comments configuration available</p>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="accounts" className="flex-grow overflow-auto">
                          <div className="p-3 sm:p-4">
                            <div className="mb-4">
                              <h3 className="font-medium mb-2 text-sm sm:text-base">Group</h3>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                                <div className="relative w-full sm:max-w-[240px]">
                                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                  <Input 
                                    className="pl-8 text-sm" 
                                    placeholder="Search an account"
                                  />
                                </div>
                                <Button variant="ghost" size="icon">
                                  <Filter className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Checkbox id="select-all" />
                                    <Label htmlFor="select-all" className="text-sm">1 Account selected.</Label>
                                  </div>
                                  <Button variant="link" className="text-blue-500 h-auto p-0 text-sm">
                                    Clear All
                                  </Button>
                                </div>
                                
                                <div className="flex items-center border p-2 rounded-md justify-between bg-gray-50">
                                  <div className="flex items-center gap-2">
                                    <Checkbox id="linkedin-account" checked />
                                    <div className="flex items-center gap-1">
                                      <div className="bg-blue-600 text-white rounded p-1 flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6">
                                        <span className="text-xs">in</span>
                                      </div>
                                      <Label htmlFor="linkedin-account" className="text-sm">Darshan</Label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-8">
                              <div className="flex items-center justify-center flex-col gap-2">
                                <div className="w-full max-w-[200px] sm:max-w-[240px]">
                                  <img src="/lovable-uploads/dfc9e41d-494b-4d37-97d8-ec2f91b236a4.png" alt="Empty state" className="w-full" />
                                </div>
                                <p className="text-center text-gray-500 text-sm">You have not created any groups yet</p>
                                <p className="text-center text-xs sm:text-sm text-gray-400 max-w-[300px]">
                                  You can sort your social media accounts in a Group. Use it for quick selection, filtering and more.
                                </p>
                                <Button className="mt-2 text-sm">
                                  <Plus className="h-4 w-4 mr-1" /> Create Group
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {activeTab === 'drafts' && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold">Your Drafts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {drafts.filter(post => post.status === 'draft').map((draft) => (
                <Card key={draft.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">{draft.platform}</span>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm line-clamp-3">{draft.content}</p>
                    <p className="text-xs text-gray-500">
                      Created {new Date(draft.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
              {drafts.filter(post => post.status === 'draft').length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No drafts found. Start creating content!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="text-center py-8 text-gray-500">
            <p>Feed content feature coming soon!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;

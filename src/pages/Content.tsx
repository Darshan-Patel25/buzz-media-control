
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PlatformSelector from '@/components/PlatformSelector';
import PostCard from '@/components/PostCard';
import { usePosts, useDeletePost } from '@/hooks/useSupabaseData';
import { Search, ListFilter, Grid, List, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Content() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const { toast } = useToast();

  const { data: posts = [], isLoading } = usePosts();
  const deletePostMutation = useDeletePost();

  const filteredPosts = posts.filter(post => {
    const matchesPlatform = selectedPlatform === 'all' 
      ? true 
      : post.platform === selectedPlatform;
    
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : post.status === statusFilter;
    
    const matchesSearch = searchQuery === '' 
      ? true 
      : post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = a.scheduled_date ? new Date(a.scheduled_date) : new Date(a.created_at);
      const dateB = b.scheduled_date ? new Date(b.scheduled_date) : new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    }
    return 0;
  });

  const handleEditPost = (post: any) => {
    setSelectedPost(post);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePostMutation.mutateAsync(postId);
      toast({
        title: "Post deleted",
        description: "The post has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDuplicatePost = (post: any) => {
    toast({
      title: "Post duplicated",
      description: "The post has been duplicated and added to drafts.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className='px-3 sm:px-5'>
      <PageHeader 
        title="Content" 
        description="Manage all your social media content in one place"
        showNewPostButton
      />

      <div className="mb-4 sm:mb-6 flex flex-col gap-4 items-start">
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search content..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2 w-full overflow-x-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 whitespace-nowrap">
                <ListFilter className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy('date')}>
                Date {sortBy === 'date' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            className="gap-2 whitespace-nowrap"
            onClick={() => setShowFilterDialog(true)}
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          
          <div className="border rounded-md flex">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none",
                viewMode === 'grid' && "bg-accent"
              )}
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-none",
                viewMode === 'list' && "bg-accent"
              )}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelect={setSelectedPlatform}
        />
      </div>

      {sortedPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gray-100 p-4 mb-4">
            <FileSearch className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
          <p className="text-sm text-gray-500 max-w-md mt-1">
            {posts.length === 0 
              ? "You haven't created any posts yet. Create your first post to get started!"
              : "We couldn't find any posts that match your current filters. Try adjusting your search or filters."
            }
          </p>
        </div>
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
            : "space-y-4"
        )}>
          {sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                id: post.id,
                content: post.content,
                attachments: [],
                scheduledDate: post.scheduled_date ? new Date(post.scheduled_date) : undefined,
                status: post.status === 'failed' ? 'draft' : post.status as 'draft' | 'scheduled' | 'published',
                socialProfiles: [post.platform],
                createdAt: post.created_at,
                engagement: {
                  likes: post.likes_count || 0,
                  shares: post.shares_count || 0,
                  comments: post.comments_count || 0
                }
              }}
              variant={viewMode === 'grid' ? 'default' : 'compact'}
              onEdit={handleEditPost}
              onDelete={() => handleDeletePost(post.id)}
              onDuplicate={handleDuplicatePost}
            />
          ))}
        </div>
      )}

      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <PlatformSelector
                selectedPlatform={selectedPlatform}
                onSelect={setSelectedPlatform}
                className="flex-wrap gap-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setStatusFilter('all');
                setSelectedPlatform('all');
              }}
            >
              Reset
            </Button>
            <DialogClose asChild>
              <Button>Apply Filters</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const FileSearch = ({ className, ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-file-search", className)}
      {...props}
    >
      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" />
      <path d="M14 2v6h6" />
      <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="m9 18-1.5-1.5" />
    </svg>
  );
};

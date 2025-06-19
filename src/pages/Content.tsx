
import React, { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import PlatformSelector from '@/components/PlatformSelector';
import PostCard from '@/components/PostCard';
import ContentSearch from '@/components/content/ContentSearch';
import ContentToolbar from '@/components/content/ContentToolbar';
import ContentFilters from '@/components/content/ContentFilters';
import EmptyState from '@/components/content/EmptyState';
import { usePosts, useDeletePost } from '@/hooks/useSupabaseData';
import { useContentFilters } from '@/hooks/useContentFilters';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Content() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const { toast } = useToast();

  const { data: posts = [], isLoading } = usePosts();
  const deletePostMutation = useDeletePost();

  const {
    selectedPlatform,
    setSelectedPlatform,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredAndSortedPosts
  } = useContentFilters(posts);

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
          <ContentSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        
        <ContentToolbar
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onFilterClick={() => setShowFilterDialog(true)}
        />
      </div>

      <div className="mb-4 sm:mb-6">
        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelect={setSelectedPlatform}
        />
      </div>

      {filteredAndSortedPosts.length === 0 ? (
        <EmptyState hasAnyPosts={posts.length > 0} />
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
            : "space-y-4"
        )}>
          {filteredAndSortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                id: post.id,
                content: post.content,
                attachments: [],
                scheduledDate: post.scheduled_date ? new Date(post.scheduled_date) : undefined,
                status: post.status === 'failed' ? 'draft' : post.status as 'draft' | 'scheduled' | 'published',
                socialProfiles: [post.platform],
                createdAt: post.created_at as string,
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

      <ContentFilters
        showFilterDialog={showFilterDialog}
        onFilterDialogChange={setShowFilterDialog}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
      />
    </div>
  );
}

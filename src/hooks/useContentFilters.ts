
import { useState, useMemo } from 'react';

interface Post {
  id: string;
  content: string;
  platform: string;
  status: string;
  scheduled_date?: string;
  created_at: string;
  likes_count?: number;
  shares_count?: number;
  comments_count?: number;
}

export function useContentFilters(posts: Post[]) {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredAndSortedPosts = useMemo(() => {
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

    return [...filteredPosts].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = a.scheduled_date ? new Date(a.scheduled_date) : new Date(a.created_at);
        const dateB = b.scheduled_date ? new Date(b.scheduled_date) : new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });
  }, [posts, selectedPlatform, searchQuery, statusFilter, sortBy]);

  return {
    selectedPlatform,
    setSelectedPlatform,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    filteredAndSortedPosts
  };
}

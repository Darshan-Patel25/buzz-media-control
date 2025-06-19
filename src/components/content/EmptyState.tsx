
import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  hasAnyPosts: boolean;
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

export default function EmptyState({ hasAnyPosts }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <FileSearch className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
      <p className="text-sm text-gray-500 max-w-md mt-1">
        {!hasAnyPosts 
          ? "You haven't created any posts yet. Create your first post to get started!"
          : "We couldn't find any posts that match your current filters. Try adjusting your search or filters."
        }
      </p>
    </div>
  );
}

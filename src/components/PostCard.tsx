import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  Instagram, 
  Twitter, 
  Facebook, 
  Send, 
  MoreVertical,
  Edit,
  Trash,
  Copy,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface Post {
  id: string;
  content: string;
  image?: string;
  platforms: string[];
  status: 'scheduled' | 'published' | 'draft';
  scheduledDate?: string;
  scheduledTime?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact';
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
  onDuplicate?: (post: Post) => void;
}

export default function PostCard({
  post,
  variant = 'default',
  onEdit,
  onDelete,
  onDuplicate,
}: PostCardProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4 text-pink-500" />;
      case 'twitter':
        return <Twitter className="h-4 w-4 text-blue-400" />;
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'telegram':
        return <Send className="h-4 w-4 text-sky-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={cn("h-full flex flex-col", 
      variant === 'compact' ? 'shadow-sm' : 'shadow-md')
    }>
      <CardContent className={cn(
        "flex flex-col flex-grow",
        variant === 'compact' ? 'p-3' : 'p-5'
      )}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex space-x-1">
            {post.platforms.map((platform) => (
              <div key={platform} className="p-1">
                {getPlatformIcon(platform)}
              </div>
            ))}
          </div>
          <Badge className={getStatusColor(post.status)}>
            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
          </Badge>
        </div>

        {post.image && variant !== 'compact' && (
          <div className="relative w-full h-40 mb-3 rounded-md overflow-hidden">
            <img
              src={post.image}
              alt="Post content"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <p className={cn(
          "text-gray-700 dark:text-gray-300 flex-grow", 
          variant === 'compact' ? 'line-clamp-2 text-sm' : 'line-clamp-3'
        )}>
          {post.content}
        </p>

        {post.scheduledDate && post.scheduledTime && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-2">{post.scheduledDate}</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.scheduledTime}</span>
          </div>
        )}

        {post.engagement && variant !== 'compact' && (
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-gray-500">
            <div className="flex flex-col items-center p-1 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-medium">{post.engagement.likes}</span>
              <span>Likes</span>
            </div>
            <div className="flex flex-col items-center p-1 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-medium">{post.engagement.comments}</span>
              <span>Comments</span>
            </div>
            <div className="flex flex-col items-center p-1 bg-gray-50 dark:bg-gray-800 rounded">
              <span className="font-medium">{post.engagement.shares}</span>
              <span>Shares</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className={cn(
        "border-t flex justify-end p-3",
        variant === 'compact' ? 'pt-2' : ''
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(post)}>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
            )}
            {onDuplicate && (
              <DropdownMenuItem onClick={() => onDuplicate(post)}>
                <Copy className="h-4 w-4 mr-2" /> Duplicate
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => onDelete(post.id)}
              >
                <Trash className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}

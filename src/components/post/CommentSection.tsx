
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  avatar?: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  postId, 
  comments, 
  onAddComment 
}) => {
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={() => setShowComments(!showComments)}
        className="flex items-center gap-2"
      >
        <MessageCircle className="h-4 w-4" />
        Comments ({comments.length})
      </Button>

      {showComments && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {comment.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No comments yet</p>
              )}
            </div>

            <div className="flex gap-2">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 min-h-[80px]"
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                size="icon"
                className="self-end"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommentSection;

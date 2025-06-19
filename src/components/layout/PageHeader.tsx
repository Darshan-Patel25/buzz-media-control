import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BellIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  showNewPostButton?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  showNewPostButton = false,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6", className)}>
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center mt-4 sm:mt-0 space-x-2 self-end sm:self-auto">
        {actions}
        <Button variant="outline" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        {showNewPostButton && (
          <Link to="/create-post">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <PlusIcon className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

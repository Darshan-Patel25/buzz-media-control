
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListFilter, Grid, List, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentToolbarProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onFilterClick: () => void;
}

export default function ContentToolbar({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onFilterClick
}: ContentToolbarProps) {
  return (
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
          <DropdownMenuItem onClick={() => onSortChange('date')}>
            Date {sortBy === 'date' && '✓'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        variant="outline" 
        className="gap-2 whitespace-nowrap"
        onClick={onFilterClick}
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
          onClick={() => onViewModeChange('grid')}
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
          onClick={() => onViewModeChange('list')}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}


import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PlatformSelector from '@/components/PlatformSelector';

interface ContentFiltersProps {
  showFilterDialog: boolean;
  onFilterDialogChange: (open: boolean) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

export default function ContentFilters({
  showFilterDialog,
  onFilterDialogChange,
  statusFilter,
  onStatusFilterChange,
  selectedPlatform,
  onPlatformChange
}: ContentFiltersProps) {
  const handleReset = () => {
    onStatusFilterChange('all');
    onPlatformChange('all');
  };

  return (
    <Dialog open={showFilterDialog} onOpenChange={onFilterDialogChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filter Content</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
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
              onSelect={onPlatformChange}
              className="flex-wrap gap-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <DialogClose asChild>
            <Button>Apply Filters</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

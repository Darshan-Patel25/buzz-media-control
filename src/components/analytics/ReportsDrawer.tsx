
import React from 'react';
import { X } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SocialPlatform } from '@/types';
import SocialIcon from '@/components/common/SocialIcon';

interface ReportsDrawerProps {
  children: React.ReactNode;
  onPlatformSelect: (platform: SocialPlatform | 'all') => void;
  selectedPlatform: SocialPlatform | 'all';
}

const ReportsDrawer: React.FC<ReportsDrawerProps> = ({ 
  children, 
  onPlatformSelect, 
  selectedPlatform 
}) => {
  const platforms: { id: SocialPlatform | 'all', name: string, isNew?: boolean }[] = [
    { id: 'all', name: 'All Platforms' },
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'linkedin', name: 'LinkedIn' },
    { id: 'twitter', name: 'Twitter' },
    { id: 'youtube', name: 'YouTube', isNew: true },
    { id: 'tiktok', name: 'TikTok', isNew: true },
    // Remove 'google' as it's not in the SocialPlatform type
    // { id: 'google', name: 'Google Business Profile' },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Manage Reports</span>
          <Badge variant="secondary">2.0</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-lg">Manage Reports</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="overflow-auto h-full py-2">
          <div className="space-y-1 px-2">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={selectedPlatform === platform.id ? "secondary" : "ghost"}
                className="w-full justify-start text-left relative"
                onClick={() => {
                  onPlatformSelect(platform.id);
                }}
              >
                <div className="flex items-center gap-2">
                  {platform.id === 'all' ? (
                    <div className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded-full">
                      <span className="text-xs font-bold text-blue-600">A</span>
                    </div>
                  ) : (
                    <SocialIcon platform={platform.id as SocialPlatform} size={20} />
                  )}
                  <span>{platform.name}</span>
                </div>
                {platform.isNew && (
                  <Badge variant="outline" className="absolute right-2 bg-yellow-50 text-yellow-700 border-yellow-300 text-[10px]">
                    NEW
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReportsDrawer;

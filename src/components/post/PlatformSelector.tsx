
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';

interface PlatformSelectorProps {
  selectedPlatforms: SocialPlatform[];
  onPlatformsChange: (platforms: SocialPlatform[]) => void;
}

const platforms: { id: SocialPlatform; label: string }[] = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'tiktok', label: 'TikTok' },
];

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatforms,
  onPlatformsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePlatform = (platform: SocialPlatform) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformsChange(selectedPlatforms.filter(p => p !== platform));
    } else {
      onPlatformsChange([...selectedPlatforms, platform]);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between min-w-[200px]"
        >
          <div className="flex items-center gap-2">
            {selectedPlatforms.length === 0 ? (
              <span>Select platforms</span>
            ) : selectedPlatforms.length === 1 ? (
              <>
                <SocialIcon platform={selectedPlatforms[0]} size={16} />
                <span>{platforms.find(p => p.id === selectedPlatforms[0])?.label}</span>
              </>
            ) : (
              <span>{selectedPlatforms.length} platforms selected</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-2">
        <div className="space-y-1">
          {platforms.map((platform) => (
            <Button
              key={platform.id}
              variant="ghost"
              className="w-full justify-start gap-2 h-10"
              onClick={() => togglePlatform(platform.id)}
            >
              <SocialIcon platform={platform.id} size={16} />
              <span className="flex-1 text-left">{platform.label}</span>
              {selectedPlatforms.includes(platform.id) && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PlatformSelector;

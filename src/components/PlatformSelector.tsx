import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Instagram,
  Twitter,
  Facebook,
  Send,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const platforms = [
  { id: 'all', name: 'All Platforms', icon: Globe, color: 'bg-gray-500' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'bg-pink-500' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
  { id: 'telegram', name: 'Telegram', icon: Send, color: 'bg-sky-500' },
];

interface PlatformSelectorProps {
  selectedPlatform: string;
  onSelect: (platformId: string) => void;
  className?: string;
}

export default function PlatformSelector({
  selectedPlatform,
  onSelect,
  className,
}: PlatformSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {platforms.map((platform) => (
        <Button
          key={platform.id}
          variant={selectedPlatform === platform.id ? "default" : "outline"}
          className={cn(
            "gap-2",
            selectedPlatform === platform.id
              ? "bg-blue-600 hover:bg-blue-600"
              : ""
          )}
          onClick={() => onSelect(platform.id)}
        >
          <div className={cn("h-5 w-5 rounded-full flex items-center justify-center", platform.color)}>
            <platform.icon className="text-white h-3 w-3" />
          </div>
          <span>{platform.name}</span>
        </Button>
      ))}
    </div>
  );
}

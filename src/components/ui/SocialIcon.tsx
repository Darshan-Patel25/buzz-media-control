
import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, PinterestIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialPlatform } from '@/lib/types';

// Custom TikTok icon since it's not included in lucide-react
const TiktokIcon = ({ className, ...props }: React.ComponentProps<typeof Twitter>) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={cn("lucide lucide-tiktok", className)}
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
};

interface SocialIconProps extends React.HTMLAttributes<HTMLDivElement> {
  platform: SocialPlatform;
  size?: number;
  withBackground?: boolean;
}

export const SocialIcon = ({ 
  platform, 
  size = 20, 
  withBackground = false,
  className,
  ...props 
}: SocialIconProps) => {
  const getIcon = () => {
    switch (platform) {
      case 'twitter':
        return <Twitter size={size} />;
      case 'facebook':
        return <Facebook size={size} />;
      case 'instagram':
        return <Instagram size={size} />;
      case 'linkedin':
        return <Linkedin size={size} />;
      case 'pinterest':
        return <PinterestIcon size={size} />;
      case 'tiktok':
        return <TiktokIcon size={size} />;
      default:
        return null;
    }
  };

  if (withBackground) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center rounded-full p-1.5",
          {
            'bg-social-twitter text-white': platform === 'twitter',
            'bg-social-facebook text-white': platform === 'facebook',
            'bg-social-instagram text-white': platform === 'instagram',
            'bg-social-linkedin text-white': platform === 'linkedin',
            'bg-social-pinterest text-white': platform === 'pinterest',
            'bg-social-tiktok text-white': platform === 'tiktok',
          },
          className
        )}
        {...props}
      >
        {getIcon()}
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        {
          'text-social-twitter': platform === 'twitter',
          'text-social-facebook': platform === 'facebook',
          'text-social-instagram': platform === 'instagram',
          'text-social-linkedin': platform === 'linkedin',
          'text-social-pinterest': platform === 'pinterest',
          'text-social-tiktok': platform === 'tiktok',
        },
        className
      )}
      {...props}
    >
      {getIcon()}
    </div>
  );
};

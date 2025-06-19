
import React from 'react';
import { Bell, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const headerTitles = {
    'Dashboard': 'Trendlyzer Dashboard',
    'Content': 'Trendlyzer Content',
    'Create Post': 'Trendlyzer Create Post',
    'Schedule': 'Trendlyzer Schedule',
    'Analytics': 'Trendlyzer Analytics',
    'Engagement': 'Trendlyzer Engagement',
    'Profile': 'Trendlyzer Profile',
    'Settings': 'Trendlyzer Settings',
  };

  const displayTitle = headerTitles[title as keyof typeof headerTitles] || title;

  return (
    <div className="border-b bg-white flex items-center justify-between p-4">
      <div>
        <h1 className="text-xl font-bold pl-4">{displayTitle}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 w-[200px] lg:w-[300px]"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <div className="p-2 text-sm font-medium border-b">Notifications</div>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">Your post has been published</p>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm">New follower on Twitter</p>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center">
              <Button variant="ghost" size="sm" className="w-full">View all</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">U</span>
              </div>
              <span className="hidden md:inline">User Name</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Upgrade Plan</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;

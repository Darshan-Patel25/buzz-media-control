
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutGrid, Calendar, BarChart3, Settings, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}

const NavigationItem = ({ icon, label, to, active }: NavigationItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
      asChild
    >
      <Link to={to}>
        {icon}
        <span>{label}</span>
      </Link>
    </Button>
  );
};

export const Navigation = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const handleCreatePost = () => {
    toast({
      title: "Coming Soon",
      description: "The post creation feature is coming soon!",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };
  
  return (
    <div className={cn(
      "flex flex-col h-screen bg-sidebar p-4",
      isMobile ? "w-20" : "w-64"
    )}>
      <div className="flex items-center mb-8">
        {!isMobile && (
          <h1 className="text-2xl font-bold text-sidebar-foreground">SocialBee</h1>
        )}
        {isMobile && (
          <div className="w-full flex justify-center">
            <span className="text-2xl font-bold text-sidebar-foreground">SB</span>
          </div>
        )}
      </div>

      <Button
        className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 mb-6 gap-2"
        onClick={handleCreatePost}
      >
        <Plus size={18} />
        {!isMobile && <span>Create Post</span>}
      </Button>

      <nav className="space-y-2 flex-1">
        <NavigationItem
          icon={<LayoutGrid size={20} />}
          label="Dashboard"
          to="/"
          active={location.pathname === '/'}
        />
        <NavigationItem
          icon={<Calendar size={20} />}
          label="Calendar"
          to="/calendar"
          active={location.pathname === '/calendar'}
        />
        <NavigationItem
          icon={<BarChart3 size={20} />}
          label="Analytics"
          to="/analytics"
          active={location.pathname === '/analytics'}
        />
        <NavigationItem
          icon={<Settings size={20} />}
          label="Settings"
          to="/settings"
          active={location.pathname === '/settings'}
        />
      </nav>

      <div className="mt-auto">
        <Separator className="my-4 bg-sidebar-border" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!isMobile && (
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                <p className="text-xs text-sidebar-foreground/70">john@example.com</p>
              </div>
            )}
          </div>
          {!isMobile && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={handleLogout}
            >
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

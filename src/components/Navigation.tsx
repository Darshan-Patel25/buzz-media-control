
import React from 'react';
import { cn } from '@/lib/utils';
import { LayoutGrid, Calendar, BarChart3, Settings, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavigationItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavigationItem = ({ icon, label, active, onClick }: NavigationItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

export const Navigation = () => {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = React.useState<string>("dashboard");

  const handleNavigation = (page: string) => {
    setActivePage(page);
    // In a real app, you would navigate to the page
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
      >
        <Plus size={18} />
        {!isMobile && <span>Create Post</span>}
      </Button>

      <nav className="space-y-2 flex-1">
        <NavigationItem
          icon={<LayoutGrid size={20} />}
          label="Dashboard"
          active={activePage === "dashboard"}
          onClick={() => handleNavigation("dashboard")}
        />
        <NavigationItem
          icon={<Calendar size={20} />}
          label="Calendar"
          active={activePage === "calendar"}
          onClick={() => handleNavigation("calendar")}
        />
        <NavigationItem
          icon={<BarChart3 size={20} />}
          label="Analytics"
          active={activePage === "analytics"}
          onClick={() => handleNavigation("analytics")}
        />
        <NavigationItem
          icon={<Settings size={20} />}
          label="Settings"
          active={activePage === "settings"}
          onClick={() => handleNavigation("settings")}
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
            <Button size="icon" variant="ghost" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <LogOut size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

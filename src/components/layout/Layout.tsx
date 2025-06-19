
import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import UserMenu from './UserMenu';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);
  
  const getTitle = (): string => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path === '/create-post') return 'Create Post';
    if (path === '/schedule') return 'Schedule Posts';
    if (path === '/analytics') return 'Analytics';
    if (path === '/engagement') return 'Engagement';
    if (path === '/profile') return 'My Profile';
    if (path === '/content') return 'Content';
    if (path === '/settings') return 'Settings';
    
    return 'Trendlyzer';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SideNav />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isMobile 
          ? 'ml-0' 
          : isSidebarOpen 
            ? 'lg:ml-52' 
            : 'ml-16'
      }`}>
        <div className="border-b bg-white flex items-center justify-between px-2 sm:px-4 h-12">
          <h1 className="text-lg sm:text-xl font-bold pl-2 sm:pl-4">{getTitle()}</h1>
          <UserMenu />
        </div>
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Send,
  FilePen,
  Calendar,
  BarChart3,
  MessageCircle,
  UserCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const SideNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/' },
    { icon: <FilePen className="w-5 h-5" />, label: 'Content', path: '/content' },
    { icon: <Send className="w-5 h-5" />, label: 'Create Post', path: '/create-post' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Schedule', path: '/schedule' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', path: '/analytics' },
    { icon: <MessageCircle className="w-5 h-5" />, label: 'Engagement', path: '/engagement' },
    { icon: <UserCircle className="w-5 h-5" />, label: 'Profile', path: '/profile' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-lg flex flex-col transition-width duration-300',
        isOpen ? 'w-56' : 'w-16'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link
          to="/"
          className={cn(
            'flex items-center gap-3',
            isOpen ? 'justify-start' : 'justify-center w-full'
          )}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold select-none text-lg">T</span>
          </div>
          {isOpen && <h1 className="text-2xl font-bold text-gray-900 select-none">Trendlyzer</h1>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 p-1 rounded-md"
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-4">
        <ul className="flex flex-col space-y-3 px-2">
          {navItems.map(({ icon, label, path }, idx) => {
            const isActive = location.pathname === path;
            return (
              <li key={idx}>
                <Link
                  to={path}
                  className={cn(
                    'group flex items-center gap-4 rounded-md px-3 py-2 font-bold transition-colors',
                    isActive
                      ? 'bg-blue-100 text-blue-700 shadow-inner'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  title={label}
                >
                  <span
                    className={cn(
                      'flex-shrink-0 transition-colors duration-200',
                      isActive ? 'text-blue-700' : 'text-gray-600 group-hover:text-gray-900'
                    )}
                  >
                    {icon}
                  </span>
                  {isOpen && <span className="text-sm">{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User info */}
      <div
        className={cn(
          'p-4 border-t border-gray-200 flex items-center gap-3',
          isOpen ? 'justify-start' : 'justify-center'
        )}
      >
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center select-none">
          <span className="text-white font-bold text-lg">U</span>
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <p className="text-gray-900 font-semibold leading-tight truncate">User Name</p>
            <p className="text-xs text-gray-500 font-medium">Free Plan</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideNav;

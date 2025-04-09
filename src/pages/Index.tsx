
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { AccountsOverview } from '@/components/dashboard/AccountsOverview';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { UpcomingPosts } from '@/components/dashboard/UpcomingPosts';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <AccountsOverview />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <QuickActions />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
          
          <div className="mt-6">
            <UpcomingPosts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

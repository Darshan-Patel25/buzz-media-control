
import React from 'react';
import ConnectedAccounts from '@/components/dashboard/ConnectedAccounts';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import DynamicStats from '@/components/dashboard/DynamicStats';
import UpcomingPosts from '@/components/dashboard/UpcomingPosts';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-3 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Welcome back! Here's what's happening with your accounts.
          </p>
        </div>
      </div>

      <DynamicStats />
      
      <ConnectedAccounts />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <QuickActions />
        </div>
        <UpcomingPosts />
      </div>

      <RecentActivity />
    </div>
  );
};

export default Dashboard;

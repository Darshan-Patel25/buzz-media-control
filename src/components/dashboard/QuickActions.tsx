
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarPlus, Image, BarChart3, RefreshCw } from 'lucide-react';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const ActionCard = ({ icon, title, description, onClick }: ActionCardProps) => {
  return (
    <Card className="hover:border-primary/50 cursor-pointer transition-all" onClick={onClick}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const QuickActions = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <Button variant="ghost" size="sm" className="text-sm">View All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard
          icon={<CalendarPlus className="text-primary" size={24} />}
          title="Schedule Post"
          description="Create and schedule content for your accounts"
          onClick={() => console.log("Schedule Post clicked")}
        />
        <ActionCard
          icon={<Image className="text-primary" size={24} />}
          title="Content Library"
          description="Upload and manage your media assets"
          onClick={() => console.log("Content Library clicked")}
        />
        <ActionCard
          icon={<BarChart3 className="text-primary" size={24} />}
          title="Analytics Report"
          description="View insights about your social performance"
          onClick={() => console.log("Analytics Report clicked")}
        />
        <ActionCard
          icon={<RefreshCw className="text-primary" size={24} />}
          title="Sync Accounts"
          description="Refresh data from your connected platforms"
          onClick={() => console.log("Sync Accounts clicked")}
        />
      </div>
    </div>
  );
};

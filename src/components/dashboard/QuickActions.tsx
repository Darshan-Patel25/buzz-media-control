
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Image, BarChart3, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Schedule Post',
      description: 'Create and schedule content for your accounts',
      icon: Calendar,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      link: '/create-post'
    },
    {
      title: 'Content Library',
      description: 'Upload and manage your media assets',
      icon: Image,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      link: '/content'
    },
    {
      title: 'Analytics Report',
      description: 'View insights about your social performance',
      icon: BarChart3,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      link: '/analytics'
    },
    {
      title: 'Sync Accounts',
      description: 'Refresh data from your connected platforms',
      icon: RefreshCw,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      link: '/settings'
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/content">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer bg-white">
              <CardContent className="p-6">
                <Link to={action.link} className="block">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${action.iconBg}`}>
                      <IconComponent className={`h-5 w-5 ${action.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

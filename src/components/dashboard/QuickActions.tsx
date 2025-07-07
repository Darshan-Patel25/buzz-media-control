
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, BarChart3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSocialAccounts, usePosts } from '@/hooks/useSupabaseData';

const QuickActions: React.FC = () => {
  const { data: socialAccounts = [] } = useSocialAccounts();
  const { data: posts = [] } = usePosts();

  const connectedAccountsCount = socialAccounts.filter(account => account.is_connected).length;
  const scheduledPostsCount = posts.filter(post => post.status === 'scheduled').length;

  const quickActions = [
    {
      title: 'Create Post',
      description: 'Create and publish new content',
      icon: Plus,
      color: 'bg-blue-500',
      link: '/create-post',
      enabled: connectedAccountsCount > 0,
      disabledMessage: 'Connect an account first'
    },
    {
      title: 'Schedule Posts',
      description: `${scheduledPostsCount} posts scheduled`,
      icon: Calendar,
      color: 'bg-green-500',
      link: '/schedule',
      enabled: true
    },
    {
      title: 'View Analytics',
      description: 'Check your performance',
      icon: BarChart3,
      color: 'bg-purple-500',
      link: '/analytics',
      enabled: posts.length > 0,
      disabledMessage: 'Create posts to see analytics'
    },
    {
      title: 'Manage Accounts',
      description: `${connectedAccountsCount} accounts connected`,
      icon: Users,
      color: 'bg-orange-500',
      link: '/settings',
      enabled: true
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <p className="text-sm text-muted-foreground">Get things done faster</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            
            return (
              <div key={action.title} className="relative">
                <Button
                  asChild={action.enabled}
                  variant="outline"
                  className={`w-full h-24 flex flex-col items-center justify-center space-y-2 p-4 ${
                    !action.enabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
                  }`}
                  disabled={!action.enabled}
                >
                  {action.enabled ? (
                    <Link to={action.link} className="flex flex-col items-center space-y-2">
                      <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm">{action.title}</p>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-8 h-8 rounded-full ${action.color} flex items-center justify-center opacity-50`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-sm">{action.title}</p>
                        <p className="text-xs text-muted-foreground">{action.disabledMessage || action.description}</p>
                      </div>
                    </div>
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;

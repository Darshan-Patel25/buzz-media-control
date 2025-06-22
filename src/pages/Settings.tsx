import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCog, Users, Globe, Shield, Clock, Brush } from 'lucide-react';
import ConnectAccountDialog from '@/components/social/ConnectAccountDialog';
import ConnectedAccountCard from '@/components/social/ConnectedAccountCard';
import { useSocialAccounts } from '@/hooks/useSupabaseData';
import { SocialPlatform } from '@/types';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workspace');
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<{
    id: SocialPlatform;
    label: string;
  } | null>(null);

  const { data: socialAccounts = [] } = useSocialAccounts();

  const platforms = [
    { id: 'facebook' as SocialPlatform, label: 'Facebook' },
    { id: 'twitter' as SocialPlatform, label: 'Twitter' },
    { id: 'linkedin' as SocialPlatform, label: 'LinkedIn' },
    { id: 'instagram' as SocialPlatform, label: 'Instagram' },
    { id: 'youtube' as SocialPlatform, label: 'YouTube' },
    { id: 'tiktok' as SocialPlatform, label: 'TikTok' },
  ];

  const handleConnectPlatform = (platform: { id: SocialPlatform; label: string }) => {
    setSelectedPlatform(platform);
    setConnectDialogOpen(true);
  };

  const getConnectedAccount = (platformId: SocialPlatform) => {
    return socialAccounts.find(account => account.platform === platformId && account.is_connected);
  };
  
  return (
    <div className="space-y-6 pl-5 pr-3">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Change your settings here. But don't change who you are. You are awesome!</p>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-yellow-600 font-bold">DP</span>
          </div>
        </div>
        <h2 className="text-xl font-medium text-center mt-3">Darshan Patel</h2>
      </div>
      
      <Tabs defaultValue="workspace" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-transparent p-0 mb-2">
          <div className="flex overflow-x-auto pb-2 space-x-4">
            <TabsTrigger 
              value="workspace" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <UserCog className="w-4 h-4" />
              <span>Workspace Settings</span>
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <Users className="w-4 h-4" />
              <span>Users & Roles</span>
            </TabsTrigger>
            <TabsTrigger 
              value="social" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <Globe className="w-4 h-4" />
              <span>Social Accounts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger 
              value="appearance" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <Brush className="w-4 h-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger 
              value="timezone" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <Clock className="w-4 h-4" />
              <span>Timezone</span>
            </TabsTrigger>
          </div>
        </TabsList>
        
        <TabsContent value="workspace">
          <Card>
            <CardHeader>
              <CardTitle>Workspace Settings</CardTitle>
              <CardDescription>Customize your workspace preferences and defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input id="workspace-name" defaultValue="My Trendlyzer Workspace" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workspace-desc">Workspace Description</Label>
                <Input id="workspace-desc" placeholder="Describe your workspace" />
              </div>
              
              <div className="space-y-2">
                <Label>Default Settings</Label>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Auto-approve posts</p>
                      <p className="text-sm text-muted-foreground">Automatically approve posts when they are created</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Show analytics on dashboard</p>
                      <p className="text-sm text-muted-foreground">Display analytics widgets on the dashboard</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email notifications for team members</p>
                      <p className="text-sm text-muted-foreground">Send email notifications for post approvals and comments</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <Button>Save Workspace Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Users & Roles</CardTitle>
                <CardDescription>Manage team members and their permissions</CardDescription>
              </div>
              <Button size="sm">Invite User</Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="font-medium text-blue-600">DP</span>
                          </div>
                          <span className="font-medium">Darshan Patel</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">2022002352.gcet@cxmu.edu.in</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Admin
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Accounts</CardTitle>
              <CardDescription>Manage your connected social media accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.map((platform) => {
                  const connectedAccount = getConnectedAccount(platform.id);
                  return (
                    <ConnectedAccountCard
                      key={platform.id}
                      platform={platform.id}
                      platformLabel={platform.label}
                      accountName={connectedAccount?.account_name || ''}
                      accountUsername={connectedAccount?.account_username || ''}
                      followersCount={connectedAccount?.followers_count}
                      isConnected={!!connectedAccount}
                      onConnect={() => handleConnectPlatform(platform)}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <Label>Two-Factor Authentication</Label>
                <Card className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Enable Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </Card>
              </div>
              
              <div className="space-y-1">
                <Label>Password</Label>
                <Card className="p-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Your password is managed through your WebPros account. To change your password, please visit your WebPros account settings.
                    </p>
                    <Button variant="outline">Go to WebPros Account</Button>
                  </div>
                </Card>
              </div>
              
              <div className="space-y-1">
                <Label>Session Management</Label>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • Started 2 hours ago</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <Button variant="outline" className="w-full">Sign Out All Other Devices</Button>
                  </div>
                </Card>
              </div>
              
              <div className="space-y-1">
                <Label>API Access</Label>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Enable API Access</p>
                        <p className="text-sm text-muted-foreground">Allow external applications to access your account</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">API Key</p>
                        <Button variant="ghost" size="sm">Generate New</Button>
                      </div>
                      <div className="flex gap-2">
                        <Input defaultValue="sk_test_51Hb3JtGx0aFYPjJl8CGq9tGQs" type="password" className="font-mono" />
                        <Button variant="outline">Show</Button>
                        <Button variant="outline">Copy</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 border-2 border-blue-500 cursor-pointer">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-full h-20 bg-white border rounded"></div>
                      <p className="font-medium">Light</p>
                    </div>
                  </Card>
                  <Card className="p-4 cursor-pointer">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-full h-20 bg-gray-800 border rounded"></div>
                      <p className="font-medium">Dark</p>
                    </div>
                  </Card>
                  <Card className="p-4 cursor-pointer">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-full h-20 bg-gradient-to-b from-white to-gray-800 border rounded"></div>
                      <p className="font-medium">System</p>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-6 gap-4">
                  {['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500'].map((color, i) => (
                    <div key={i} className={`w-full h-10 rounded-md ${color} ${i === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}></div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Layout</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 border-2 border-blue-500 cursor-pointer">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-full h-20 bg-white border rounded flex">
                        <div className="w-1/5 bg-gray-200 border-r"></div>
                        <div className="flex-1"></div>
                      </div>
                      <p className="font-medium">Sidebar</p>
                    </div>
                  </Card>
                  <Card className="p-4 cursor-pointer">
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className="w-full h-20 bg-white border rounded flex flex-col">
                        <div className="h-1/4 bg-gray-200 border-b"></div>
                        <div className="flex-1"></div>
                      </div>
                      <p className="font-medium">Topbar</p>
                    </div>
                  </Card>
                </div>
              </div>
              
              <Button>Save Appearance Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timezone">
          <Card>
            <CardHeader>
              <CardTitle>Timezone Settings</CardTitle>
              <CardDescription>Configure timezone preferences for scheduling and analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="Asia/Calcutta">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Calcutta">(GMT+05:30) Asia/Calcutta</SelectItem>
                    <SelectItem value="America/New_York">(GMT-04:00) America/New_York</SelectItem>
                    <SelectItem value="Europe/London">(GMT+01:00) Europe/London</SelectItem>
                    <SelectItem value="Asia/Tokyo">(GMT+09:00) Asia/Tokyo</SelectItem>
                    <SelectItem value="Australia/Sydney">(GMT+10:00) Australia/Sydney</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Time Format</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="format-24h" name="timeFormat" className="h-4 w-4" />
                    <Label htmlFor="format-24h">24-hour format (e.g., 14:30)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="format-12h" name="timeFormat" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="format-12h">12-hour format (e.g., 2:30 PM)</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select defaultValue="MM/DD/YYYY">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (e.g., 04/09/2025)</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (e.g., 09/04/2025)</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (e.g., 2025-04-09)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>First Day of Week</Label>
                <Select defaultValue="sunday">
                  <SelectTrigger>
                    <SelectValue placeholder="Select first day of week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button>Save Timezone Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedPlatform && (
        <ConnectAccountDialog
          isOpen={connectDialogOpen}
          onClose={() => {
            setConnectDialogOpen(false);
            setSelectedPlatform(null);
          }}
          platform={selectedPlatform.id}
          platformLabel={selectedPlatform.label}
        />
      )}
    </div>
  );
};

export default Settings;

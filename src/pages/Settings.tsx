
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserCog, Users, Globe, Key, Clock, Brush, Columns, Shield } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('workspace');
  
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
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-1">Facebook</h3>
                        <p className="text-sm text-muted-foreground mb-4">Connect Page or Profile</p>
                        <Button variant="outline">Connect</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-1">Twitter</h3>
                        <p className="text-sm text-muted-foreground mb-4">Connect Profile</p>
                        <Button variant="outline">Connect</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-1">LinkedIn</h3>
                        <p className="text-sm text-muted-foreground mb-4">Connected</p>
                        <Button variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          Reconnect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 001.384 2.126A5.868 5.868 0 004.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 002.126-1.384 5.86 5.86 0 001.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 00-1.384-2.126A5.847 5.847 0 0019.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 01-.899 1.382 3.744 3.744 0 01-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 01-1.379-.899 3.644 3.644 0 01-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-1">Instagram</h3>
                        <p className="text-sm text-muted-foreground mb-4">Connect Profile</p>
                        <Button variant="outline">Connect</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="font-medium">Telegram Bot Integration</h3>
                      <p className="text-sm text-muted-foreground">Connect your Telegram bot for automated messaging</p>
                    </div>
                    <Button>Configure</Button>
                  </div>
                </div>
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
    </div>
  );
};

export default Settings;

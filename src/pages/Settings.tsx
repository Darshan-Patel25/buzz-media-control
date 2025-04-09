
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const isMobile = useIsMobile();
  
  const handleSaveChanges = (section: string) => {
    toast({
      title: "Settings updated",
      description: `Your ${section} settings have been saved successfully.`,
    });
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          
          <Tabs defaultValue="account" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input id="company" defaultValue="SocialBee Media" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveChanges('profile')}>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveChanges('password')}>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="connections" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Accounts</CardTitle>
                  <CardDescription>Connect your social media accounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SocialIcon platform="twitter" withBackground />
                        <div>
                          <p className="font-medium">Twitter</p>
                          <p className="text-xs text-muted-foreground">@johndoe</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SocialIcon platform="facebook" withBackground />
                        <div>
                          <p className="font-medium">Facebook</p>
                          <p className="text-xs text-muted-foreground">John Doe</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SocialIcon platform="instagram" withBackground />
                        <p className="font-medium">Instagram</p>
                      </div>
                      <Button variant="default" size="sm">Connect</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SocialIcon platform="linkedin" withBackground />
                        <p className="font-medium">LinkedIn</p>
                      </div>
                      <Button variant="default" size="sm">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Post Published</p>
                      <p className="text-sm text-muted-foreground">Get notified when a scheduled post is published</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Engagement Alerts</p>
                      <p className="text-sm text-muted-foreground">Receive alerts for significant engagement on your posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Get weekly performance reports by email</p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Product Updates</p>
                      <p className="text-sm text-muted-foreground">Receive product updates and new feature announcements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveChanges('notifications')}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;

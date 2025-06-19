import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, CreditCard, Store, GraduationCap, UserCog, Users, Send, Contact, Check } from 'lucide-react';
import SocialIcon from '@/components/common/SocialIcon';
import { SocialPlatform } from '@/types';

const socialAccounts = [
  {
    id: '1',
    name: 'Darshan Patel',
    platform: 'linkedin' as SocialPlatform,
    connected: true,
    timezone: '(GMT+05:30) Asia/Calcutta',
    posting: 'Direct posting',
    paused: false
  }
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [firstName, setFirstName] = useState('Darshan');
  const [lastName, setLastName] = useState('Patel');
  const [email, setEmail] = useState('2022002352.gcet@cxmu.edu.in');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('(201) 555-0123');
  
  return (
    <div className="space-y-6 pl-5 pr-3">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and social profiles</p>
        </div>
      </div>
      
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-transparent p-0 mb-2">
          <div className="flex overflow-x-auto pb-2 space-x-4">
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary data-[state=active]:border-primary"
            >
              <User className="w-4 h-4" />
              <span>Edit Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notification" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <Bell className="w-4 h-4" />
              <span>Notification Settings</span>
            </TabsTrigger>
            <TabsTrigger 
              value="billing" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger 
              value="store" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <Store className="w-4 h-4" />
              <span>ConciergeeBee Store</span>
            </TabsTrigger>
            <TabsTrigger 
              value="marketplace" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <Store className="w-4 h-4" />
              <span>Service Marketplace</span>
            </TabsTrigger>
            <TabsTrigger 
              value="university" 
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md data-[state=active]:border-primary"
            >
              <GraduationCap className="w-4 h-4" />
              <span>SocialBee University</span>
            </TabsTrigger>
          </div>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/3">
              <Card className="w-full">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-yellow-600 font-bold">
                      {firstName.charAt(0)}
                    </span>
                  </div>
                  <CardTitle className="mt-3">
                    Darshan Patel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <p className="text-sm text-muted-foreground">Free Plan</p>
                  <Button>Upgrade Plan</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Info</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input 
                          id="first-name" 
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input 
                          id="last-name" 
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly
                      />
                      <div className="rounded-md bg-yellow-50 p-3 text-sm">
                        <p className="font-medium text-yellow-800">Warning!</p>
                        <p className="text-yellow-700">You cannot change your email address or password. In order to do that please go to your WebPros account.</p>
                      </div>
                      <div className="rounded-md bg-green-50 p-3 text-sm">
                        <p className="font-medium text-green-800">Yey!</p>
                        <p className="text-green-700">Your email address is confirmed!</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    
                    <Button>Update</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>You can change your account's settings from here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="py-2">Action</th>
                          <th className="py-2 text-right">Active?</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-4">I want the time to be formatted in an AM/PM style instead of 24-hour style.</td>
                          <td className="text-right">
                            <Switch />
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-4">Two-factor authentication: add an extra layer of security to your SocialBee account.</td>
                          <td className="text-right">
                            <Switch />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your social accounts</CardTitle>
              <CardDescription>Manage, add, or remove your social accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <p>You have connected <span className="font-bold">1 profiles</span>, in all owned workspaces, out of <span className="font-bold">25 total profiles</span> allowed for your</p>
                      <p className="font-bold">Pro plan</p>
                    </div>
                    <div className="w-20 h-20 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm">1/25</span>
                      </div>
                      {/* This would be a circular progress indicator */}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Connect social account
                  </Button>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-sm border-b">
                        <th className="px-4 py-3 text-left">Social Account</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Timezone</th>
                        <th className="px-4 py-3 text-left">Posting Setup</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {socialAccounts.map((account) => (
                        <tr key={account.id} className="border-b">
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <SocialIcon platform={account.platform} size={16} />
                              </div>
                              <div>
                                <p className="font-medium">{account.name}</p>
                                <p className="text-xs text-muted-foreground">{account.platform} Profile</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Connected
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{account.timezone}</td>
                          <td className="px-4 py-3 text-sm">{account.posting}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                Reconnect
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Contact className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2C7.77614 2 8 2.22386 8 2.5V12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5V2.5C7 2.22386 7.22386 2 7.5 2Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M2.5 7C2.22386 7 2 7.22386 2 7.5C2 7.77614 2.22386 8 2.5 8H12.5C12.7761 8 13 7.77614 13 7.5C13 7.22386 12.7761 7 12.5 7H2.5Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </Button>
                              <Switch checked={!account.paused} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notification">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="email-posts">Post scheduling and publishing</Label>
                      <Switch id="email-posts" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="email-comments">Comments and mentions</Label>
                      <Switch id="email-comments" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="email-analytics">Analytics reports</Label>
                      <Switch id="email-analytics" />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="email-news">Product updates and news</Label>
                      <Switch id="email-news" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">In-App Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="app-posts">Post scheduling and publishing</Label>
                      <Switch id="app-posts" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="app-comments">Comments and mentions</Label>
                      <Switch id="app-comments" defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <Label htmlFor="app-analytics">Analytics updates</Label>
                      <Switch id="app-analytics" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Current Plan</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold">Free Plan</p>
                      <p className="text-sm text-muted-foreground">Basic features for individuals</p>
                    </div>
                    <Button>Upgrade</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle>Basic</CardTitle>
                      <p className="text-3xl font-bold">$0<span className="text-sm font-normal">/month</span></p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">1 social profile</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Basic analytics</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Manual posting</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Current Plan</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary">
                    <CardHeader className="text-center">
                      <CardTitle>Pro</CardTitle>
                      <div className="bg-primary px-3 py-1 text-xs text-primary-foreground rounded-full w-fit mx-auto mb-2">
                        Popular
                      </div>
                      <p className="text-3xl font-bold">$29<span className="text-sm font-normal">/month</span></p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">25 social profiles</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Advanced analytics</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Scheduled posting</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Content calendar</span>
                        </li>
                      </ul>
                      <Button className="w-full">Upgrade to Pro</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="text-center">
                      <CardTitle>Business</CardTitle>
                      <p className="text-3xl font-bold">$99<span className="text-sm font-normal">/month</span></p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Unlimited profiles</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Premium analytics</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Team collaboration</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span className="text-sm">Priority support</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Contact Sales</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>ConciergeBee Store</CardTitle>
              <CardDescription>Enhance your experience with premium content and tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Store className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-medium mt-4">Store Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  We're working on bringing you premium content, templates, and tools.
                </p>
                <Button className="mt-4">Get Notified</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle>Service Marketplace</CardTitle>
              <CardDescription>Connect with professional service providers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Store className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-medium mt-4">Marketplace Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  Soon you'll be able to hire experts for your social media needs directly from our platform.
                </p>
                <Button className="mt-4">Join Waitlist</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="university">
          <Card>
            <CardHeader>
              <CardTitle>SocialBee University</CardTitle>
              <CardDescription>Learn social media best practices and strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground" />
                <h3 className="text-xl font-medium mt-4">Learning Portal Coming Soon</h3>
                <p className="text-muted-foreground mt-2">
                  We're preparing comprehensive courses and resources to help you master social media marketing.
                </p>
                <Button className="mt-4">Get Early Access</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;

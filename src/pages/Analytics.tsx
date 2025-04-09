
import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart } from '@/components/ui/charts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample analytics data
const engagementData = [
  { name: 'Mon', twitter: 120, facebook: 150, instagram: 200 },
  { name: 'Tue', twitter: 140, facebook: 160, instagram: 180 },
  { name: 'Wed', twitter: 170, facebook: 140, instagram: 220 },
  { name: 'Thu', twitter: 130, facebook: 180, instagram: 210 },
  { name: 'Fri', twitter: 160, facebook: 190, instagram: 240 },
  { name: 'Sat', twitter: 190, facebook: 200, instagram: 250 },
  { name: 'Sun', twitter: 210, facebook: 210, instagram: 230 },
];

const followerData = [
  { name: 'Jan', twitter: 2500, facebook: 3500, instagram: 4200 },
  { name: 'Feb', twitter: 2700, facebook: 3700, instagram: 4500 },
  { name: 'Mar', twitter: 3000, facebook: 4000, instagram: 4800 },
  { name: 'Apr', twitter: 3200, facebook: 4200, instagram: 5100 },
  { name: 'May', twitter: 3500, facebook: 4400, instagram: 5400 },
  { name: 'Jun', twitter: 3800, facebook: 4700, instagram: 5700 },
];

const Analytics = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Track your social media performance</p>
          </div>
          
          <Tabs defaultValue="engagement" className="mb-6">
            <TabsList>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="followers">Followers</TabsTrigger>
              <TabsTrigger value="reach">Reach</TabsTrigger>
            </TabsList>
            
            <TabsContent value="engagement" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BarChart
                      data={engagementData}
                      index="name"
                      categories={["twitter", "facebook", "instagram"]}
                      colors={["#1DA1F2", "#4267B2", "#C13584"]}
                      valueFormatter={(value) => `${value} interactions`}
                      className="h-full"
                    />
                  </div>
                  <div className="flex justify-center space-x-8 mt-6">
                    <div className="flex items-center space-x-2">
                      <SocialIcon platform="twitter" size={16} />
                      <span className="text-sm">Twitter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SocialIcon platform="facebook" size={16} />
                      <span className="text-sm">Facebook</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SocialIcon platform="instagram" size={16} />
                      <span className="text-sm">Instagram</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="followers" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Follower Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <LineChart
                      data={followerData}
                      index="name"
                      categories={["twitter", "facebook", "instagram"]}
                      colors={["#1DA1F2", "#4267B2", "#C13584"]}
                      valueFormatter={(value) => `${value.toLocaleString()} followers`}
                      className="h-full"
                    />
                  </div>
                  <div className="flex justify-center space-x-8 mt-6">
                    <div className="flex items-center space-x-2">
                      <SocialIcon platform="twitter" size={16} />
                      <span className="text-sm">Twitter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SocialIcon platform="facebook" size={16} />
                      <span className="text-sm">Facebook</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SocialIcon platform="instagram" size={16} />
                      <span className="text-sm">Instagram</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reach" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Reach</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Data coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Best Performing Post</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-md p-3 mb-3">
                  <p className="text-sm">Check out our latest blog post about social media strategies for 2025! #socialmediatips #marketing</p>
                </div>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center">
                    <SocialIcon platform="twitter" size={14} className="mr-1" />
                    <span>578 likes</span>
                  </div>
                  <div>
                    <span>234 shares</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Peak Engagement Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <SocialIcon platform="instagram" size={16} className="mr-2" />
                      <span>Instagram</span>
                    </div>
                    <span className="text-sm">8:00 PM - 10:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <SocialIcon platform="twitter" size={16} className="mr-2" />
                      <span>Twitter</span>
                    </div>
                    <span className="text-sm">12:00 PM - 3:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <SocialIcon platform="facebook" size={16} className="mr-2" />
                      <span>Facebook</span>
                    </div>
                    <span className="text-sm">1:00 PM - 4:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
              </CardHeader>
              <CardContent className="h-[150px] flex items-center justify-center">
                <p className="text-muted-foreground">Data coming soon!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;

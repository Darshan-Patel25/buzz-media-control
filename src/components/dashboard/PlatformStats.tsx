
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SocialIcon from '../common/SocialIcon';
import { SocialPlatform } from '@/types';

// Sample data for the charts
const generateChartData = (platform: string) => {
  const days = 30;
  const data = [];
  let base = Math.floor(Math.random() * 100) + 50;
  
  for (let i = 0; i < days; i++) {
    // Create some variation in the data
    base = base + Math.floor(Math.random() * 20) - 10;
    // Ensure base doesn't go below 20
    base = Math.max(base, 20);
    
    data.push({
      date: `Day ${i + 1}`,
      followers: base,
      engagement: Math.floor(base * 0.1 * (Math.random() + 0.5)),
      reach: Math.floor(base * 3 * (Math.random() + 0.8)),
    });
  }
  
  return data;
};

const socialPlatforms: SocialPlatform[] = ['facebook', 'twitter', 'linkedin', 'instagram', 'tiktok'];

const PlatformStats: React.FC = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Platform Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="facebook">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              {socialPlatforms.map((platform) => (
                <TabsTrigger key={platform} value={platform} className="flex items-center gap-2">
                  <SocialIcon platform={platform} size={16} />
                  <span className="capitalize hidden sm:inline">{platform}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {socialPlatforms.map((platform) => (
            <TabsContent key={platform} value={platform}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                  <h4 className="text-sm text-muted-foreground">Followers</h4>
                  <div className="flex items-baseline mt-2">
                    <span className="text-2xl font-bold">
                      {Math.floor(Math.random() * 10000)}
                    </span>
                    <span className="ml-2 text-xs text-green-500">+2.5%</span>
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm text-muted-foreground">Engagement</h4>
                  <div className="flex items-baseline mt-2">
                    <span className="text-2xl font-bold">
                      {Math.floor(Math.random() * 1000)}
                    </span>
                    <span className="ml-2 text-xs text-green-500">+1.8%</span>
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="text-sm text-muted-foreground">Reach</h4>
                  <div className="flex items-baseline mt-2">
                    <span className="text-2xl font-bold">
                      {Math.floor(Math.random() * 50000)}
                    </span>
                    <span className="ml-2 text-xs text-green-500">+3.2%</span>
                  </div>
                </Card>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={generateChartData(platform)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="followers" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reach" 
                      stroke="#ffc658" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlatformStats;

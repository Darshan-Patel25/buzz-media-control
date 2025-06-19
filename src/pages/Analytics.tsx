
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialPlatform } from '@/types';
import SocialIcon from '@/components/common/SocialIcon';
import MetricCard from '@/components/analytics/MetricCard';
import AnalyticsChart from '@/components/analytics/AnalyticsChart';
import EngagementTable from '@/components/analytics/EngagementTable';
import PostPerformance from '@/components/analytics/PostPerformance';
import { useAnalyticsMetrics, usePosts } from '@/hooks/useSupabaseData';
import {
  ChevronDown,
  Edit,
  Share,
  FileBarChart,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';


// Sample data for the charts
const generateDates = (days = 30) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return dates;
};

const performanceData = [
  { date: '06/03', engagement: 90, reach: 95, followers: 260 },
  { date: '06/04', engagement: 88, reach: 98, followers: 258 },
  { date: '06/05', engagement: 85, reach: 102, followers: 256 },
  { date: '06/06', engagement: 92, reach: 105, followers: 254 },
  { date: '06/07', engagement: 89, reach: 108, followers: 256 },
  { date: '06/08', engagement: 95, reach: 112, followers: 258 },
  { date: '06/09', engagement: 93, reach: 115, followers: 260 },
];

const staticPlatformData = [
  { platform: 'Instagram', engagement: 45, posts: 200 },
  { platform: 'Facebook', engagement: 35, posts: 120 },
  { platform: 'Twitter', engagement: 25, posts: 50 },
  { platform: 'Telegram', engagement: 15, posts: 30 },
];

const dates = generateDates();

const generatePlatformData = (platform: SocialPlatform | 'all') => {
  const baseFactor = {
    'linkedin': 1,
    'facebook': 1.5,
    'twitter': 0.8,
    'instagram': 2,
    'youtube': 1.2,
    'tiktok': 2.5,
    'all': 1.3
  }[platform] || 1;
  
  return {
    publishingTrend: dates.map(date => ({
      date,
      Text: Math.floor(Math.random() * 5 * baseFactor),
      Image: Math.floor(Math.random() * 3 * baseFactor),
      Video: Math.floor(Math.random() * 2 * baseFactor),
      Article: Math.floor(Math.random() * 1 * baseFactor),
      Document: Math.floor(Math.random() * 1 * baseFactor),
      Others: Math.floor(Math.random() * 0.5 * baseFactor),
    })),
    engagementTrend: dates.map(date => ({
      date,
      Reactions: Math.floor(Math.random() * 50 * baseFactor),
      Comments: Math.floor(Math.random() * 20 * baseFactor),
    })),
    metrics: {
      connections: Math.floor(Math.random() * 1000 * baseFactor) + 500,
      posts: Math.floor(Math.random() * 100 * baseFactor) + 10,
      comments: Math.floor(Math.random() * 200 * baseFactor) + 20,
      reactions: Math.floor(Math.random() * 500 * baseFactor) + 50,
      engagement: Math.floor(Math.random() * 800 * baseFactor) + 100,
    },
    demographicData: [
      { name: '18-24', value: Math.floor(Math.random() * 20 * baseFactor) + 5 },
      { name: '25-34', value: Math.floor(Math.random() * 35 * baseFactor) + 15 },
      { name: '35-44', value: Math.floor(Math.random() * 25 * baseFactor) + 10 },
      { name: '45-54', value: Math.floor(Math.random() * 15 * baseFactor) + 5 },
      { name: '55+', value: Math.floor(Math.random() * 10 * baseFactor) + 3 },
    ],
    postHistory: Array(5).fill(0).map((_, i) => ({
      id: `post-${i}`,
      content: `Sample post content #${i + 1} for ${platform}`,
      date: new Date(Date.now() - (i * 86400000)).toLocaleDateString(),
      likes: Math.floor(Math.random() * 100 * baseFactor),
      comments: Math.floor(Math.random() * 20 * baseFactor),
      shares: Math.floor(Math.random() * 15 * baseFactor),
    })),
    postPerformanceByType: [
      { type: 'Text', date: 'Type', engagement: Math.floor(Math.random() * 50) + 10, reach: Math.floor(Math.random() * 500) + 100 },
      { type: 'Image', date: 'Type', engagement: Math.floor(Math.random() * 80) + 30, reach: Math.floor(Math.random() * 800) + 300 },
      { type: 'Video', date: 'Type', engagement: Math.floor(Math.random() * 100) + 50, reach: Math.floor(Math.random() * 1000) + 500 },
      { type: 'Article', date: 'Type', engagement: Math.floor(Math.random() * 60) + 20, reach: Math.floor(Math.random() * 600) + 200 },
      { type: 'Document', date: 'Type', engagement: Math.floor(Math.random() * 40) + 10, reach: Math.floor(Math.random() * 400) + 100 },
    ]
  };
};



const platformOptions: SocialPlatform[] = ['linkedin', 'facebook', 'twitter', 'instagram', 'youtube', 'tiktok'];

const Analytics: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('linkedin');
  const [dateRange, setDateRange] = useState('30');
  const [timeframe, setTimeframe] = useState('30d');
  
  const { data: analyticsData = [], isLoading } = useAnalyticsMetrics(selectedPlatform);
  const { data: posts = [] } = usePosts();
  
  // Get platform data based on real data or fallback to sample
  const dynamicPlatformData = generatePlatformData(selectedPlatform);
  
  const getPlatformDisplayName = (platform: SocialPlatform) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };
  
  const formattedStartDate = `Mar 12, 2025`;
  const formattedEndDate = `Apr 10, 2025`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }
  
  return (
    <>
      <div className="border-b bg-white items-center justify-between px-2 sm:px-4 h-12">
        <h1 className="text-xl sm:text-2xl font-bold pl-2 sm:pl-4">Analytics</h1>
      </div>
      
      <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 pt-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-semibold">{getPlatformDisplayName(selectedPlatform)} Analytics</h1>
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select value={selectedPlatform} onValueChange={(value) => setSelectedPlatform(value as SocialPlatform)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map(platform => (
                  <SelectItem key={platform} value={platform}>
                    <div className="flex items-center gap-2">
                      <SocialIcon platform={platform} size={16} />
                      <span className="capitalize">{platform}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="14">Last 14 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex w-full sm:w-auto">
              <Button variant="outline" className="rounded-r-none flex gap-2 flex-1 sm:flex-none">
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
              <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700 flex gap-2 flex-1 sm:flex-none">
                <Share className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-xs sm:text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 flex items-center justify-center rounded-sm">
              <SocialIcon platform={selectedPlatform} size={16} className="text-white" />
            </div>
            <span className="ml-2 font-medium">Darshan</span>
          </div>
          
          <div className="text-gray-500">
            {formattedStartDate} to {formattedEndDate}
            <span className="text-xs ml-2 block sm:inline">(Timezone: Asia/Kolkata)</span>
          </div>
        </div>
        
        <div className="border-t pt-4 sm:pt-6 mt-4">
          <Tabs defaultValue="page" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6">
              <TabsTrigger value="page" className="flex gap-1 sm:gap-2 text-xs sm:text-sm">
                <FileBarChart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Page Analytics</span>
                <span className="sm:hidden">Page</span>
              </TabsTrigger>
              <TabsTrigger value="post" className="flex gap-1 sm:gap-2 text-xs sm:text-sm">
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Post Analytics</span>
                <span className="sm:hidden">Post</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex gap-1 sm:gap-2 text-xs sm:text-sm">
                <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Insights</span>
                <span className="sm:hidden">Insights</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="page" className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{getPlatformDisplayName(selectedPlatform)} Profile - Darshan</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <MetricCard 
                  title="Connections" 
                  value={dynamicPlatformData.metrics.connections.toString()} 
                />
                <MetricCard 
                  title="Posts" 
                  value={posts.length.toString()} 
                  trend={{ value: "+5", period: "last 30 days" }}
                />
                <MetricCard 
                  title="Comments" 
                  value={dynamicPlatformData.metrics.comments.toString()} 
                  trend={{ value: "+8%", period: "last 30 days" }}
                />
                <MetricCard 
                  title="Reactions" 
                  value={dynamicPlatformData.metrics.reactions.toString()} 
                  trend={{ value: "+12%", period: "last 30 days" }}
                />
                <MetricCard 
                  title="Engagement" 
                  value={dynamicPlatformData.metrics.engagement.toString()} 
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base sm:text-lg">Performance Overview</CardTitle>
                      <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="w-20 sm:w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">7 days</SelectItem>
                          <SelectItem value="30d">30 days</SelectItem>
                          <SelectItem value="90d">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                          <YAxis tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="engagement" stroke="#8884d8" name="Engagement %" activeDot={{ r: 6 }} />
                          <Line type="monotone" dataKey="reach" stroke="#82ca9d" name="Reach (K)" />
                          <Line type="monotone" dataKey="followers" stroke="#ffc658" name="Followers (x100)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg">Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={staticPlatformData} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tick={{ fontSize: 10 }} />
                          <YAxis type="category" dataKey="platform" tick={{ fontSize: 10 }} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="engagement" name="Engagement %" fill="#8884d8" />
                          <Bar dataKey="posts" name="Posts" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="post" className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Post Performance Analysis</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <MetricCard 
                  title="Avg Engagement" 
                  value={(Math.random() * 10).toFixed(2) + "%"} 
                  trend={{ value: "+2.4%", period: "last 30 days" }}
                />
                <MetricCard 
                  title="Top Post Reach" 
                  value={(Math.random() * 10000).toFixed(0)}
                  trend={{ value: "+18%", period: "last 30 days" }}
                />
                <MetricCard 
                  title="Click Rate" 
                  value={(Math.random() * 5).toFixed(2) + "%"}
                  trend={{ value: "-0.5%", period: "last 30 days" }}
                />
                <MetricCard 
                  title="Conversion" 
                  value={(Math.random() * 3).toFixed(2) + "%"}
                  trend={{ value: "+0.8%", period: "last 30 days" }}
                />
              </div>
              
              <AnalyticsChart 
                title="Post Performance by Type" 
                description="Compare engagement across different post types"
                data={dynamicPlatformData.postPerformanceByType}
                type="bar"
                xAxisDataKey="type"
                lines={[
                  { dataKey: 'engagement', color: '#4f46e5', name: 'Engagement' },
                  { dataKey: 'reach', color: '#10b981', name: 'Reach' }
                ]}
              />
              
              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold">Recent Posts</h3>
                <div className="bg-white rounded-lg shadow divide-y">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="space-y-1 flex-1">
                          <p className="text-xs sm:text-sm text-gray-500">
                            {new Date(post.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-sm sm:text-base line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 bg-gray-100 rounded">{post.platform}</span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">{post.status}</span>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 text-xs sm:text-sm">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700">{post.likes_count || 0}</span>
                            <span className="ml-1 text-gray-500">Likes</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700">{post.comments_count || 0}</span>
                            <span className="ml-1 text-gray-500">Comments</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium text-gray-700">{post.shares_count || 0}</span>
                            <span className="ml-1 text-gray-500">Shares</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                      No posts created yet. Start creating content to see analytics.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Account Insights</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <EngagementTable 
                  title="Content Performance" 
                  description="Compare median and total engagement performance across content types"
                />
                
                <div className="space-y-4 sm:space-y-6">
                  <PostPerformance 
                    title="Audience Demographics" 
                    description="Analyze your audience by age and gender"
                  />
                  
                  <Card className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-4">Recommended Actions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded mr-2 flex-shrink-0">
                          <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        </div>
                        <span className="text-xs sm:text-sm">Post more video content to increase engagement rate</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded mr-2 flex-shrink-0">
                          <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        </div>
                        <span className="text-xs sm:text-sm">Engage with comments more frequently to boost interaction</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 p-1 rounded mr-2 flex-shrink-0">
                          <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        </div>
                        <span className="text-xs sm:text-sm">Target content towards 25-34 age group for better reach</span>
                      </li>
                    </ul>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Analytics;

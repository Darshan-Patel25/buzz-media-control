
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PostPerformanceProps {
  title: string;
  description: string;
}

const PostPerformance: React.FC<PostPerformanceProps> = ({ title, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="noData">
          <TabsList className="hidden">
            <TabsTrigger value="noData">No Data</TabsTrigger>
          </TabsList>
          <TabsContent value="noData">
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No Data Available
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PostPerformance;

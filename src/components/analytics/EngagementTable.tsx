
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface EngagementTableProps {
  title: string;
  description: string;
}

const EngagementTable: React.FC<EngagementTableProps> = ({ title, description }) => {
  const contentTypes = ['Text', 'Image', 'Video', 'Article', 'Document', 'Others'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {contentTypes.map((type) => (
            <div key={type} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{type}</span>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-purple-600">
                    <span className="h-3 w-3 rounded-full bg-purple-600"></span>
                    <span className="text-sm">Median Engagement</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                    <span className="text-sm">Total Engagement</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementTable;

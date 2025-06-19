
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number | string;
  trend?: {
    value: string;
    period: string;
  };
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  trend,
  className 
}) => {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">{title}</h3>
        <div className="flex flex-col">
          <span className="text-4xl font-bold mb-2">{value}</span>
          {trend && (
            <div className="flex items-center text-sm text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>{trend.value} in {trend.period}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;

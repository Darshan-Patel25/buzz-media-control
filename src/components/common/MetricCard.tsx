
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  className?: string;
  iconClassName?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  className = "",
  iconClassName = ""
}) => {
  const showChange = typeof change !== 'undefined';
  
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {showChange && (
            <div className={cn(
              "flex items-center mt-2 text-xs font-medium",
              change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-500"
            )}>
              {change > 0 ? (
                <ArrowUp className="w-3 h-3 mr-1" />
              ) : change < 0 ? (
                <ArrowDown className="w-3 h-3 mr-1" />
              ) : null}
              <span>{Math.abs(change)}% {change > 0 ? 'increase' : change < 0 ? 'decrease' : 'no change'}</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn("p-3 rounded-full", iconClassName)}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MetricCard;

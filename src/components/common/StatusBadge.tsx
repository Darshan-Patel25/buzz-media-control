
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle, FilePenLine } from 'lucide-react';

interface StatusBadgeProps {
  status: 'published' | 'scheduled' | 'failed' | 'draft';
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'published':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          icon: <CheckCircle className="w-4 h-4 text-green-700" />,
          label: 'Published'
        };
      case 'scheduled':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          icon: <Clock className="w-4 h-4 text-blue-700" />,
          label: 'Scheduled'
        };
      case 'failed':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          icon: <AlertCircle className="w-4 h-4 text-red-700" />,
          label: 'Failed'
        };
      case 'draft':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          icon: <FilePenLine className="w-4 h-4 text-gray-700" />,
          label: 'Draft'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          icon: null,
          label: 'Unknown'
        };
    }
  };

  const { bgColor, textColor, icon, label } = getStatusConfig();

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        bgColor,
        textColor,
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </span>
  );
};

export default StatusBadge;

import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'critical';
  isLive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  status = 'normal',
  isLive = false
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'critical': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  return (
    <div className={`p-6 rounded-xl border-2 ${getStatusColor()} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-gray-700">{title}</h3>
        <div className="flex items-center gap-2">
          {isLive && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Activity className="w-4 h-4 text-green-500" />
            </div>
          )}
          {getTrendIcon()}
        </div>
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
      {subtitle && (
        <p className="text-sm text-gray-600">{subtitle}</p>
      )}
    </div>
  );
};
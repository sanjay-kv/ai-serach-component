import React from 'react';
import * as LucideIcons from 'lucide-react';
import { MetricConfig } from '../types';

interface DynamicMetricCardProps {
  metric: MetricConfig;
  theme: string;
}

export const DynamicMetricCard: React.FC<DynamicMetricCardProps> = ({ metric, theme }) => {
  const getThemeColors = () => {
    switch (theme) {
      case 'green': return 'border-green-200 bg-green-50 text-green-700';
      case 'purple': return 'border-purple-200 bg-purple-50 text-purple-700';
      case 'orange': return 'border-orange-200 bg-orange-50 text-orange-700';
      case 'red': return 'border-red-200 bg-red-50 text-red-700';
      default: return 'border-blue-200 bg-blue-50 text-blue-700';
    }
  };

  const getStatusColor = () => {
    switch (metric.status) {
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'critical': return 'border-red-200 bg-red-50';
      default: return getThemeColors().split(' ').slice(0, 2).join(' ');
    }
  };

  const getTrendIcon = () => {
    if (metric.trend === 'up') return <LucideIcons.TrendingUp className="w-4 h-4 text-green-500" />;
    if (metric.trend === 'down') return <LucideIcons.TrendingDown className="w-4 h-4 text-red-500" />;
    return <LucideIcons.Minus className="w-4 h-4 text-gray-400" />;
  };

  // Get the icon component dynamically
  const IconComponent = (LucideIcons as any)[metric.icon] || LucideIcons.BarChart3;

  return (
    <div className={`p-6 rounded-xl border-2 ${getStatusColor()} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-700">{metric.title}</h3>
        </div>
        {getTrendIcon()}
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-1">
        {metric.value}
        {metric.unit && <span className="text-lg text-gray-500 ml-1">{metric.unit}</span>}
      </div>
      {metric.subtitle && (
        <p className="text-sm text-gray-600">{metric.subtitle}</p>
      )}
    </div>
  );
};
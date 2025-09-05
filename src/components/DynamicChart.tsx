import React from 'react';
import { ChartConfig } from '../types';

interface DynamicChartProps {
  chart: ChartConfig;
}

export const DynamicChart: React.FC<DynamicChartProps> = ({ chart }) => {
  const maxValue = Math.max(...chart.data.map(d => d.value), 1);
  const minValue = Math.min(...chart.data.map(d => d.value), 0);
  const range = maxValue - minValue || 1;

  const generateLinePath = () => {
    if (chart.data.length === 0) return '';
    
    const width = 800;
    const height = 200;
    const padding = 40;
    
    const points = chart.data.map((point, index) => {
      const x = padding + (index / (chart.data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  const generateBars = () => {
    const width = 800;
    const height = 200;
    const padding = 40;
    const barWidth = (width - padding * 2) / chart.data.length * 0.8;
    
    return chart.data.map((point, index) => {
      const x = padding + (index / chart.data.length) * (width - padding * 2) + barWidth * 0.1;
      const barHeight = ((point.value - minValue) / range) * (height - padding * 2);
      const y = height - padding - barHeight;
      
      return (
        <rect
          key={index}
          x={x}
          y={y}
          width={barWidth}
          height={barHeight}
          fill={chart.color}
          className="hover:opacity-80 transition-opacity"
        >
          <title>{`${point.time}: ${point.value.toFixed(2)}`}</title>
        </rect>
      );
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{chart.title}</h3>
      <div className="w-full overflow-hidden">
        <svg width="100%" height="200" viewBox="0 0 800 200" className="w-full h-auto">
          {/* Grid lines */}
          <defs>
            <pattern id={`grid-${chart.id}`} width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${chart.id})`} />
          
          {/* Chart content */}
          {chart.type === 'line' && (
            <>
              <path
                d={generateLinePath()}
                fill="none"
                stroke={chart.color}
                strokeWidth="3"
                className="transition-all duration-300"
              />
              {chart.data.map((point, index) => {
                const x = 40 + (index / (chart.data.length - 1)) * 720;
                const y = 160 - ((point.value - minValue) / range) * 120;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={chart.color}
                    className="hover:r-6 transition-all duration-200"
                  >
                    <title>{`${point.time}: ${point.value.toFixed(2)}`}</title>
                  </circle>
                );
              })}
            </>
          )}
          
          {chart.type === 'bar' && generateBars()}
          
          {/* Y-axis labels */}
          <text x="20" y="45" fontSize="12" fill="#6B7280" textAnchor="middle">
            {maxValue.toFixed(1)}
          </text>
          <text x="20" y="165" fontSize="12" fill="#6B7280" textAnchor="middle">
            {minValue.toFixed(1)}
          </text>
        </svg>
      </div>
    </div>
  );
};
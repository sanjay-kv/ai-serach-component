export interface DashboardConfig {
  title: string;
  description: string;
  metrics: MetricConfig[];
  charts: ChartConfig[];
  theme: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface MetricConfig {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'critical';
  unit?: string;
}

export interface ChartConfig {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie';
  data: ChartDataPoint[];
  color: string;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  label?: string;
}

export interface AIResponse {
  content: string;
  timestamp: number;
  type: 'analysis' | 'recommendation' | 'alert';
  dashboardConfig?: DashboardConfig;
}
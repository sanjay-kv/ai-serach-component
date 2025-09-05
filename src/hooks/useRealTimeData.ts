import { useState, useEffect } from 'react';
import { ComplianceData, RingelmannReading, ChartDataPoint } from '../types';

export const useRealTimeData = () => {
  const [complianceData, setComplianceData] = useState<ComplianceData>({
    ringelmannNumber: 4.76,
    carbonEmissionRate: 2.38,
    lastUpdate: Date.now(),
    status: 'normal'
  });

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    // Initialize with some historical data
    const initialData: ChartDataPoint[] = [];
    const now = Date.now();
    
    for (let i = 29; i >= 0; i--) {
      const baseValue = 3.5 + Math.sin(i / 5) * 1.2;
      const noise = (Math.random() - 0.5) * 0.8;
      initialData.push({
        time: new Date(now - i * 2000).toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        value: Math.max(0, Math.min(5, baseValue + noise))
      });
    }
    
    setChartData(initialData);

    // Update data every second
    const interval = setInterval(() => {
      const timestamp = Date.now();
      const timeString = new Date(timestamp).toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // Generate realistic Ringelmann reading (0-5 scale)
      const baseValue = 3.8 + Math.sin(timestamp / 10000) * 1.0;
      const noise = (Math.random() - 0.5) * 0.6;
      const newRingelmannValue = Math.max(0, Math.min(5, baseValue + noise));

      // Generate correlated carbon emission rate
      const carbonBase = 2.1 + (newRingelmannValue - 3) * 0.2;
      const carbonNoise = (Math.random() - 0.5) * 0.3;
      const newCarbonRate = Math.max(0.5, carbonBase + carbonNoise);

      // Determine status based on readings
      let status: 'normal' | 'warning' | 'critical' = 'normal';
      if (newRingelmannValue > 4.5 || newCarbonRate > 3) status = 'warning';
      if (newRingelmannValue > 4.8 || newCarbonRate > 3.5) status = 'critical';

      setComplianceData({
        ringelmannNumber: newRingelmannValue,
        carbonEmissionRate: newCarbonRate,
        lastUpdate: timestamp,
        status
      });

      setChartData(prevData => {
        const newData = [...prevData.slice(-29), {
          time: timeString,
          value: newRingelmannValue
        }];
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { complianceData, chartData };
};
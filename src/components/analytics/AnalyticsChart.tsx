
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, BarChart, Bar } from 'recharts';

interface ChartDataPoint {
  [key: string]: string | number;
}

interface AnalyticsChartProps {
  title: string;
  description: string;
  data: ChartDataPoint[];
  type?: 'line' | 'bar';
  yAxisLabel?: string;
  xAxisDataKey?: string;
  lines?: {
    dataKey: string;
    color: string;
    name?: string;
  }[];
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ 
  title, 
  description, 
  data, 
  type = 'line',
  yAxisLabel,
  xAxisDataKey = 'date',
  lines = [{ dataKey: 'value', color: '#2563eb' }]
}) => {
  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey={xAxisDataKey} 
          tick={{ fontSize: 12 }} 
          axisLine={{ stroke: '#e5e7eb' }} 
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          axisLine={{ stroke: '#e5e7eb' }} 
          tickLine={false}
          domain={[0, 5]}
          tickCount={6}
          label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
        />
        <Tooltip />
        {lines.length > 1 && <Legend />}
        {lines.map((line, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 4, fill: line.color }}
            activeDot={{ r: 6 }}
            name={line.name || line.dataKey}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis 
          dataKey={xAxisDataKey} 
          tick={{ fontSize: 12 }} 
          axisLine={{ stroke: '#e5e7eb' }} 
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }} 
          axisLine={{ stroke: '#e5e7eb' }} 
          tickLine={false}
          domain={[0, 5]}
          tickCount={6}
        />
        <Tooltip />
        {lines.length > 1 && <Legend />}
        {lines.map((line, index) => (
          <Bar
            key={index}
            dataKey={line.dataKey}
            fill={line.color}
            name={line.name || line.dataKey}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {type === 'line' ? renderLineChart() : renderBarChart()}
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;


import * as React from "react"
import {
  Area,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartConfig, ChartTooltipContent } from "./chart"

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#4ade80", "#f59e0b", "#ef4444"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: BarChartProps) {
  const config: ChartConfig = {}
  
  categories.forEach((category, i) => {
    config[category] = {
      label: category,
      color: colors[i % colors.length],
    }
  })

  return (
    <ChartContainer config={config} className={className}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip
          content={(props) => (
            <ChartTooltipContent
              {...props}
              formatter={valueFormatter}
            />
          )}
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  )
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb", "#4ade80", "#f59e0b", "#ef4444"],
  valueFormatter = (value: number) => `${value}`,
  className,
}: BarChartProps) {
  const config: ChartConfig = {}
  
  categories.forEach((category, i) => {
    config[category] = {
      label: category,
      color: colors[i % colors.length],
    }
  })

  return (
    <ChartContainer config={config} className={className}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip
          content={(props) => (
            <ChartTooltipContent
              {...props}
              formatter={valueFormatter}
            />
          )}
        />
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ChartContainer>
  )
}

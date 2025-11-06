"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

interface WeightTrendChartProps {
  data: Array<{ date: string } & Record<string, number>>;
}

export default function WeightTrendChart({ data }: WeightTrendChartProps) {
  const goatKeys = data.length > 0 ? Object.keys(data[0]).filter((key) => key !== "date") : [];

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#475569" />
          <YAxis stroke="#475569" unit="kg" />
          <Tooltip formatter={(value: number) => `${value} kg`} />
          <Legend />
          {goatKeys.map((key, index) => (
            <Line
              type="monotone"
              key={key}
              dataKey={key}
              stroke={palette[index % palette.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const palette = [
  "#0ea5e9",
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6"
];

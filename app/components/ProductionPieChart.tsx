"use client";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface ProductionPieChartProps {
  data: Record<string, number>;
}

export default function ProductionPieChart({ data }: ProductionPieChartProps) {
  const formatted = Object.entries(data).map(([key, value]) => ({
    name: key,
    value
  }));

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formatted}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
          >
            {formatted.map((entry, index) => (
              <Cell key={entry.name} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const palette = ["#0ea5e9", "#22c55e", "#6366f1", "#f97316", "#ec4899", "#14b8a6"];

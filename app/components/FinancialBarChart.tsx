"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface FinancialBarChartProps {
  expenses: Record<string, number>;
  income: Record<string, number>;
}

export default function FinancialBarChart({
  expenses,
  income
}: FinancialBarChartProps) {
  const categories = Array.from(
    new Set([...Object.keys(expenses), ...Object.keys(income)])
  );

  const data = categories.map((category) => ({
    category,
    expense: expenses[category] ?? 0,
    income: income[category] ?? 0
  }));

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="category" stroke="#475569" />
          <YAxis stroke="#475569" />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

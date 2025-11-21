import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ResultChartProps {
  score: number;
  total: number;
}

export const ResultChart: React.FC<ResultChartProps> = ({ score, total }) => {
  const data = [
    { name: "Correct", value: score },
    { name: "Incorrect", value: total - score },
  ];

  const COLORS = ["var(--color-success)", "var(--color-danger)"];

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="var(--color-accent)"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [value, name]}
            contentStyle={{
              background: "var(--color-accent)",
              border: "none",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "var(--color-foreground)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

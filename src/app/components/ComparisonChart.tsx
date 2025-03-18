"use client";
import * as React from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ComparisonData = {
  category: string;
  budget: number;
  actual: number;
};

export default function ComparisonChart() {
  const [data, setData] = React.useState<ComparisonData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  // Get the current month in words and the year
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  React.useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const { data } = await axios.get("/api/budgets");
        setData(data);
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch budget vs actual data.");
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, []);

  if (loading) {
    return <p>Loading chart...</p>;
  }

  return (
    <div className="p-4 shadow rounded">
      <h2 className="text-2xl font-bold mb-[50px] text-center">
        Budget vs Actual Comparison chart for {monthName} {year}
      </h2>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="category" stroke="#d4d2fc" />
          <YAxis />
          <Tooltip
            cursor={{ fill: "transparent" }}
          />
          <Legend />
          <Bar
            dataKey="budget"
            fill="#60a8fb"
            name="Budget"
            radius={[9, 9, 0, 0]}
          />
          <Bar
            dataKey="actual"
            fill="#2563eb"
            name="Actual"
            radius={[9, 9, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

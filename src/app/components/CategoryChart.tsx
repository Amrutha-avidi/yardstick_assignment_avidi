"use client";
import * as React from "react";
import axios from "axios";
import { toast } from "sonner";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "#1E3A8A", // Dark Blue 800
  "#1D4ED8", // Blue 700
  "#2563EB", // Blue 600
  "#3B82F6", // Blue 500
  "#60A5FA", // Blue 400
  "#93C5FD", // Blue 300
  "#BFDBFE"  // Blue 200
];

type ChartData = {
  category: string;
  totalAmount: number;
};
export default function CategoryChart() {
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get("/api/category-breakdown");
        setChartData(data || []);
      } catch (error) {
        console.log(error)

        toast.error("Failed to fetch category breakdown.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <h2 className="text-2xl font-bold">Category Breakdown</h2>
      <p className="text-md text-muted-foreground">Visual representation of expenses by category</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie data={chartData} dataKey="totalAmount" nameKey="category" outerRadius={140} strokeWidth={1}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={40} iconType="circle" align="center"/>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
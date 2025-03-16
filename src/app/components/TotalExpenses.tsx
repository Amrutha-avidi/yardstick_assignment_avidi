"use client";
import * as React from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MonthlyExpense = {
  month: string;
  amount: number;
};

export default function TotalExpenses() {
  const [monthlyExpenses, setMonthlyExpenses] = React.useState<MonthlyExpense[]>([]);
  const [totalExpenses, setTotalExpenses] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data: totalData } = await axios.get("/api/total-expenses");
        const { data: monthlyData } = await axios.get("/api/monthly-total");
        const formattedData = Object.entries(monthlyData).map(
          ([month, amount]) => ({ month, amount: Number(amount) })
        );
        setTotalExpenses(totalData.totalExpenses || 0);
        setMonthlyExpenses(formattedData || []);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch expenses.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          {totalExpenses !== null ? (
            `₹${totalExpenses}`
          ) : (
            <p className="text-sm font-normal">Loading...</p>
          )}
        </p>
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <div className="mt-5 p-0 pl-0">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={monthlyExpenses}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Line
                  dataKey="amount"
                  stroke="#3B82F6"
                  dot={{ r: 5, fill: "#3B82F6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

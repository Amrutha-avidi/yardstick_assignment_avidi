"use client";

import * as React from "react";
import axios from "axios";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { toast } from "sonner";

type MonthlyTotal = {
  month: string;
  total: number;
};

function MonthlyChart() {
  const [monthlyTotal, setMonthlyTotal] = React.useState<MonthlyTotal[]>([]);

  const fetchMonthlyTotals = async () => {
    try {
      const { data } = await axios.get("/api/monthly-total");
      const formattedData = Object.entries(data).map(([month, total]) => ({
        month,
        total: Number(total),
      }));
      setMonthlyTotal(formattedData);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      toast.error("Failed to fetch transactions.");
    }
  };

  React.useEffect(() => {
    fetchMonthlyTotals();
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">View Monthly Expenses</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Your Monthly Expenses</DrawerTitle>
            <DrawerDescription>
              A visual breakdown of your monthly expenses, helping you track
              spending patterns and manage your budget effectively.
            </DrawerDescription>
          </DrawerHeader>

          <div className="mt-3 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTotal}>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="total" fill="gray" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MonthlyChart;

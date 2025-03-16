"use client";
import * as React from "react";

import TotalExpenses from "../components/TotalExpenses";
import CategoryBreakdown from "../components/CategoryBreakdown";
import RecentTransactions from "../components/RecentTransactions";
import CategoryChart from "../components/CategoryChart";

const COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FF5722",
  "#9C27B0",
  "#FFC107",
  "#03A9F4",
  "#E91E63",
];

type Transaction = {
  _id: string;
  description: string;
  amount: number;
};

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {/* Total Expenses Card */}
        <TotalExpenses />

        {/* Category Breakdown Card */}
        <CategoryBreakdown />

        {/* Recent Transactions Card */}
        <RecentTransactions />
      </div>
      <div className="flex justify-center items-center">
      <CategoryChart />
      </div>
    </div>
  );
}

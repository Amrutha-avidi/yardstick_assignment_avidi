"use client";
import * as React from "react";

import TotalExpenses from "../components/TotalExpenses";
import CategoryBreakdown from "../components/CategoryBreakdown";
import RecentTransactions from "../components/RecentTransactions";
import CategoryChart from "../components/CategoryChart";




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

"use client";

import BudgetTips from "../components/BudgetTips";
import BudgetForm from "../components/BudgetForm";
import ComparisonChart from "../components/ComparisonChart";
import SpendingInsights from "../components/SpendingInsights";

export default function Budgets() {
  return (
    <div className="p-6">
      {/* Top Section: Budget Planning Tips & Budget Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BudgetTips />
        <BudgetForm />
      </div>
      <hr className="mt-10 w-full" />

      {/* Bottom Section: Comparison Chart and Insights */}
      <div className="mt-10 grid grid-cols-1 gap-8">
        <ComparisonChart />
        <SpendingInsights />
      </div>
    </div>
  );
}

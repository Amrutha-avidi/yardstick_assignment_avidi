import React from "react";

export default function BudgetTips() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[35px] font-bold">Plan Your Budget Wisely</h2>
      <p className="text-lg text-muted-foreground">
        Creating a budget helps you manage your expenses effectively and achieve
        your financial goals. Here are some tips for smart budgeting:
      </p>
      <ul className="list-disc pl-5 text-[17px] space-y-2">
        <li>
          <strong>Set Clear Goals:</strong> Identify essential expenses like
          rent, groceries, and bills.
        </li>
        <li>
          <strong>Track Your Spending:</strong> Monitor your expenses regularly
          to stay on track.
        </li>
        <li>
          <strong>Prioritize Needs Over Wants:</strong> Focus on necessities
          before spending on luxuries.
        </li>
        <li>
          <strong>Review and Adjust:</strong> Periodically review your budget to
          ensure it aligns with your financial goals.
        </li>
      </ul>
    </div>
  );
}

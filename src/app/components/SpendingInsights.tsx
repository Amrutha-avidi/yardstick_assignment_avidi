"use client";

import * as React from "react";
import axios from "axios";
import { toast } from "sonner";

export default function SpendingInsights() {
  const [insights, setInsights] = React.useState<any[]>([]); 
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchInsights = async () => {
      try {
        const { data } = await axios.get("/api/budgets");
        const enrichedInsights = data.map((item: any) => {
          if (item.actual === 0) {
            return { ...item, message: `💙 Start spending on ${item.category}` };
          } else if (item.actual === item.budget) {
            return { ...item, message: `🟡 You are right on track with ${item.category}` };
          } else {
            const difference = item.budget - item.actual;
            return {
              ...item,
              status: difference > 0 ? "Under Budget" : "Over Budget",
              difference: Math.abs(difference),
              message:
                difference > 0
                  ? `🟢 Under Budget: ₹${difference} saved`
                  : `🔴 Over Budget: ₹${difference} over budget`
            };
          }
        });
        setInsights(enrichedInsights);
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch spending insights.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return <p>Loading insights...</p>;
  }

  return (
    <div className="p-6 shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-4">💰 Spending Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {insights.map((category) => (
          <div
            key={category.category}
            className="flex items-center gap-4 p-3 border rounded-md shadow-sm "
          >
            <div className="flex-1">
              <p className="font-medium text-lg">{category.category}</p>
            </div>
            <p
              className={
                category.status === "Over Budget"
                  ? "text-red-500 font-medium"
                  : category.actual === 0
                  ? "text-blue-500 font-medium"
                  : category.actual === category.budget
                  ? "text-yellow-500 font-medium"
                  : "text-green-500 font-medium"
              }
            >
              {category.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

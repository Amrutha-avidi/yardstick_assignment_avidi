"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

type Transaction = {
  _id: string;
  description: string;
  amount: number;
};

export default function RecentTransactions() {
  const [recentTransactions, setRecentTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const { data } = await axios.get("/api/recent-transactions");
        setRecentTransactions(data || []);
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch recent transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecentTransactions();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          "Loading..."
        ) : (
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex justify-between border-b py-2"
              >
                <span>{transaction.description}</span>
                <span className="font-bold">₹{transaction.amount}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
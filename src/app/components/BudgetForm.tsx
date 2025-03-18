import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

const CATEGORIES = [
  "Rent",
  "Groceries",
  "Transport",
  "Utilities",
  "Food",
  "HealthCare",
  "Investments",
];

export default function BudgetForm() {
  const [category, setCategory] = React.useState<string>("");
  const [amount, setAmount] = React.useState("");
  const [month, setMonth] = React.useState(new Date().toISOString().slice(0, 7)); // Preselects current month

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !month) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    try {
      await axios.post("/api/budgets", { category, amount, month });
      toast.success("Budget set successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to set budget.");
    }
  };
  return (
    <Card>
        <CardHeader>
          <CardTitle>Set Your Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md p-2 w-full bg-input/30 text-foreground"
            >
              <option value="" disabled>
                Select Category
              </option>
              {CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="p-2 bg-gray-700 text-white hover:bg-gray-600"
                >
                  {category}
                </option>
              ))}
            </select>

            <Input
              type="number"
              placeholder="Budget Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              min={new Date().toISOString().slice(0, 7)} // Prevents past months
            />


            <Button type="submit" className="w-full">
              Set Budget
            </Button>
          </form>
        </CardContent>
      </Card>
  )
}

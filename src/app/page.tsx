"use client";

import * as React from "react";
import axios from "axios";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import TransactionsTable from "../app/components/TransactionsTable";
import MonthlyChart from "./components/MonthlyChart";

const CATEGORIES = [
  "Rent",
  "Groceries",
  "Transport",
  "Utilities",
  "Entertainment",
  "HealthCare",
  "Others",
];

const TransactionForm = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("Rent");
  const [transactions, setTransactions] = React.useState<any[]>([]);
  const [editId, setEditId] = React.useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get("/api/transactions");
      setTransactions(data.reverse());
    } catch (error) {
      toast.error("Failed to fetch transactions.");
    }
  };

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount) {
      toast.error("Amount is required.");
      return;
    }
    if (!description) {
      toast.error("Description is required.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      const transactionData = { amount, description, date, category };

      if (editId) {
        await axios.put("/api/transactions", {
          id: editId,
          ...transactionData,
        });
        toast.success("Transaction updated successfully!");
      } else {
        await axios.post("/api/transactions", transactionData);
        toast.success("Transaction added successfully!");
      }
      fetchTransactions();
      setAmount("");
      setDescription("");
      setCategory("Rent");
      setDate(new Date());
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "Failed to add transaction.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/transactions", { data: { id } });
      toast.success("Transaction deleted successfully!");
      fetchTransactions();
    } catch (error) {
      toast.error("Failed to delete transaction.");
    }
  };
  const handleEdit = (transaction: any) => {
    setAmount(transaction.amount);
    setDescription(transaction.description);
    setCategory(transaction.category);
    setDate(new Date(transaction.date));
    setEditId(transaction._id);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {/* Transaction Form */}
        <div className="space-y-4">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col justify-center "
          >
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => setDate(newDate || new Date())}
              className="rounded-md border shadow"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md p-2 w-full bg-input/30 text-foreground"
            >
              {CATEGORIES.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="p-2 bg-gray-700 text-white hover:bg-gray-600"
                >
                  {cat}
                </option>
              ))}
            </select>

            <Button type="submit">Add Transaction</Button>
          </form>
        </div>

        {/* Transactions List */}
        <TransactionsTable
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <MonthlyChart />
    </div>
  );
};

export default TransactionForm;

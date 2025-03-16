"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

interface CategoryData {
  category: string;
  totalAmount: number;
}

export default function CategoryBreakdownCard() {
  const [categoryData, setCategoryData] = React.useState<CategoryData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data } = await axios.get("/api/category-breakdown");
        setCategoryData(data || []);
      } catch (error) {
        toast.error("Failed to fetch category breakdown.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);
  //   console.log(categoryData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : categoryData.length === 0 ? (
          <p>No category data available.</p>
        ) : (
          <div className="space-y-2">
            {categoryData.map((entry) => (
              <div
                key={entry.category}
                className="flex justify-between border-b py-2"
              >
                <span>{entry.category}</span>
                <span className="font-bold">₹{entry.totalAmount}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { NextResponse } from "next/server";
import { connectDB, Budget } from "../../lib/budgetSchema";
import {Transaction} from "../../lib/transactionSchema"; 


// Create or Update Budget
export async function POST(req: Request) {
    try {
        await connectDB();
        const { category, amount, month } = await req.json();

        if (!category || !amount || !month) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const existingBudget = await Budget.findOne({ category, month });

        if (existingBudget) {
            existingBudget.amount = amount;
            await existingBudget.save();
        } else {
            await Budget.create({ category, amount, month });
        }

        return NextResponse.json({ message: "Budget saved successfully!" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to save budget." }, { status: 500 });
    }
}

// Fetch All Budgets differentiated by month,

export async function GET() {
  await connectDB();

  // Determine the current month range
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  // Format month as "YYYY-MM" to match your budget documents (e.g., "2025-03")
  const monthString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  try {
    // Fetch all budgets for the current month
    const budgets = await Budget.find({ month: monthString });
    // Create a map of category to budget amount (summing if multiple budgets exist for same category)
    const budgetMap: { [category: string]: number } = {};
    budgets.forEach((budget) => {
      if (budget.category && typeof budget.amount === "number") {
        budgetMap[budget.category] = (budgetMap[budget.category] || 0) + budget.amount;
      }
    });

    // Fetch all transactions for the current month
    const transactions = await Transaction.find({
      date: { $gte: startDate, $lt: endDate },
    });
    // Create a map of category to total actual spending
    const actualMap: { [category: string]: number } = {};
    transactions.forEach((tx) => {
      const cat = tx.category;
      const amt = Number(tx.amount) || 0;
      actualMap[cat] = (actualMap[cat] || 0) + amt;
    });

    // Build the response data by combining categories from both maps
    const categories = Array.from(new Set([...Object.keys(budgetMap), ...Object.keys(actualMap)]));
    const responseData = categories.map((cat) => ({
      category: cat,
      budget: budgetMap[cat] || 0,
      actual: actualMap[cat] || 0,
    }));

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching budget vs actual:", error);
    return NextResponse.json(
      { error: "Failed to fetch comparison data." },
      { status: 500 }
    );
  }
}

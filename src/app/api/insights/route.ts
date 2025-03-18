import { NextResponse } from "next/server";
import { connectDB, Budget } from "../../lib/budgetSchema";
import {Transaction} from "../../lib/transactionSchema"; 

export async function GET(req: Request) {
    await connectDB();

    const now = new Date();
    const currentMonth = `${now.toLocaleString('default', { month: 'short' })}-${now.getFullYear()}`;
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    try {
        const budgets = await Budget.find({ month: currentMonth });

        const transactions = await Transaction.find({
            date: { $gte: startOfMonth, $lt: endOfMonth }
        });

        // Group insights by category
        const categoryInsights = budgets.map((budget) => {
            const categoryTransactions = transactions.filter(
                (txn) => txn.category === budget.category
            );

            const totalSpent = categoryTransactions.reduce((sum, txn) => sum + txn.amount, 0);

            return {
                name: budget.category,
                budget: budget.amount,
                spent: totalSpent
            };
        });

        const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
        const totalSpent = transactions.reduce((sum, txn) => sum + txn.amount, 0);

        const insights = {
            totalBudget,
            totalSpent,
            categories: categoryInsights
        };

        return NextResponse.json(insights, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch insights." }, { status: 500 });
    }
}

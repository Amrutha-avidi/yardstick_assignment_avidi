import { NextResponse } from "next/server";
import { connectDB, Transaction } from "../../lib/db";
import moment from "moment"; 

// GET - Retrieve monthly total expenses
export async function GET() {
    await connectDB();

    const transactions = await Transaction.find({});

    const monthlyExpenses = transactions.reduce((acc, transaction) => {
        const monthYear = moment(transaction.date).format("MMM-YYYY"); // Format like Feb-2025, Mar-2025
        const amount = Number(transaction.amount) || 0;

        acc[monthYear] = (acc[monthYear] || 0) + amount;
        return acc;
    }, {});

    // Corrected sorting logic with empty object initialization
    const sortedExpenses = Object.fromEntries(
        Object.entries(monthlyExpenses).sort(([a], [b]) =>
            moment(a, "MMM-YYYY").valueOf() - moment(b, "MMM-YYYY").valueOf()
        )
    );

    return NextResponse.json(sortedExpenses, { status: 200 });
}

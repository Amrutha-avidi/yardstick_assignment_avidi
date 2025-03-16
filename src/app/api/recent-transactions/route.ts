import { NextResponse } from "next/server";
import { connectDB, Transaction } from "../../lib/db";

// GET - Retrieve recent transactions
export async function GET() {
    await connectDB();

    try {
        const recentTransactions = await Transaction.find({})
            .sort({ date: -1 }) // Sort by date (latest first)
            .limit(5);          // Limit to 5 transactions

        return NextResponse.json(recentTransactions, { status: 200 });
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "Failed to fetch recent transactions." }, { status: 500 });
    }
}

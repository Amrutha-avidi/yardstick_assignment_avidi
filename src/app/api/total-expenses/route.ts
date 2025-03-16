import { NextResponse } from "next/server";
import { connectDB, Transaction } from "../../lib/db";

// GET - Retrieve total expenses
export async function GET() {
    await connectDB();

    try {
        const totalExpenses = await Transaction.aggregate([
            {
                $group: {
                    _id: null, // No grouping criteria, calculates total for all records
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        return NextResponse.json({ totalExpenses: totalExpenses[0]?.totalAmount || 0 }, { status: 200 });
    } catch (error) {
        console.log(error)

        return NextResponse.json({ error: "Failed to fetch total expenses." }, { status: 500 });
    }
}

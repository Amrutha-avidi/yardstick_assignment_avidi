import { NextResponse } from "next/server";
import { connectDB, Transaction } from "../../lib/db";

// GET - Retrieve category-wise expense breakdown
export async function GET() {
    await connectDB();

    try {
        const categoryBreakdown = await Transaction.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        const formattedBreakdown = categoryBreakdown.map(entry => ({
            category: entry._id,
            totalAmount: entry.totalAmount
        }));

        return NextResponse.json(formattedBreakdown, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to fetch category breakdown." }, { status: 500 });
    }
}

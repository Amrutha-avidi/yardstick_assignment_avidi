import { NextResponse } from "next/server";
import { connectDB, Transaction } from "../../lib/db";

// POST - Create a new transaction
export async function POST(req: Request) {
    await connectDB();
    const { amount, description, date, category } = await req.json();

    if (!amount || !description || !date || !category) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const newTransaction = await Transaction.create({ amount, description, date, category });
    return NextResponse.json(newTransaction, { status: 201 });
}

// GET - Retrieve all transactions
export async function GET() {
    await connectDB();
    const transactions = await Transaction.find({});
    return NextResponse.json(transactions, { status: 200 });
}

// PUT - Update a transaction by ID
export async function PUT(req: Request) {
    await connectDB();
    const { id, amount, description, date, category } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "Transaction ID is required." }, { status: 400 });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { amount, description, date, category },
        { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
        return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction, { status: 200 });
}

// DELETE - Remove a transaction by ID
export async function DELETE(req: Request) {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "Transaction ID is required." }, { status: 400 });
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
        return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted successfully." }, { status: 200 });
}


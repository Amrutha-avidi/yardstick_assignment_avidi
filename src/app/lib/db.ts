import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
};

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true }  // Added category field
});

export const Transaction = mongoose.models.Transaction || 
    mongoose.model("Transaction", transactionSchema);

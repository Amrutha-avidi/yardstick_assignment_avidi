import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
}

const budgetSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true }, // Format: 'YYYY-MM'
});




export const Budget =  mongoose.models.Budget ||
mongoose.model("Budget", budgetSchema);

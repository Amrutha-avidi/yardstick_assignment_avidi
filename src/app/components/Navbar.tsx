"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="bg-secondary w-full text-white p-6 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">My Finance Tracker</h1>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-lg">
                <Link href="/" className="hover:underline">Transactions</Link>
                <Link href="/categories" className="hover:underline">Categories</Link>
                <Link href="/budgets" className="hover:underline">Budgeting</Link>
            </nav>
        </header>
    );
}

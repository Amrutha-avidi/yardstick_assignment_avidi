"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="bg-secondary w-full text-white p-6 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">My Finance Tracker</h1>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-lg">
                <Link 
                    href="/" 
                    className={`hover:underline px-3 py-1 rounded ${pathname === "/" ? "bg-white text-secondary" : ""}`}
                >
                    Transactions
                </Link>
                <Link 
                    href="/categories" 
                    className={`hover:underline px-3 py-1 rounded ${pathname === "/categories" ? "bg-white text-secondary" : ""}`}
                >
                    Categories
                </Link>
                <Link 
                    href="/budgets" 
                    className={`hover:underline px-3 py-1 rounded ${pathname === "/budgets" ? "bg-white text-secondary" : ""}`}
                >
                    Budgeting
                </Link>
            </nav>
        </header>
    );
}

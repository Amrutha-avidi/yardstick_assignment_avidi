"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-secondary w-full text-white p-8 text-center">
      <h1
        className="text-3xl md:text-5xl font-serif font-bold mb-3 md:mb-4 
    bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text 
    tracking-wide drop-shadow-lg"
      >
        My Finance Tracker
      </h1>

      <nav className="flex flex-wrap justify-center gap-3 md:gap-6 text-base md:text-lg mt-8">
        <Link
          href="/"
          className={`px-2 py-1 rounded-md transition-colors ${
            pathname === "/"
              ? "bg-white text-secondary font-semibold"
              : "hover:bg-white hover:text-secondary"
          }`}
        >
          Transactions
        </Link>
        <Link
          href="/categories"
          className={`px-2 py-1 rounded-md transition-colors ${
            pathname === "/categories"
              ? "bg-white text-secondary font-semibold"
              : "hover:bg-white hover:text-secondary"
          }`}
        >
          Categories
        </Link>
        <Link
          href="/budgets"
          className={`px-2 py-1 rounded-md transition-colors ${
            pathname === "/budgets"
              ? "bg-white text-secondary font-semibold"
              : "hover:bg-white hover:text-secondary"
          }`}
        >
          Budgeting
        </Link>
      </nav>
    </header>
  );
}

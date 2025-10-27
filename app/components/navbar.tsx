"use client";
import Link from "next/link";
import { useAdmin } from "@/lib/useadmin";

export default function Navbar() {
  const { isAdmin, logout } = useAdmin();

  return (
    <nav className="flex justify-center gap-6 p-6 bg-gray-900 text-white rounded-b-2xl shadow-md">
      <Link href="/" className="hover:text-blue-400 transition">Home</Link>
      <Link href="/work" className="hover:text-blue-400 transition">Arbeit</Link>
      <Link href="/education-page" className="hover:text-blue-400 transition">Bildung</Link>
      <Link href="/interest-page" className="hover:text-blue-400 transition">Interessen</Link>
      <Link href="/feedback" className="hover:text-blue-400 transition">Feedback</Link>

      {isAdmin ? (
        <button onClick={logout} className="hover:text-red-400 transition">
          Logout
        </button>
      ) : (
        <Link href="/login" className="hover:text-blue-400 transition">
          Admin-Login
        </Link>
      )}
    </nav>
  );
}

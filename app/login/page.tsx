"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/useadmin";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const ok = login(password);
    if (ok) router.push("/");
    else setError("❌ Falsches Passwort!");
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold mb-4">🔐 Admin Login</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md space-y-4 w-80"
      >
        <input
          type="password"
          placeholder="Admin-Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Login
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

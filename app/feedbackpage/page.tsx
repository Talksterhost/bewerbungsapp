"use client";

import { useState } from "react";

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.message) {
      setError("Bitte fülle alle Felder aus.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Fehler beim Senden des Feedbacks");

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent)
    return (
      <p className="text-green-600 mt-10 font-medium text-center">
        ✅ Danke für dein Feedback! 💬
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-2xl shadow"
    >
      <h2 className="text-2xl font-bold mb-2">Feedback</h2>
      <p className="text-sm text-gray-600 mb-4">
        Deine Meinung hilft mir, diese Seite zu verbessern.
      </p>

      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        className="border p-2 rounded w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="E-Mail"
        className="border p-2 rounded w-full"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <textarea
        placeholder="Nachricht"
        className="border p-2 rounded w-full"
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white px-4 py-2 rounded w-full transition`}
      >
        {loading ? "Wird gesendet..." : "Absenden"}
      </button>
    </form>
  );
}

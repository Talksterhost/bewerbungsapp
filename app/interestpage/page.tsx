"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "@/lib/useadmin";
import AdminPanel from "../components/adminpanel";

type Interest = {
  id: number;
  name: string;
  description?: string;
};

export default function InterestPage() {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAdmin();

  async function loadInterests() {
    try {
      const res = await fetch("/api/interest");
      if (!res.ok) throw new Error("Fehler beim Laden der Interessen");
      const data = await res.json();
      setInterests(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInterests();
  }, []);

  async function addInterest(form: Record<string, string>) {
    await fetch("/api/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    loadInterests();
  }

  if (loading)
    return <p className="text-gray-500 animate-pulse mt-10">⏳ Interessen werden geladen...</p>;
  if (error)
    return <p className="text-red-600 mt-10">❌ Fehler: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">✨ Meine Interessen</h2>

      {isAdmin && (
        <AdminPanel
          onAdd={addInterest}
          fields={[
            { name: "name", placeholder: "Interesse" },
            { name: "description", placeholder: "Beschreibung (optional)" },
          ]}
        />
      )}

      {interests.length === 0 ? (
        <p className="text-gray-600 mt-10 text-center">
          Keine Interessen vorhanden.
        </p>
      ) : (
        <ul className="space-y-4">
          {interests.map((interest) => (
            <li key={interest.id} className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-blue-700">{interest.name}</h3>
              {interest.description && <p className="text-gray-700 mt-2">{interest.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

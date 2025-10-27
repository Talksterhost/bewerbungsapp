"use client";

import { useEffect, useState } from "react";
import Card from "../components/card";
import AdminPanel from "../components/adminpanel";
import { useAdmin } from "@/lib/useadmin";

interface Work {
  id: number;
  title: string;
  company: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export default function WorkPage() {
  const [data, setData] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAdmin(); // ✅ Admin-Check

  // 🔹 Daten vom API-Endpunkt laden
  async function loadData() {
    try {
      setLoading(true);
      const res = await fetch("/api/work");
      if (!res.ok) throw new Error("Fehler beim Laden der Arbeitserfahrungen");
      const result = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Neuer Eintrag hinzufügen
  async function addWork(form: Record<string, string>) {
    try {
      const res = await fetch("/api/work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Fehler beim Hinzufügen");
      await loadData();
    } catch (err: any) {
      alert("Fehler: " + err.message);
    }
  }

  // 🔹 Eintrag löschen
  async function deleteWork(id: number) {
    try {
      await fetch(`/api/work?id=${id}`, { method: "DELETE" });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Fehler beim Löschen");
    }
  }

  if (loading)
    return <p className="text-gray-500 animate-pulse mt-10">⏳ Arbeitserfahrung wird geladen...</p>;

  if (error)
    return <p className="text-red-600 mt-10">❌ {error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">💼 Arbeitserfahrung</h1>

      {isAdmin && (
        <AdminPanel
          onAdd={addWork}
          fields={[
            { name: "title", placeholder: "Titel" },
            { name: "company", placeholder: "Firma" },
            { name: "description", placeholder: "Beschreibung (optional)" },
          ]}
        />
      )}

      {data.length === 0 ? (
        <p className="text-gray-600 mt-6 text-center">
          Noch keine Arbeitserfahrung hinzugefügt.
        </p>
      ) : (
        <div className="grid gap-4">
          {data.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              subtitle={item.company}
              description={item.description}
              onDelete={isAdmin ? () => deleteWork(item.id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

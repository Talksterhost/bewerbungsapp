"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "@/lib/useadmin";
import AdminPanel from "../components/adminpanel";

type Education = {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  description?: string;
};

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAdmin();

  async function loadEducation() {
    try {
      const res = await fetch("/api/education");
      if (!res.ok) throw new Error("Fehler beim Laden der Daten");
      const data = await res.json();
      setEducation(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEducation();
  }, []);

  async function addEducation(form: Record<string, string>) {
    await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    loadEducation();
  }

  if (loading) return <p>Lade Bildungsdaten...</p>;
  if (error) return <p className="text-red-500">Fehler: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🎓 Bildungsweg</h2>

      {isAdmin && (
        <AdminPanel
          onAdd={addEducation}
          fields={[
            { name: "degree", placeholder: "Abschluss" },
            { name: "institution", placeholder: "Institution" },
            { name: "startDate", placeholder: "Startdatum" },
            { name: "endDate", placeholder: "Enddatum (optional)" },
            { name: "description", placeholder: "Beschreibung (optional)" },
          ]}
        />
      )}

      {education.length === 0 ? (
        <p className="text-gray-600">Keine Daten vorhanden.</p>
      ) : (
        <ul className="space-y-4">
          {education.map((e) => (
            <li key={e.id} className="p-4 bg-white rounded-2xl shadow">
              <h3 className="text-lg font-semibold">{e.degree}</h3>
              <p className="text-sm text-gray-600">{e.institution}</p>
              <p className="text-sm text-gray-500">
                {e.startDate} – {e.endDate || "heute"}
              </p>
              {e.description && (
                <p className="mt-2 text-gray-700">{e.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

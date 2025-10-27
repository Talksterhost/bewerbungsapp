"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("/api/education")
      .then((res) => res.json())
      .then(setEducation);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bildungsweg</h2>
      <ul className="space-y-4">
        {education.map((e) => (
          <li key={e.id} className="p-4 bg-white rounded-2xl shadow">
            <h3 className="text-lg font-semibold">{e.degree}</h3>
            <p className="text-sm text-gray-600">{e.institution}</p>
            <p className="text-sm text-gray-500">
              {e.startDate} – {e.endDate || "heute"}
            </p>
            {e.description && <p className="mt-2 text-gray-700">{e.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

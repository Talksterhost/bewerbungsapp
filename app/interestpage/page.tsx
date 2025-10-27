"use client";

import { useEffect, useState } from "react";

type Interest = {
  id: number;
  name: string;
  description?: string;
};

export default function InterestPage() {
  const [interests, setInterests] = useState<Interest[]>([]);

  useEffect(() => {
    fetch("/api/interest")
      .then((res) => res.json())
      .then(setInterests);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Interessen</h2>
      <ul className="space-y-3">
        {interests.map((i) => (
          <li key={i.id} className="p-4 bg-white rounded-2xl shadow">
            <h3 className="font-semibold">{i.name}</h3>
            {i.description && <p className="text-gray-700">{i.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

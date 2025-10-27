"use client";

import { useEffect, useState } from "react";
import Card from "../components/card";
import AdminPanel from "../components/adminpanel";

interface Work {
  id: number;
  title: string;
  company: string;
}

export default function WorkPage() {
  const [data, setData] = useState<Work[]>([]);

  useEffect(() => {
    fetch("/api/work").then((res) => res.json()).then(setData);
  }, []);

  async function addWork(form: Record<string, string>) {
    await fetch("/api/work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const res = await fetch("/api/work");
    setData(await res.json());
  }

  async function deleteWork(id: number) {
    await fetch(`/api/work?id=${id}`, { method: "DELETE" });
    setData(data.filter((item) => item.id !== id));
  }

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold mb-6">Arbeitserfahrung</h1>

      <AdminPanel
        onAdd={addWork}
        fields={[
          { name: "title", placeholder: "Titel" },
          { name: "company", placeholder: "Firma" },
        ]}
      />

      {data.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          subtitle={item.company}
          onDelete={() => deleteWork(item.id)}
        />
      ))}
    </div>
  );
}

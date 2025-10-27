"use client";

import { useState } from "react";

interface AdminPanelProps {
  onAdd: (form: Record<string, string>) => void;
  fields: { name: string; placeholder: string }[];
}

export default function AdminPanel({ onAdd, fields }: AdminPanelProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData({});
  };

  return (
    <div className="flex gap-2 mb-6">
      {fields.map((field) => (
        <input
          key={field.name}
          placeholder={field.placeholder}
          className="border p-2 rounded w-full"
          value={formData[field.name] || ""}
          onChange={(e) => handleChange(field.name, e.target.value)}
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        +
      </button>
    </div>
  );
}

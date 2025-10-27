import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  onDelete?: () => void;
}

export default function Card({ title, subtitle, description, onDelete }: CardProps) {
  return (
    <div className="bg-white p-4 mb-3 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
        {description && <p className="text-gray-500 mt-1">{description}</p>}
      </div>
      {onDelete && (
        <button
          onClick={onDelete}
          className="text-red-600 font-bold text-lg hover:text-red-800"
          title="Löschen"
        >
          ✕
        </button>
      )}
    </div>
  );
}

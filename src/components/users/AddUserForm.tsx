"use client";
import { useState } from "react";

interface Props {
  onAdd: (name: string) => void;
}

export default function AddUserForm({ onAdd }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex items-center gap-3">
      <input
        className="border p-2 rounded w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter roommate name"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
}

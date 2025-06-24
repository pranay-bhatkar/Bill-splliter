"use client";
import { useState } from "react";
import { Group } from "@/types";

interface Props {
  groups: Group[];
  activeGroupId: string | null;
  onSelect: (id: string) => void;
  onCreate: (name: string) => void;
}

export default function GroupSelector({ groups, activeGroupId, onSelect, onCreate }: Props) {
  const [newGroup, setNewGroup] = useState("");

  const handleCreate = () => {
    if (!newGroup.trim()) return;
    onCreate(newGroup.trim());
    setNewGroup("");
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">🏠 Select Group</h2>
      <div className="flex gap-2 flex-wrap">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelect(group.id)}
            className={`px-3 py-1 rounded ${
              activeGroupId === group.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="border p-2 rounded w-full"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="New group name"
        />
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          ➕ Add
        </button>
      </div>
    </div>
  );
}

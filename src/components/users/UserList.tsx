"use client";
import { User } from "@/types";
import { Bill } from "@/types";

interface Props {
  users: User[];
  bills: Bill[];
  onDelete: (id: string) => void;
}

export default function UserList({ users, bills, onDelete }: Props) {
  const canDelete = (userId: string) =>
    !bills.some(
      (bill) => bill.paidBy === userId || bill.splitBetween.includes(userId)
    );

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Current Users:</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center bg-gray-800 p-3 rounded shadow"
          >
            <span>{user.name}</span>
            {canDelete(user.id) && (
              <button
                onClick={() => onDelete(user.id)}
                className="text-red-600 text-sm"
              >
                ❌
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

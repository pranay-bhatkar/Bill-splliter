"use client";
import { Bill, User } from "@/types";

interface Props {
  bills: Bill[];
  users: User[];
  onDelete: (id: string) => void;
  onEdit: (bill: Bill) => void;
}

export default function BillList({ bills, users, onDelete,onEdit }: Props) {
  const getUserName = (id: string) =>
    users.find((u) => u.id === id)?.name || "Unknown";

  return (
    <div className="mt-6 space-y-3">
      {bills.map((bill) => (
        <div key={bill.id} className="bg-gray-800 p-4 rounded shadow relative">
          <h2 className="font-semibold">{bill.description}</h2>
          <p>₹{bill.amount}</p>
          <p>Paid by: {getUserName(bill.paidBy)}</p>
          <p>Split between: {bill.splitBetween.map(getUserName).join(", ")}</p>
          <button
            onClick={() => onDelete(bill.id)}
            className="absolute top-2 right-2 text-sm text-red-600"
          >
            ❌
          </button>
          <button
            onClick={() => onEdit(bill)}
            className="absolute top-2 right-10 text-sm text-blue-600"
          >
            ✏️
          </button>
        </div>
      ))}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Bill, User } from "@/types";

interface Props {
  users: User[];
  onAdd: (bill: Bill) => void;
  initialBill?: Bill | null;
  onUpdate?: (updatedBill: Bill) => void;
}

export default function AddBillForm({
  users,
  onAdd,
  initialBill,
  onUpdate,
}: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [paidBy, setPaidBy] = useState("");
  const [splitBetween, setSplitBetween] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (initialBill) {
      setEditing(true);
      setDescription(initialBill.description);
      setAmount(initialBill.amount);
      setPaidBy(initialBill.paidBy);
      setSplitBetween(initialBill.splitBetween);
    } else {
      setEditing(false);
    }
  }, [initialBill]);

  const toggleSplitUser = (id: string) => {
    setSplitBetween((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || amount <= 0 || !paidBy || splitBetween.length === 0)
      return;

    const bill: Bill = {
      id: editing && initialBill ? initialBill.id : Date.now().toString(),
      description,
      amount,
      paidBy,
      splitBetween,
      date: new Date().toISOString(),
    };

    editing && onUpdate ? onUpdate(bill) : onAdd(bill);

    // Reset
    setDescription("");
    setAmount(0);
    setPaidBy("");
    setSplitBetween([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-800 rounded shadow"
    >
      <h2 className="text-lg font-semibold">
        {editing ? "Edit Bill" : "Add Bill"}
      </h2>
      <div>
        <label>Description</label>
        <input
          className="border p-2 w-full rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount (₹)</label>
        <input
          className="border p-2 w-full rounded"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Paid By</label>
        <select
          className="border p-2 w-full rounded"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          required
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Split Between</label>
        <div className="flex gap-3 flex-wrap">
          {users.map((user) => (
            <label key={user.id} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={splitBetween.includes(user.id)}
                onChange={() => toggleSplitUser(user.id)}
              />
              {user.name}
            </label>
          ))}
        </div>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        {editing ? "Update Bill" : "Add Bill"}
      </button>
    </form>
  );
}

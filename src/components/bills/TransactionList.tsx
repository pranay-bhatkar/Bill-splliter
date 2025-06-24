"use client";
import { Transaction, User } from "@/types";

interface Props {
  transactions: Transaction[];
  users: User[];
  settled: Transaction[];
  onSettle: (tx: Transaction) => void;
}

export default function TransactionList({
  transactions,
  users,
  settled,
  onSettle,
}: Props) {
  const getName = (id: string) =>
    users.find((u) => u.id === id)?.name || "Unknown";

  const active = transactions.filter(
    (tx) => !settled.find((s) => s.id === tx.id)
  );

  return (
    <div className="mt-8 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">💸 Unsettled Transactions</h2>
        {active.length === 0 ? (
          <p className="text-gray-500">No pending dues 🎉</p>
        ) : (
          <ul className="space-y-2">
            {active.map((tx) => (
              <li
                key={tx.id}
                className="flex justify-between items-center bg-gray-800 p-3 rounded shadow"
              >
                <span>
                  {getName(tx.from)} owes {getName(tx.to)} ₹{tx.amount}
                </span>
                <button
                  onClick={() => onSettle(tx)}
                  className="text-sm text-green-600"
                >
                  ✅ Settle
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {settled.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">✅ Settled Transactions</h2>
          <ul className="space-y-2 text-sm font-bol">
            {settled.map((tx) => (
              <li key={tx.id} className="bg-gray-800 p-3 rounded shadow">
                {getName(tx.from)} settled ₹{tx.amount} with {getName(tx.to)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

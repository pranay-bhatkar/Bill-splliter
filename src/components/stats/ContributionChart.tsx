"use client";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Bill, User } from "@/types";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF5C8A", "#FFD700"
];

export default function ContributionChart({ bills, users }: { bills: Bill[]; users: User[] }) {
  // Aggregate paid amounts
  const contributions = users.map((user) => {
    const totalPaid = bills
      .filter((b) => b.paidBy === user.id)
      .reduce((sum, b) => sum + b.amount, 0);

    return {
      name: user.name,
      value: totalPaid,
    };
  }).filter(user => user.value > 0); // filter 0-contributions

  if (contributions.length === 0) return <p className="text-gray-500 mt-6">No contributions yet.</p>;

  return (
    <div className="bg-white p-4 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">📊 Contributions by User</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={contributions}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {contributions.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

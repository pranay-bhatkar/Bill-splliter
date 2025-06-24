"use client";

import { useState } from "react";
import { useLocalUsers } from "@/hooks/useLocalUsers";
import { useLocalBills } from "@/hooks/useLocalBills";
import { useLocalGroups } from "@/hooks/useLocalGroups";
import { useLocalSettlements } from "@/hooks/useLocalSettlements";

import AddUserForm from "@/components/users/AddUserForm";
import UserList from "@/components/users/UserList";
import AddBillForm from "@/components/bills/AddBillsForm";
import BillList from "@/components/bills/BillList";
import TransactionList from "@/components/bills/TransactionList";
import ContributionChart from "@/components/stats/ContributionChart";
import GroupSelector from "@/components/group/GroupSelector";

import { Bill, User } from "@/types";
import { calculateTransactions } from "@/lib/settleUp";

export default function Dashboard() {
  // Group management
  const { groups, activeGroupId, setActiveGroupId, createGroup } =
    useLocalGroups();

  // Data hooks (global)
  const [allUsers, setAllUsers] = useLocalUsers();
  const [allBills, setAllBills] = useLocalBills();
  const [settledTransactions, markAsSettled] = useLocalSettlements();

  // Group-specific filtered data
  const users: User[] = allUsers.filter((u) => u.groupId === activeGroupId);
  const bills: Bill[] = allBills.filter((b) => b.groupId === activeGroupId);

  // Edit state
  const [editBill, setEditBill] = useState<Bill | null>(null);

  // Handlers
  const handleAddUser = (name: string) => {
    if (!activeGroupId) return;
    const newUser: User = {
      id: Date.now().toString(),
      name,
      groupId: activeGroupId,
    };
    setAllUsers([...allUsers, newUser]);
  };

  const handleDeleteUser = (id: string) => {
    setAllUsers(allUsers.filter((u) => u.id !== id));
  };

  const handleAddBill = (bill: Bill) => {
    if (!activeGroupId) return;
    const newBill: Bill = { ...bill, groupId: activeGroupId };
    setAllBills([...allBills, newBill]);
  };

  const handleUpdateBill = (updated: Bill) => {
    setAllBills(allBills.map((b) => (b.id === updated.id ? updated : b)));
    setEditBill(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <GroupSelector
        groups={groups}
        activeGroupId={activeGroupId}
        onSelect={setActiveGroupId}
        onCreate={createGroup}
      />

      {activeGroupId ? (
        <>
          <AddUserForm onAdd={handleAddUser} />
          <UserList users={users} bills={bills} onDelete={handleDeleteUser} />

          <AddBillForm
            users={users}
            onAdd={handleAddBill}
            initialBill={editBill}
            onUpdate={handleUpdateBill}
          />

          <BillList
            bills={bills}
            users={users}
            onDelete={(id) => setAllBills(allBills.filter((b) => b.id !== id))}
            onEdit={(bill) => setEditBill(bill)}
          />

          <TransactionList
            transactions={calculateTransactions(bills, users)}
            users={users}
            settled={settledTransactions}
            onSettle={markAsSettled}
          />

          <ContributionChart bills={bills} users={users} />
        </>
      ) : (
        <p className="text-gray-500 text-center mt-4">
          Please select or create a group to get started.
        </p>
      )}
    </div>
  );
}

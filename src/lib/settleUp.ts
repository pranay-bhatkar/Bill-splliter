import { Bill, User, Transaction } from "@/types";

/**
 * Calculates net balances and simplifies transactions like: A owes B ₹X
 */
export function calculateTransactions(bills: Bill[], users: User[]): Transaction[] {
  const balanceMap: Record<string, number> = {};

  // Initialize user balances
  users.forEach(user => {
    balanceMap[user.id] = 0;
  });

  // Step 1: Calculate each user's net balance
  bills.forEach(bill => {
    const splitAmount = bill.amount / bill.splitBetween.length;

    bill.splitBetween.forEach(userId => {
      balanceMap[userId] -= splitAmount;
    });

    balanceMap[bill.paidBy] += bill.amount;
  });

  // Step 2: Convert balances to transactions
  const creditors = Object.entries(balanceMap)
    .filter(([, amt]) => amt > 0)
    .map(([id, amt]) => ({ id, amount: amt }))
    .sort((a, b) => b.amount - a.amount);

  const debtors = Object.entries(balanceMap)
    .filter(([, amt]) => amt < 0)
    .map(([id, amt]) => ({ id, amount: -amt }))
    .sort((a, b) => b.amount - a.amount);

  const transactions: Transaction[] = [];

  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(debtor.amount, creditor.amount);

    transactions.push({
      id: `${debtor.id}->${creditor.id}`,
      from: debtor.id,
      to: creditor.id,
      amount: Math.round(amount * 100) / 100,
      date: new Date().toISOString(),
    });

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount === 0) i++;
    if (creditor.amount === 0) j++;
  }

  return transactions;
}

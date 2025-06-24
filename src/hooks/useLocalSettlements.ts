import { useEffect, useState } from "react";
import { Transaction } from "@/types";

export function useLocalSettlements() {
  const [settled, setSettled] = useState<Transaction[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("settledTransactions");
    if (data) setSettled(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("settledTransactions", JSON.stringify(settled));
  }, [settled]);

  const markAsSettled = (tx: Transaction) => {
    setSettled([...settled, { ...tx, settled: true }]);
  };

  return [settled, markAsSettled] as const;
}

import { useEffect, useState } from "react";
import { Bill } from "@/types";

export function useLocalBills() {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bills");
    if (stored) setBills(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

  return [bills, setBills] as const;
}

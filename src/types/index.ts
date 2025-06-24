export interface User {
  id: string;
  name: string;
  email: string;
  groupId: string;
}

export interface Bill {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // user id
  splitBetween: string[]; // array of user ids
  date: string;
  groupId: string;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  date: string;
  settled?: boolean;
}

export interface Group {
  id: string;
  name: string;
}

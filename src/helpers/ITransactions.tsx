export interface Transaction {
  _id: string;
  createdAt: Date;
  events: TransactionEvent[];
  income: number;
  expense: number;
}
export interface Errors {
  account: string;
  from: string;
  to: string;
  category: string;
  amount: string;
}
export interface Month {
  from: Date;
  to: Date;
  expense: number;
  income: number;
}
export interface TransactionEvent {
  _id: string;
  type: string;
  date: Date;
  account?: string;
  from?: string;
  to?: string;
  fees: string;
  category?: string;
  amount: string;
  note: string;
  description: string;
  transferId?: string;
}

export interface MonthlyContainer {
  isAddTransactionOpen: boolean;
  isInfoTransactionOpen: boolean;
  isEditTransactionOpen: boolean;
  isTransfer: boolean;
  date: Date;
  calendarDates: {
    date: Date;
  }[];
}
export interface HandleInput {
  target: {
    value: string | number | Date;
    name: string;
  };
}
export interface TransactionReducer {
  date: Date;
  transaction: TransactionEvent;
}
export interface userReducer {
  user: any;
  token: string;
  loading: boolean;
}
export interface Stat {
  category: string;
  value: number;
  color: string;
  label: string;
}

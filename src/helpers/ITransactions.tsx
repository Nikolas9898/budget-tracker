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
  from: any;
  to: any;
  expense: number;
  income: number;
}
export interface TransactionEvent {
  _id: string;
  type: string;
  date: any;
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
  date: any;
  calendarDates: {
    date: any;
  }[];
}

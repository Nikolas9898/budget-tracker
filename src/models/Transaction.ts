import {Moment} from 'moment';

export interface Transaction {
  _id: string;
  createdAt: Date;
  events: TransactionEvent[];
  income: number;
  expense: number;
}

export interface TransactionEvent {
  _id: string;
  type: string;
  date: Date;
  account?: string;
  from?: string;
  to?: string;
  fees?: string;
  category?: string;
  amount: string;
  note: string;
  description: string;
  transferId?: string;
  transactionId: string;
}
export interface ServiceTransaction {
  createdAt: Moment;
  events: ServiceTransactionEvent[];
}
export interface ServiceTransactionEvent {
  account?: string;
  amount: number;
  category?: string;
  currency: string;
  date: Moment | Date;
  description: string;
  fees: number;
  from?: string;
  note: string;
  to?: string;
  transferId?: string;
  type: string;
  _id?: string;
}
export interface SpecificDatePeriod {
  // transactions: any;
  // createdAt: Date;
  // events: ServiceTransactionEvent[];
  // expense: number;
  // income: number;
  // updatedAt: Date;
  // userId: string;
  // __v: number;
  // _id: string;
  // }[];
  sumIncome: number;
  sumExpense: number;
}
export interface TransactionWithAmountNumber {
  _id: string;
  createdAt: Date;
  events: TransactionEventWithAmountNumber[];
  income: number;
  expense: number;
}
export interface TransactionEventWithAmountNumber {
  _id: string;
  type: string;
  date: Date;
  account?: string;
  from?: string;
  to?: string;
  category?: string;
  amount: number;
  fees: number;
  note: string;
  description: string;
}
export type TransactionReducer = {
  date: Date;
  transactionEvent: TransactionEvent;
  isTransactionOpen: boolean;
};
export interface Month {
  from: Date;
  to: Date;
  expense: number;
  income: number;
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
export interface DailyContainerInterface {
  sumIncome: number;
  sumExpense: number;
  selectedEvent: TransactionEvent;
  transaction: TransactionWithAmountNumber;
}
export type CalendarDates = {
  date: Date;
};

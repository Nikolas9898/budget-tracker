import {Moment} from 'moment';
import {ActionTypes} from '../modules/transaction/actionTypes';

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
  currency: string;
  category?: string;
  amount: number;
  fees: number;
  note: string;
  description: string;
}
export interface ServiceTransaction {
  createdAt: Moment;
  events: ServiceTransactionEvent[];
}
export interface ServiceTransactionEvent {
  type: string;
  date: Moment;
  currency: string;
  account: string | undefined;
  from: string | undefined;
  to: string | undefined;
  category: string | undefined;
  amount: number;
  fees: number;
  note: string;
  description: string;
  transferId: string | undefined;
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
export enum TransactionTypes {
  TRANSFER = 'transfer',
  INCOME = 'income',
  EXPENSE = 'expense',
  CURRENCY = 'BGN'
}
export enum TransactionPage {
  TRANSACTION = 'transaction',
  STATS = 'stats',
  EXPORT = 'export',
  ACCOUNTS = 'accounts'
}

export enum SelectInputTitle {
  FROM = 'from',
  TO = 'to',
  CATEGORY = 'category',
  ACCOUNT = 'account'
}

export interface ChangeInputAction {
  type: ActionTypes;
  payload: {
    name: string;
    value: string | number | Date;
  };
}
export interface SetTransactionAction {
  type: ActionTypes;
  payload: TransactionEvent;
}
export interface SetDateAction {
  type: ActionTypes;
  payload: Date;
}

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
  transactionId:string
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
  date: Date
  }
import Moment from 'moment';
import {TransactionEvent} from '../models/Transaction';

export enum DaysOfWeek {
  Monday = 'M',
  Thuesday = 'T',
  Wednesday = 'W',
  Thursday = 'Th',
  Friday = 'F',
  Saturday = 'Sa',
  Sunday = 'Su'
}

export enum TransactionTypes {
  Transfer = 'transfer',
  Income = 'income',
  Expense = 'expense',
  Currency = 'Bg'
}
export enum TransactionPage {
  Transaction = 'transaction',
  Stats = 'stats',
  Export = 'export',
  Accounts = 'accounts'
}

export enum UnitOfTime {
  Date = 'date',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

export const firstDateOfTheMonth = (date: Date): Moment.Moment => Moment(date).startOf('month');

export const lastDateOfTheMonth = (date: Date): Moment.Moment => Moment(date).endOf('month');

export const firstDateOfFirstWeekOfTheMonth = (date: Date): Moment.Moment =>
  firstDateOfTheMonth(date).startOf('isoWeek');

export const lastDateOfFirstWeekOfTheMonth = (date: Date): Moment.Moment => firstDateOfTheMonth(date).endOf('isoWeek');

export const firstDateOfLastWeekOfTheMonth = (date: Date): Moment.Moment => lastDateOfTheMonth(date).startOf('isoWeek');

export const lastDateOfLastWeekOfTheMonth = (date: Date): Moment.Moment =>
  lastDateOfTheMonth(date).startOf('day').endOf('isoWeek');

export const isTheSameDate = (calendarDate: Date, transactionDate: Date): boolean =>
  Moment(calendarDate).diff(transactionDate, 'day') === 0;

export const isTypeTransfer = (type: string): boolean => type.toLowerCase() === TransactionTypes.Transfer;

export const isTransactionContainer = (pathname: string): boolean => pathname.includes(TransactionPage.Transaction);

export const isSelectedTitle = (pathname: string, path: string): boolean =>
  pathname === `/transaction/${path}` || pathname === `/stats/${path}`;

export const isTransactionTypeIncome = (type: string, amount: number): string =>
  type === TransactionTypes.Income ? (amount / 100).toFixed(2) : '';

export const isTransactionTypeExpense = (type: string, amount: number): string =>
  type === TransactionTypes.Expense || type === TransactionTypes.Transfer ? (amount / 100).toFixed(2) : '';

export const headerTitle = (path: string): string => {
  switch (true) {
    case path.includes('/transaction'):
      return TransactionPage.Transaction.toLocaleUpperCase();
    case path.includes('/stats'):
      return TransactionPage.Stats.toLocaleUpperCase();
    case path.includes('/export'):
      return TransactionPage.Export.toLocaleUpperCase();
    case path.includes('/accounts'):
      return TransactionPage.Accounts.toLocaleUpperCase();
    default:
      return '';
  }
};

export const getTransaction = (transactionEvent: TransactionEvent) => {
  const {type, transferId, date, account, category, from, fees, to, amount, note, description} = transactionEvent;
  return {
    events: [
      {
        type: type.toLowerCase(),
        currency: TransactionTypes.Currency,
        transferId,
        date: Moment(date),
        account: isTypeTransfer(type) ? '' : account,
        category: isTypeTransfer(type) ? '' : category,
        from: isTypeTransfer(type) ? from : '',
        fees: parseFloat(fees!) * 100,
        to: isTypeTransfer(type) ? to : '',
        amount: parseFloat(amount) * 100,
        note,
        description
      }
    ],
    createdAt: Moment(transactionEvent.date).startOf('date')
  };
};

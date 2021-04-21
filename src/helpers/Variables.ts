import Moment from 'moment';
import {TransactionEvent} from '../models/Transaction';

export enum DaysOfWeek {
  MONDAY = 'M',
  THUESDAY = 'T',
  WEDNESDAY = 'W',
  THURSDAY = 'Th',
  FRIDAY = 'F',
  SATURDAY = 'Sa',
  SUNDAY = 'Su'
}

export enum TransactionTypes {
  TRANSFER = 'transfer',
  INCOME = 'income',
  EXPENSE = 'expense',
  CURRENCY = 'Bg'
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

export enum UnitOfTime {
  DATE = 'date',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  DAYS = 'days',
  DAY = 'day',
  ISO_WEEK = 'isoWeek'
}

const {DATE, MONTH, DAY, ISO_WEEK} = UnitOfTime;

export const firstDateOfTheMonth = (date: Date): Moment.Moment => Moment(date).startOf(MONTH);

export const lastDateOfTheMonth = (date: Date): Moment.Moment => Moment(date).endOf(MONTH);

export const firstDateOfFirstWeekOfTheMonth = (date: Date): Moment.Moment =>
  firstDateOfTheMonth(date).startOf(ISO_WEEK);

export const lastDateOfFirstWeekOfTheMonth = (date: Date): Moment.Moment => firstDateOfTheMonth(date).endOf(ISO_WEEK);

export const firstDateOfLastWeekOfTheMonth = (date: Date): Moment.Moment => lastDateOfTheMonth(date).startOf(ISO_WEEK);

export const lastDateOfLastWeekOfTheMonth = (date: Date): Moment.Moment =>
  lastDateOfTheMonth(date).startOf(DAY).endOf(ISO_WEEK);

export const isTheSameDate = (calendarDate: Date, transactionDate: Date): boolean =>
  Moment(calendarDate).diff(transactionDate, DAY) === 0;

export const isTypeTransfer = (type: string): boolean => type.toLowerCase() === TransactionTypes.TRANSFER;

export const isTransactionContainer = (pathname: string): boolean => pathname.includes(TransactionPage.TRANSACTION);

export const isSelectedTitle = (pathname: string, path: string): boolean =>
  pathname === `/transaction/${path}` || pathname === `/stats/${path}`;

export const isTransactionTypeIncome = (type: string, amount: number): string =>
  type === TransactionTypes.INCOME ? (amount / 100).toFixed(2) : '';

export const isTransactionTypeExpense = (type: string, amount: number): string =>
  type === TransactionTypes.EXPENSE || type === TransactionTypes.TRANSFER ? (amount / 100).toFixed(2) : '';

export const headerTitle = (path: string): string => {
  switch (true) {
    case path.includes('/transaction'):
      return TransactionPage.TRANSACTION.toLocaleUpperCase();
    case path.includes('/stats'):
      return TransactionPage.STATS.toLocaleUpperCase();
    case path.includes('/export'):
      return TransactionPage.EXPORT.toLocaleUpperCase();
    case path.includes('/accounts'):
      return TransactionPage.ACCOUNTS.toLocaleUpperCase();
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
        currency: TransactionTypes.CURRENCY,
        transferId,
        date: Moment(date),
        account: isTypeTransfer(type) ? '' : account,
        category: isTypeTransfer(type) ? '' : category,
        from: isTypeTransfer(type) ? from : '',
        fees: fees ? parseFloat(fees) * 100 : '',
        to: isTypeTransfer(type) ? to : '',
        amount: parseFloat(amount) * 100,
        note,
        description
      }
    ],
    createdAt: Moment(transactionEvent.date).startOf(DATE)
  };
};

import Moment from 'moment';
import {TransactionTypes, TransactionPage, TransactionEvent, ServiceTransaction} from '../models/Transaction';
import {UnitOfTime} from '../models/Clendar';
import languageWords from './LanguageConsts';

export const isTypeTransfer = (type: string): boolean => type.toLowerCase() === TransactionTypes.TRANSFER;

export const isTransactionContainer = (pathname: string): boolean => pathname.includes(TransactionPage.TRANSACTION);

export const isSelectedTitle = (pathname: string, path: string): boolean =>
  pathname === `/transaction/${path}` || pathname === `/stats/${path}`;

export const isTransactionTypeIncome = (type: string, amount: number): string =>
  type === TransactionTypes.INCOME ? (amount / 100).toFixed(2) : '0.00';

export const isTransactionTypeExpense = (type: string, amount: number): string =>
  type === TransactionTypes.EXPENSE || type === TransactionTypes.TRANSFER ? (amount / 100).toFixed(2) : '0.00';

export const getHeaderTitle = (path: string): string => {
  switch (true) {
    case path.includes('/transaction'):
      return languageWords.TRANSACTIONS.toLocaleUpperCase();
    case path.includes('/stats'):
      return languageWords.STATS.toLocaleUpperCase();
    case path.includes('/export'):
      return languageWords.EXPORT.toLocaleUpperCase();
    case path.includes('/accounts'):
      return languageWords.ACCOUNT.toLocaleUpperCase();
    default:
      return '';
  }
};

export const getTransaction = (transactionEvent: TransactionEvent): ServiceTransaction => {
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
        fees: fees ? parseFloat(fees) * 100 : 0,
        to: isTypeTransfer(type) ? to : '',
        amount: parseFloat(amount) * 100,
        note,
        description
      }
    ],
    createdAt: Moment(transactionEvent.date).startOf(UnitOfTime.DATE)
  };
};

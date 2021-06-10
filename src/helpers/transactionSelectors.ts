import {createSelector} from '@reduxjs/toolkit';
import {TransactionReducer} from '../models/Transaction';

// eslint-disable-next-line import/prefer-default-export
export const getTransactionState = createSelector(
  (state: {transactionReducer: TransactionReducer}) => state,
  ({transactionReducer}) => transactionReducer
);

export const getTransactionDate = createSelector(
  (state: {transactionReducer: TransactionReducer}) => state,
  ({transactionReducer}) => transactionReducer.date
);

export const getTransactionAccount = createSelector(
  (state: {transactionReducer: TransactionReducer}) => state,
  ({transactionReducer}) =>
    transactionReducer.transactionEvent.from
      ? transactionReducer.transactionEvent.from
      : transactionReducer.transactionEvent.from
);

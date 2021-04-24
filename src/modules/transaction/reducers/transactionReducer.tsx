import Moment from 'moment';
import {AnyAction} from '@reduxjs/toolkit';
import {ActionTypes} from '../actionTypes';
import {TransactionEvent} from '../../../models/Transaction';

export interface State {
  date: Date;
  transactionEvent: TransactionEvent;
  isTransactionOpen: boolean;
}
const initialState = {
  date: Moment().toDate(),
  isTransactionOpen: false,

  transactionEvent: {
    _id: '',
    type: 'income',
    date: Moment().toDate(),
    account: '',
    from: '',
    category: '',
    fees: '0',
    transferId: '',
    to: '',
    amount: '0',
    note: '',
    description: '',
    transactionId: ''
  }
};
export const transactionReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case ActionTypes.HANDLE_NEXT_MONTH: {
      const nextMonth = Moment(state.date).add(1, 'month');
      return {
        ...state,
        date: nextMonth.toDate()
      };
    }

    case ActionTypes.HANDLE_PREVIOUS_MONTH: {
      const previousMonth = Moment(state.date).add(-1, 'month');
      return {
        ...state,
        date: previousMonth.toDate()
      };
    }

    case ActionTypes.HANDLE_NEXT_YEAR: {
      const nextYear = Moment(state.date).add(1, 'year').toDate();

      return {
        ...state,
        date: nextYear
      };
    }

    case ActionTypes.HANDLE_PREVIOUS_YEAR: {
      const previousYear = Moment(state.date).add(-1, 'year');
      return {
        ...state,
        date: previousYear.toDate()
      };
    }

    case ActionTypes.HANDLE_INPUT:
      if (action.payload.name === 'type') {
        return {
          ...state,
          transactionEvent: {
            ...state.transactionEvent,
            [action.payload.name]: action.payload.value,
            category: '',
            to: ''
          }
        };
      }
      return {
        ...state,
        transactionEvent: {
          ...state.transactionEvent,
          [action.payload.name]: action.payload.value
        }
      };

    case ActionTypes.SET_TRANSACTION:
      return {
        ...state,
        transactionEvent: action.payload
      };
    case ActionTypes.SET_DATE:
      return {
        ...state,
        date: action.payload
      };
    case ActionTypes.SET_IS_TRANSACTION_OPEN:
      return {
        ...state,
        isTransactionOpen: !state.isTransactionOpen
      };
    default:
      return state;
  }
};

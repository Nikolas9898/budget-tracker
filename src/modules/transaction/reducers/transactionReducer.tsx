import Moment from 'moment';
import {AnyAction} from '@reduxjs/toolkit';
import {ActionTypes} from '../actionTypes';
import {TransactionEvent} from '../../../models/Transaction';
import {UnitOfTime} from '../../../models/Clendar';

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
    fees: '',
    transferId: '',
    to: '',
    amount: '',
    note: '',
    description: '',
    transactionId: ''
  }
};
export const transactionReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case ActionTypes.HANDLE_NEXT_WEEK: {
      const nextMonth = Moment(state.date).set('date', state.date.getDate() - 7);
      return {
        ...state,
        date: nextMonth.toDate()
      };
    }

    case ActionTypes.HANDLE_PREVIOUS_WEEK: {
      const previousMonth = Moment(state.date).set('date', state.date.getDate() + 7);
      return {
        ...state,
        date: previousMonth.toDate()
      };
    }
    case ActionTypes.HANDLE_NEXT_MONTH: {
      const nextMonth = Moment(state.date).add(1, UnitOfTime.MONTH);
      return {
        ...state,
        date: nextMonth.toDate()
      };
    }

    case ActionTypes.HANDLE_PREVIOUS_MONTH: {
      const previousMonth = Moment(state.date).add(-1, UnitOfTime.MONTH);
      return {
        ...state,
        date: previousMonth.toDate()
      };
    }

    case ActionTypes.HANDLE_NEXT_YEAR: {
      const nextYear = Moment(state.date).add(1, UnitOfTime.YEAR).toDate();

      return {
        ...state,
        date: nextYear
      };
    }

    case ActionTypes.HANDLE_PREVIOUS_YEAR: {
      const previousYear = Moment(state.date).add(-1, UnitOfTime.YEAR);
      return {
        ...state,
        date: previousYear.toDate()
      };
    }

    case ActionTypes.TRANSACTION_INPUT_CHANGE:
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

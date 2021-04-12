import Moment from 'moment';
import {ActionTypes} from '../actionTypes';
import {TransactionEvent} from '../../../models/Transaction';

export interface State {
  date: Date;
  transactionEvent: TransactionEvent;
}
const initialState = {
  date: Moment().toDate(),

  transactionEvent: {
    _id: '',
    type: 'income',
    date: '',
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
export default (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.HANDLE_NEXT_MONTH: {
      const nextMonth = Moment(state.date).add(1, 'month');
      return {
        ...state,
        date: nextMonth
      };
    }

    case ActionTypes.HANDLE_PREVIOUS_MONTH: {
      const previousMonth = Moment(state.date).add(-1, 'month');
      return {
        ...state,
        date: previousMonth
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
        date: previousYear
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
    default:
      return state;
  }
};

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
    fees: '0',
    transferId: '',
    to: '',
    amount: '',
    note: '',
    description: '',
    transactionId: ''
  }
};

const changeInput = (state: State, action: AnyAction) => {
  if (action.payload.name === 'type') {
    return {
      ...state,
      transactionEvent: {
        ...state.transactionEvent,
        [action.payload.name]: action.payload.value,
        category: '',
        to: '',
        from: '',
        account: '',
        fees: '0'
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
};
const changeNextMonth = (state: State) => {
  const nextMonth = Moment(state.date).add(1, UnitOfTime.MONTH);
  return {
    ...state,
    date: nextMonth.toDate()
  };
};
const changePreviousMonth = (state: State) => {
  const previousMonth = Moment(state.date).add(-1, UnitOfTime.MONTH);
  return {
    ...state,
    date: previousMonth.toDate()
  };
};

const changeNextYear = (state: State) => {
  const nextYear = Moment(state.date).add(1, UnitOfTime.YEAR).toDate();

  return {
    ...state,
    date: nextYear
  };
};

const changePreviousYear = (state: State) => {
  const previousYear = Moment(state.date).add(-1, UnitOfTime.YEAR);
  return {
    ...state,
    date: previousYear.toDate()
  };
};

const setTransaction = (state: State, action: AnyAction) => {
  return {
    ...state,
    transactionEvent: action.payload
  };
};

const changeDate = (state: State, action: AnyAction) => {
  return {
    ...state,
    date: action.payload
  };
};

const setTransactionIsOpen = (state: State) => {
  return {
    ...state,
    isTransactionOpen: !state.isTransactionOpen
  };
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
      return changeNextMonth(state);
    }
    case ActionTypes.HANDLE_PREVIOUS_MONTH: {
      return changePreviousMonth(state);
    }
    case ActionTypes.HANDLE_NEXT_YEAR: {
      return changeNextYear(state);
    }
    case ActionTypes.HANDLE_PREVIOUS_YEAR: {
      return changePreviousYear(state);
    }
    case ActionTypes.TRANSACTION_INPUT_CHANGE:
      return changeInput(state, action);
    case ActionTypes.SET_TRANSACTION:
      return setTransaction(state, action);

    case ActionTypes.SET_DATE:
      return changeDate(state, action);

    case ActionTypes.SET_IS_TRANSACTION_OPEN:
      return setTransactionIsOpen(state);
    default:
      return state;
  }
};

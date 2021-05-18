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
    amount: '0',
    note: '',
    description: '',
    transactionId: ''
  }
};

const handleInput = (state: State, action: AnyAction) => {
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
};

const handleChangeNextMonth = (state: State) => {
  const nextMonth = Moment(state.date).add(1, UnitOfTime.MONTH);
  return {
    ...state,
    date: nextMonth.toDate()
  };
};
const handleChangePreviousMonth = (state: State) => {
  const previousMonth = Moment(state.date).add(-1, UnitOfTime.MONTH);
  return {
    ...state,
    date: previousMonth.toDate()
  };
};

const handleChangeNextYear = (state: State) => {
  const nextYear = Moment(state.date).add(1, UnitOfTime.YEAR).toDate();

  return {
    ...state,
    date: nextYear
  };
};

const handleChangePreviousYear = (state: State) => {
  const previousYear = Moment(state.date).add(-1, UnitOfTime.YEAR);
  return {
    ...state,
    date: previousYear.toDate()
  };
};

const handleSetTransaction = (state: State, action: AnyAction) => {
  return {
    ...state,
    transactionEvent: action.payload
  };
};

const handleSetDate = (state: State, action: AnyAction) => {
  return {
    ...state,
    date: action.payload
  };
};

const handleSetTransactionIsOpen = (state: State) => {
  return {
    ...state,
    isTransactionOpen: !state.isTransactionOpen
  };
};
export const transactionReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case ActionTypes.HANDLE_NEXT_MONTH: {
      return handleChangeNextMonth(state);
    }
    case ActionTypes.HANDLE_PREVIOUS_MONTH: {
      return handleChangePreviousMonth(state);
    }
    case ActionTypes.HANDLE_NEXT_YEAR: {
      return handleChangeNextYear(state);
    }
    case ActionTypes.HANDLE_PREVIOUS_YEAR: {
      return handleChangePreviousYear(state);
    }
    case ActionTypes.TRANSACTION_INPUT_CHANGE:
      return handleInput(state, action);
    case ActionTypes.SET_TRANSACTION:
      return handleSetTransaction(state, action);

    case ActionTypes.SET_DATE:
      return handleSetDate(state, action);

    case ActionTypes.SET_IS_TRANSACTION_OPEN:
      return handleSetTransactionIsOpen(state);
    default:
      return state;
  }
};

/* eslint-disable @typescript-eslint/dot-notation */
import {AnyAction} from 'redux';
import {TransactionTypes} from '../../../models/Transaction';
import {User, UserAccounts} from '../../../models/User';
import {ActionTypes} from '../actionTypes';

export interface State {
  user: User;
  token: string;
  loading: boolean;
}

const initialState = {
  user: {
    email: '',
    categories: [],
    createdAt: '',
    username: '',
    updatedAt: '',
    accounts: [],
    type: '',
    id: ''
  },
  expenseCategories: [],
  incomeCategories: [],
  token: '',
  loading: true
};

const signInStateChange = (state: State, payload: AnyAction) => {
  if (payload.token) {
    localStorage.setItem('jwt', payload.token);
  }

  return {
    ...state,
    user: payload.user,
    token: payload.token,
    loading: false
  };
};

const saveUserInState = (state: State, payload: AnyAction) => {
  if (payload.token) {
    localStorage.setItem('jwt', payload.token);
  }
  return {
    ...state,
    user: payload.user,
    expenseCategories: payload.expenseCategories.expenseCategories,
    incomeCategories: payload.incomeCategories.incomeCategories,
    token: payload.token
  };
};

const setAccounts = (state: State, payload: AnyAction) => {
  return {
    ...state,
    user: {
      ...state.user,
      accounts: [
        {
          ...state.user.accounts[0],
          accounts: payload.accounts
        }
      ]
    }
  };
};
const setAccount = (state: State, payload: AnyAction) => {
  let setAcc: UserAccounts[] = [];

  if (payload.type === TransactionTypes.INCOME) {
    setAcc = [
      {
        ...state.user.accounts[0],
        accounts: {
          ...state.user.accounts[0].accounts,
          [payload.account]: state.user.accounts[0].accounts[payload.account] - payload.amount * 100
        }
      }
    ];
  }
  if (payload.type === TransactionTypes.TRANSFER) {
    setAcc = [
      {
        ...state.user.accounts[0],
        accounts: {
          ...state.user.accounts[0].accounts,
          [payload.from]: state.user.accounts[0].accounts[payload.from] + payload.amount * 100 + payload.fees * 100,
          [payload.to]: state.user.accounts[0].accounts[payload.to] - payload.amount * 100
        }
      }
    ];
  }
  if (payload.type === TransactionTypes.EXPENSE) {
    setAcc = [
      {
        ...state.user.accounts[0],
        accounts: {
          ...state.user.accounts[0].accounts,
          [payload.account]: state.user.accounts[0].accounts[payload.account] + payload.amount * 100
        }
      }
    ];
  }
  return {
    ...state,
    user: {
      ...state.user,
      accounts: setAcc
    }
  };
};
export const userReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return signInStateChange(state, action.payload);
    case ActionTypes.SAVE_USER:
      return saveUserInState(state, action.payload);
    case ActionTypes.SET_ACCOUNTS:
      return setAccounts(state, action.payload);
    case ActionTypes.SET_ACCOUNT:
      return setAccount(state, action.payload);
    default:
      return state;
  }
};

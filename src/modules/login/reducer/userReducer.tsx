/* eslint-disable @typescript-eslint/dot-notation */
import {AnyAction} from 'redux';
import {User} from '../../../models/User';
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
  return {
    ...state,
    user: payload.user
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
  let setAcc: any = [];

  if (payload.type === 'income') {
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
  if (payload.type === 'transfer') {
    setAcc = [
      {
        ...state.user.accounts[0],
        accounts: {
          ...state.user.accounts[0].accounts,
          [payload.from]: state.user.accounts[0].accounts[payload.name] + payload.value * 100
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

import {TransactionEvent} from '../../../models/Transaction';
import {SignInUser, UserAccounts, UserSetAccount, UserSetAccounts, UserSignInAction} from '../../../models/User';
import {ActionTypes} from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const signIn = (user: SignInUser): UserSignInAction => ({
  type: ActionTypes.SIGN_IN,
  payload: user
});

export const saveUser = (user: SignInUser): UserSignInAction => ({
  type: ActionTypes.SAVE_USER,
  payload: user
});
export const setAccounts = (accounts: UserAccounts): UserSetAccounts => ({
  type: ActionTypes.SET_ACCOUNTS,
  payload: accounts
});
export const setAccount = (event: TransactionEvent): UserSetAccount => ({
  type: ActionTypes.SET_ACCOUNT,
  payload: event
});

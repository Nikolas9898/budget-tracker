import {TransactionEvent} from './Transaction';

export interface UserState {
  userReducer: UserReducer;
}
export interface UserReducer {
  user: User;
  expenseCategories: Categories[];
  incomeCategories: Categories[];
  token: string;
  isLoading: boolean;
}
interface Categories {
  _id: 'string';
  name: string;
}
export interface User {
  id: string;
  username: string;
  email: string;
  type: string;
  accounts: UserAccounts[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
}
export interface UserAccounts {
  _id: string;
  userId: string;
  accounts: {[key: string]: number};
  __v: number;
}
export interface UserRegister {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
export interface SignInUser {
  email: string;
  password: string;
  categories: [];
  createdAt: string;
  username: string;
  updatedAt: string;
  type: string;
  id: string;
}

export interface UserPayload {
  token: string;
  user: User;
}

export interface UserAction {
  type: string;
  payload: UserPayload;
}

export interface UserSignInAction {
  type: string;
  payload: SignInUser;
}
export interface UserSetAccounts {
  type: string;
  payload: UserAccounts;
}
export interface UserSetAccount {
  type: string;
  payload: TransactionEvent;
}

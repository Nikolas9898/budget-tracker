import {Document} from 'mongoose';

export interface UserType extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  accounts: string[];
  createdAt: string;
  updatedAt: string;
}
export interface MoneyAccount extends Document {
  _id: string;
  userId: string;
  accounts: {[key: string]: number};
}
export type ResponseUser = {
  _id: string;
  username: string;
  password: string | undefined;
  email: string;
  type: string;
  accounts: string[];
  createdAt: string;
  updatedAt: string;
};

export enum UserErrors {
  WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password',
  NOT_EXISTING_USER = 'No existing user'
}

export enum succsessMessages {
  UPDATED_SUCCESSFULLY = 'Updated successfully'
}
export const accounts = {card: 0, cash: 0, accounts: 0};

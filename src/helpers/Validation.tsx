import React from 'react';
import AddTransactionStyle from '../modules/transaction/components/addTransactionModal/AddTransactionStyle.module.css';
import {TransactionEvent} from '../models/Transaction';
import {Error} from '../models/Error';
import {TransactionTypes, TransactionPage} from './Variables';
import {UserRegister} from '../models/User';
import {
  EMAIL_CHECKER,
  FEES_CAN_NOT_BE_GREATER,
  NO_MATCHING_PASSWORDS,
  PLEASE_ADD_AN_AMOUNT,
  PLEASE_ENTER_VALID_EMAIL,
  PLEASE_ENTER_VALID_PASSWORD,
  PLEASE_SELECT_AN_ACCOUNT,
  PLEASE_SELECT_A_CATEGORY,
  PLEASE_SELECT_FROM,
  PLEASE_SELECT_TO
} from './ValidationContants';

export const validateTransaction = (value: TransactionEvent): Error => {
  const errors: Error = {
    account: '',
    from: '',
    category: '',
    to: '',
    amount: '',
    fees: ''
  };
  const {account, type, category, to, from, fees, amount} = value;

  if (!account && type !== TransactionPage.TRANSACTION) {
    errors.account = PLEASE_SELECT_AN_ACCOUNT;
  }
  if (type === TransactionTypes.TRANSFER && !from) {
    errors.from = PLEASE_SELECT_FROM;
  }
  if (!category && type !== TransactionTypes.TRANSFER) {
    errors.category = PLEASE_SELECT_A_CATEGORY;
  }
  if (type === TransactionTypes.TRANSFER && !to) {
    errors.to = PLEASE_SELECT_TO;
  }
  if (!amount) {
    errors.amount = PLEASE_ADD_AN_AMOUNT;
  }
  if (fees)
    if (parseFloat(fees) > parseFloat(amount)) {
      errors.fees = FEES_CAN_NOT_BE_GREATER;
    }
  return errors;
};

export const validateLogin = (
  user: UserRegister,
  isLogin: boolean
): {
  email: string;
  password: string;
  confirmPassword: string;
} => {
  const isValidEmail = RegExp(EMAIL_CHECKER);
  const errors = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  const {email, password, confirmPassword} = user;

  if (!isValidEmail.test(email)) {
    errors.email = PLEASE_ENTER_VALID_EMAIL;
  }
  if (password !== confirmPassword && !isLogin) {
    errors.confirmPassword = NO_MATCHING_PASSWORDS;
  }
  if (!password.match(/^[0-9a-zA-Z]+$/) || password.length > 20 || password.length < 6) {
    errors.password = PLEASE_ENTER_VALID_PASSWORD;
  }
  return errors;
};

export const errorMsg = (error: string): JSX.Element => {
  return <>{error && <div className={AddTransactionStyle.error_msg}>{error}</div>}</>;
};

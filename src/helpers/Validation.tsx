import React from 'react';
import AddTransactionStyle from '../modules/transaction/components/addTransactionModal/AddTransactionStyle.module.css';
import {TransactionEvent} from '../models/Transaction';
import {Error} from '../models/Error';
import {TransactionTypes, TransactionPage} from './Variables';
import {UserRegister} from '../models/User';
import languageWords from './LanguageConsts';
import EMAIL_VALIDATOR from './ValidationContants';

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

  if (!account && type !== TransactionTypes.TRANSFER) {
    errors.account = languageWords.PLEASE_SELECT_AN_ACCOUNT;
  }
  if (!category && type !== TransactionTypes.TRANSFER) {
    errors.category = languageWords.PLEASE_SELECT_A_CATEGORY;
  }
  if (type === TransactionTypes.TRANSFER && !to) {
    errors.to = languageWords.PLEASE_SELECT_TO;
  }
  if (type === TransactionTypes.TRANSFER && !from) {
    errors.from = languageWords.PLEASE_SELECT_FROM;
  }
  if (!amount) {
    errors.amount = languageWords.PLEASE_ADD_AN_AMOUNT;
  }
  if (fees)
    if (parseFloat(fees) > parseFloat(amount)) {
      errors.fees = languageWords.FEES_CAN_NOT_BE_GREATER;
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
  const isValidEmail = RegExp(EMAIL_VALIDATOR);
  const errors = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  const {email, password, confirmPassword} = user;

  if (!isValidEmail.test(email)) {
    errors.email = languageWords.PLEASE_ENTER_VALID_EMAIL;
  }
  if (password !== confirmPassword && !isLogin) {
    errors.confirmPassword = languageWords.NO_MATCHING_PASSWORDS;
  }
  if (!password.match(/^[0-9a-zA-Z]+$/) || password.length > 20 || password.length < 6) {
    errors.password = languageWords.PLEASE_ENTER_VALID_PASSWORD;
  }
  return errors;
};

export const errorMsg = (error: string): JSX.Element => {
  return <>{error && <div className={AddTransactionStyle.error_msg}>{error}</div>}</>;
};

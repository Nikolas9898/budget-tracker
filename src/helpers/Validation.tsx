import React from 'react';
import {TransactionEvent, TransactionTypes} from '../models/Transaction';
import {Error} from '../models/Error';
import {UserAccounts, UserRegister} from '../models/User';
import languageWords from './LanguageConsts';
import EMAIL_VALIDATOR from './Regex';
import classes from '../modules/transaction/components/addTransactionModal/AddTransactionStyle.module.css';

export const validateTransaction = (value: TransactionEvent, userAccounts: UserAccounts): Error => {
  const errors: Error = {
    account: '',
    from: '',
    category: '',
    to: '',
    amount: '',
    fees: ''
  };

  const {account, type, category, to, from, fees, amount, _id: eventId} = value;

  const accountsName = Object.keys(userAccounts.accounts);
  const accountsValue = Object.values(userAccounts.accounts);

  if (type !== 'income' && fees) {
    const total = (parseFloat(amount) + parseFloat(fees)) * 100;
    if (eventId) {
      accountsName.forEach((element, index) => {
        if (total > accountsValue[index] && (account || from) === element) {
          errors.amount = `${languageWords.THE_AMOUNT_IS_TOO_MUCH} ${element?.toLocaleUpperCase()} is ${(
            accountsValue[index] / 100
          ).toFixed(2)} BGN.`;
        }
      });
    } else {
      accountsName.forEach((element, index) => {
        if (total > accountsValue[index] && (account || from) === element) {
          errors.amount = `${languageWords.THE_AMOUNT_IS_TOO_MUCH} ${element?.toLocaleUpperCase()} is ${(
            accountsValue[index] / 100
          ).toFixed(2)} BGN.`;
        }
      });
    }
  }
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
  if (!amount || parseFloat(amount) <= 0 || (amount.charAt(0) === '0' && amount.charAt(1) !== '.')) {
    errors.amount = languageWords.PLEASE_ADD_AN_AMOUNT;
  }
  if (fees)
    if (parseFloat(fees) > parseFloat(amount) || parseFloat(amount) < 0) {
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
  username: string;
  confirmPassword: string;
} => {
  const isValidEmail = RegExp(EMAIL_VALIDATOR);
  const errors = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };
  const {email, password, confirmPassword, username} = user;

  if (!isValidEmail.test(email)) {
    errors.email = languageWords.PLEASE_ENTER_VALID_EMAIL;
  }

  if (username.length < 6 && !isLogin) {
    errors.username = languageWords.PLEASE_ENTER_VALID_USERNAME;
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
  return <>{error && <div className={`col-8  ${classes.error_msg} `}>{error}</div>}</>;
};

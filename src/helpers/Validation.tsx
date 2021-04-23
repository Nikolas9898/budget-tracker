import React from 'react';
import AddTransactionStyle from '../modules/transaction/components/addTransactionModal/AddTransactionStyle.module.css';
import {TransactionEvent} from '../models/Transaction';
import {Error} from '../models/Error';
import {TransactionTypes, TransactionPage} from './Variables';
import {UserRegister} from '../models/User';

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
    errors.account = 'Please select an account';
  }
  if (type === TransactionTypes.TRANSFER && !from) {
    errors.from = 'Please select from';
  }
  if (!category && type !== TransactionTypes.TRANSFER) {
    errors.category = 'Please select a category';
  }
  if (type === TransactionTypes.TRANSFER && !to) {
    errors.to = 'Please select to';
  }
  if (!amount) {
    errors.amount = 'Please add an amount';
  }
  if (fees)
    if (parseFloat(fees) > parseFloat(amount)) {
      errors.fees = "Fees can't be greater then amount";
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
  const isValidEmail = RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
  );
  const errors = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  const {email, password, confirmPassword} = user;

  if (!isValidEmail.test(email)) {
    errors.email = 'Please enter a valid email.';
  }
  if (password !== confirmPassword && !isLogin) {
    errors.confirmPassword = 'The password does not match. ';
  }
  if (!password.match(/^[0-9a-zA-Z]+$/) || password.length > 20 || password.length < 6) {
    errors.password = 'Please enter 6-20 characters [A-Z, a-z, 0-9 only].';
  }
  return errors;
};

export const errorMsg = (error: string): JSX.Element => {
  return <>{error && <div className={AddTransactionStyle.error_msg}>{error}</div>}</>;
};

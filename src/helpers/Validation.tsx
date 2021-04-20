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

  if (!value.account && value.type !== TransactionPage.TRANSACTION) {
    errors.account = 'Please select an account';
  }

  if (value.type === TransactionTypes.TRANSFER && !value.from) {
    errors.from = 'Please select from';
  }
  if (!value.category && value.type !== TransactionTypes.TRANSFER) {
    errors.category = 'Please select a category';
  }
  if (value.type === TransactionTypes.TRANSFER && !value.to) {
    errors.to = 'Please select to';
  }
  if (!value.amount) {
    errors.amount = 'Please add an amount';
  }
  if (value.fees)
    if (parseFloat(value.fees) > parseFloat(value.amount)) {
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
  if (!isValidEmail.test(user.email)) {
    errors.email = 'Please enter a valid email.';
  }
  if (user.password !== user.confirmPassword && !isLogin) {
    errors.confirmPassword = 'The password does not match. ';
  }
  if (!user.password.match(/^[0-9a-zA-Z]+$/) || user.password.length > 20 || user.password.length < 6) {
    errors.password = 'Please enter 6-20 characters [A-Z, a-z, 0-9 only].';
  }
  return errors;
};

export const errorMsg = (error: string): JSX.Element => {
  return <>{error && <div className={AddTransactionStyle.error_msg}>{error}</div>}</>;
};

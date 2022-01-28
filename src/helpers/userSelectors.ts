import {createSelector} from '@reduxjs/toolkit';
import {UserState} from '../models/User';

// eslint-disable-next-line import/prefer-default-export
export const getUserState = createSelector(
  (state: UserState) => state,
  ({userReducer}) => userReducer.user
);
export const getUserEmail = createSelector(
  (state: UserState) => state,
  ({userReducer}) => userReducer.user.email
);
export const getUsername = createSelector(
  (state: UserState) => state,
  ({userReducer}) => userReducer.user.username
);
export const getUserAccounts = createSelector(
  (state: UserState) => state,
  ({userReducer}) => userReducer.user.accounts[0]
);
export const getCategoriesIncome = createSelector(
  (state: UserState) => state,
  ({userReducer}) => userReducer.incomeCategories
);
export const getCategoriesExpense = createSelector(
  (state: UserState) => state,
  ({userReducer}) => userReducer.expenseCategories
);

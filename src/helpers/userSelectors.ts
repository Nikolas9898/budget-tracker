import {createSelector} from '@reduxjs/toolkit';
import {UserReducer} from '../models/User';

// eslint-disable-next-line import/prefer-default-export
export const getUserState = createSelector(
  (state: {userReducer: UserReducer}) => state,
  ({userReducer}) => userReducer.user
);

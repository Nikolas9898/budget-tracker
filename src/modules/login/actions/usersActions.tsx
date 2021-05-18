import {SignInUser} from '../../../models/User';
import {ActionTypes} from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const signIn = (
  user: SignInUser
): {
  type: string;
  payload: SignInUser;
} => ({
  type: ActionTypes.SIGN_IN,
  payload: user
});

export const saveUser = (
  user: SignInUser
): {
  type: string;
  payload: SignInUser;
} => ({
  type: ActionTypes.SAVE_USER,
  payload: user
});

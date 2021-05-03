import {SignInUser} from '../../../models/User';
import {ActionTypes} from '../actionTypes';

export const signIn = (
  user: SignInUser
): {
  type: string;
  payload: SignInUser;
} => ({
  type: ActionTypes.SIGN_IN,
  payload: user
});

export default signIn;

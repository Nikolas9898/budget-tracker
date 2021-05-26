import {AnyAction} from 'redux';
import {UserRegister} from '../../../models/User';
import {ActionTypes} from '../actionTypes';

export interface State {
  user: UserRegister;
  token: string;
  loading: boolean;
}

const initialState = {
  user: {email: '', username: '', password: '', confirmPassword: ''},
  token: '',
  loading: true
};

export const userReducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      if (action.payload.token) {
        localStorage.setItem('jwt', action.payload.token);
      }

      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false
      };
    default:
      return state;
  }
};

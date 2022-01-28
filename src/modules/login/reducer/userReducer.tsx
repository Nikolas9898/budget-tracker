import {User, UserAction, UserPayload} from '../../../models/User';
import {ActionTypes} from '../actionTypes';

export interface State {
  user: User;
  token: string;
  loading: boolean;
}

const initialState = {
  user: {
    email: '',
    categories: [],
    createdAt: '',
    username: '',
    updatedAt: '',
    type: '',
    id: ''
  },
  token: '',
  loading: true
};

const signInStateChange = (state: State, payload: UserPayload) => {
  if (payload.token) {
    localStorage.setItem('jwt', payload.token);
  }

  return {
    ...state,
    user: payload.user,
    token: payload.token,
    loading: false
  };
};

const saveUserInState = (state: State, payload: UserPayload) => {
  return {
    ...state,
    user: payload.user
  };
};

export const userReducer = (state = initialState, action: UserAction): State => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return signInStateChange(state, action.payload);
    case ActionTypes.SAVE_USER:
      return saveUserInState(state, action.payload);

    default:
      return state;
  }
};

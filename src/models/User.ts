export interface UserState {
  userReducer: UserReducer;
}
export interface UserReducer {
  user: User;
  token: string;
  isLoading: boolean;
}
export interface User {
  id: string;
  username: string;
  email: string;
  type: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
}
export interface UserRegister {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignInUser {
  email: string;
  password: string;
  categories: [];
  createdAt: string;
  username: string;
  updatedAt: string;
  type: string;
  id: string;
}

export interface UserPayload {
  token: string;
  user: User;
}

export interface UserAction {
  type: string;
  payload: UserPayload;
}

export interface UserSignInAction {
  type: string;
  payload: SignInUser;
}

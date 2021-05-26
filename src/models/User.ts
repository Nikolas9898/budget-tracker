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
  createdAt: Date;
  updatedAt: Date;
}
export interface UserRegister {
  email: string;
  username: string;
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

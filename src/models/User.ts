
export interface UserReducer {
    user: User;
    token: string;
    isLoading: boolean;
}
export interface User {
  id: string;
  username: string;
  email: string;
  type: string
  categories: string[]
  createdAt: Date;
  updatedAt:Date
}
export interface UserRegister {
  email: string;
  password: string;
  confirmPassword: string;
}
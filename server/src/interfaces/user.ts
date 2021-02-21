export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  categories: { name: string }[];
  createdAt: string;
  updatedAt: string;
}

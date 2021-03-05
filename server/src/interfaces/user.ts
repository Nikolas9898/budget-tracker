import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  categories: { name: string }[];
  createdAt: string;
  updatedAt: string;
}

export type ResponseUser = {
  _id: string;
  username: string;
  password: string;
  email: string;
  type: string;
  categories: { name: string }[];
  createdAt: string;
  updatedAt: string;
};

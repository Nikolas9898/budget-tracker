import { Document } from "mongoose";

export default interface TransactionsInterface extends Document {
  _id: string;
  events: TransactionInterface;
  createdAt: Date;
  userId: string;
  income: number;
  expense: number;
  updatedAt: Date;
  __v: number;
}

export interface TransactionInterface {
  events: [
    {
      to?: Date;
      date: Date;
      _id: string;
      from?: Date;
      type: string;
      fees?: number;
      note?: String;
      userId: string;
      amount: number;
      category: string;
      currency: string;
      createdAt: string;
      updatedAt: string;
      transferId: string;
      description?: String;
    }
  ];
  userId: string;
}

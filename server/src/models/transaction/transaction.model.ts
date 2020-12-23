import { Schema, model } from "mongoose";

export interface TransactionInterface {
  to?: Date;
  date: Date;
  _id: string;
  from?: Date;
  type: string;
  fees: number;
  note?: String;
  userId: string;
  amount: number;
  category: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
  description?: String;
}

const transactionSchema = new Schema(
  {
    type: {
      trim: true,
      type: String,
      minlength: 3,
    },
    amount: {
      trim: true,
      type: Number,
      required: true,
    },
    userId: {
      trim: true,
      type: String,
      minlength: 3,
      require: true,
    },
    category: {
      trim: true,
      type: String,
      minlength: 2,
      required: true,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    fees: {
      type: Number,
    },
    currency: {
      trim: true,
      type: String,
      minlength: 2,
      required: true,
    },
    note: {
      type: String,
      minlength: 3,
    },
    description: {
      type: String,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Transaction", transactionSchema);

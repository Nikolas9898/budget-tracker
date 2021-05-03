import {Schema, model} from 'mongoose';
import TransactionType from '../../models/transactions';

const transactionSchema = new Schema(
  {
    events: [
      {
        type: {
          trim: true,
          type: String,
          minlength: 3
        },
        amount: {
          trim: true,
          type: Number,
          required: true
        },
        account: {
          type: String
        },
        date: {
          type: Date,
          required: true
        },
        category: {
          trim: true,
          type: String
        },
        from: {
          type: String,
          trim: true
        },
        transferId: {
          type: String
        },
        to: {
          type: String,
          trim: true
        },
        fees: {
          type: Number
        },
        currency: {
          trim: true,
          type: String,
          minlength: 2,
          required: true
        },
        note: {
          type: String
        },
        description: {
          type: String
        }
      }
    ],
    userId: {
      trim: true,
      type: String,
      minlength: 3,
      require: true
    },
    expense: {
      type: Number
    },
    income: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default model<TransactionType>('Transaction', transactionSchema);

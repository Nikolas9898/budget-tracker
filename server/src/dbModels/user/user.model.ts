import {Schema, model} from 'mongoose';
import {UserType} from '../../models/user';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3
    },
    currency: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    type: {
      type: String,
      required: true
    },
    accounts: [{type: Schema.Types.ObjectId, ref: 'MoneyAccounts'}]
  },
  {
    timestamps: true
  }
);

export default model<UserType>('User', userSchema);

import {Schema, model} from 'mongoose';
import {MoneyAccount} from '../../models/user';

const moneyAccountsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    accounts: {}
  },
  {
    strict: false
  }
);

export default model<MoneyAccount>('MoneyAccounts', moneyAccountsSchema);

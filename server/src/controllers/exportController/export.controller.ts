import {RequestHandler, Request, Response} from 'express';
import moment from 'moment';
import {tokenDecoder} from '../../helpers/tokenDecoder';
import Transaction from '../../dbModels/transaction/transaction.model';
import {MomentConstants, TransactionEvent} from '../../models/transactions';

export default interface AggregatedTransactionType extends Document {
  _id: string;
  createdAt: Date;
  events: TransactionEvent;
  userId: string;
  income: number;
  expense: number;
  updatedAt: string;
  __v: number;
}
export const exportTransactionByFilters: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {type, from, to} = req.params;
    const filters: {label: string; value: string}[] = req.body;
    const userId: string = tokenDecoder(req.headers.authorization);
    const transactions: AggregatedTransactionType[] | null = await Transaction.aggregate([
      {$match: {userId}},
      {
        $match: {
          createdAt: {
            $gte: moment(from).startOf(MomentConstants.DAY).toDate(),
            $lt: moment(to).endOf(MomentConstants.DAY).toDate()
          }
        }
      },
      {$unwind: '$events'},
      {$match: {'events.type': `${type.toLowerCase()}`}}
    ]);
    const eventsArray: TransactionEvent[] = [];

    transactions.forEach((transaction) => {
      filters.forEach((filter) => {
        transaction.events.account === filter.value && eventsArray.push(transaction.events);
      });
    });
    return res.json(eventsArray);
  } catch (error) {
    return res.json(error.message);
  }
};

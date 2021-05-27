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
    const {from, to} = req.params;
    const {type} = req.params;
    const filters: {label: string; value: string}[] = req.body;
    const userId: string = tokenDecoder(req.headers.authorization);
    const transactions: AggregatedTransactionType[] | null =
      type.toLowerCase() === 'income & expense'
        ? await Transaction.aggregate([
            {$match: {userId}},
            {
              $match: {
                createdAt: {
                  $gte: moment(from).startOf(MomentConstants.DAY).toDate(),
                  $lt: moment(to).endOf(MomentConstants.DAY).toDate()
                }
              }
            },
            {$unwind: '$events'}
          ])
        : await Transaction.aggregate([
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

    transactions.forEach(({events}) => {
      delete events._id;
      delete events.transferId;
      delete events.to;
      delete events.from;
      events.date = moment(events.date).format('MMMM Do YYYY');
      events.amount = events.amount / 100;
      filters.forEach((filter) => {
        events.account === filter.value && eventsArray.push(events);
      });
    });

    return res.json(eventsArray);
  } catch (error) {
    return res.json(error.message);
  }
};

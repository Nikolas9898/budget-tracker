import {RequestHandler, Request, Response} from 'express';
import moment from 'moment';
import {tokenDecoder} from '../../helpers/tokenDecoder';
import Transaction from '../../dbModels/transaction/transaction.model';
import {ExportEvent, MomentConstants, TransactionEvent} from '../../models/transactions';
import {AggregatedTransactionType, EXPENSE_OR_INCOME, Filters} from '../../models/export';
import {transformIntoEventsArray} from '../../helpers/exportHelpers/exportHelpers';

export const exportTransactionByFilters: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {from, to} = req.params;
    const {type} = req.params;
    const filters: Filters[] = req.body;
    const userId: string = tokenDecoder(req.headers.authorization);
    const transactions: AggregatedTransactionType[] | null =
      type.toLowerCase() === EXPENSE_OR_INCOME
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
    const eventsArray: ExportEvent[] = [];

    transformIntoEventsArray(eventsArray, transactions, filters);

    return res.json(eventsArray);
  } catch (error) {
    return res.json(error.message);
  }
};

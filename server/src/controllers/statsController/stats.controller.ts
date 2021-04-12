import {RequestHandler, Request, Response} from 'express';
import moment from 'moment';
import {tokenDecoder} from '../../helpers/tokenDecoder';
import Transaction from '../../models/transaction/transaction.model';
import {SumStats} from '../../interfaces/stats';
import {EventTypes, MomentConstants} from '../../interfaces/transactions';

export const getStats: RequestHandler = async (req: Request, res: Response) => {
  const userId = tokenDecoder(req.headers.authorization);
  const {from, to} = req.params;

  try {
    const transactions = await Transaction.find({
      userId,
      createdAt: {
        $gte: moment(from).startOf(MomentConstants.DAY).toDate(),
        $lt: moment(to).endOf(MomentConstants.DAY).toDate()
      }
    });
    const income: any = {};
    const expense: any = {};
    const incomeStats: SumStats[] = [];
    const expenseStats: SumStats[] = [];

    transactions.forEach((transaction) => {
      transaction.events.forEach(({category, amount, type}) => {
        if (type === EventTypes.INCOME && category) {
          income[category] = income[category] + amount || amount;
        }

        if (type === EventTypes.EXPENSE && category) {
          expense[category] = expense[category] + amount || amount;
        }
      });
    });

    Object.keys(income).forEach((key) => {
      incomeStats.push({category: key, value: income[key]});
    });
    Object.keys(expense).forEach((key) => {
      expenseStats.push({category: key, value: expense[key]});
    });

    return res.json({incomeStats, expenseStats});
  } catch (error) {
    return res.json(error);
  }
};

import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import Transaction from "../../models/transaction/transaction.model";
import moment from "moment";
import { SumStats } from "../../interfaces/stats";
import { eventTypes, momentConstants } from "../../interfaces/transactions";

export const getStats: RequestHandler = async (req: Request, res: Response) => {
  const userId = tokenDecoder(req.headers.authorization);

  const { from, to } = req.params;

  try {
    const transactions = await Transaction.find({
      userId,
      createdAt: {
        $gte: moment(from).startOf(momentConstants.day).toDate(),
        $lt: moment(to).endOf(momentConstants.day).toDate(),
      },
    });
    const income: any = {};
    const expense: any = {};
    let incomeStats: SumStats[] = [];
    let expenseStats: SumStats[] = [];
    transactions.forEach((transaction) => {
      transaction.events.forEach(({ category, amount, type }) => {
        if (type === eventTypes.income) {
          income[category!] = income[category!] + amount || amount;
        }

        if (type === eventTypes.expense) {
          expense[category!] = expense[category!] + amount || amount;
        }
      });
    });

    Object.keys(income).forEach((key) => {
      incomeStats.push({ category: key, value: income[key] });
    });
    Object.keys(expense).forEach((key) => {
      expenseStats.push({ category: key, value: expense[key] });
    });

    return res.json({ incomeStats, expenseStats });
  } catch (error) {
    return res.json(error);
  }
};

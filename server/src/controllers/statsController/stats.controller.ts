import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import Transaction from "../../models/transaction/transaction.model";

export const getStats: RequestHandler = async (req: Request, res: Response) => {
  const userId = tokenDecoder(req.headers.authorization);

  const { from, to } = req.params;

  try {
    const transactions = await Transaction.find({
      userId,
      createdAt: {
        $gte: new Date(new Date(from).setHours(0, 0, 0)),
        $lt: new Date(new Date(to).setHours(23, 59, 59)),
      },
    });
    const income: any = {};
    const expense: any = {};
    let incomeStats: { category: string; value: number }[] = [];
    let expenseStats: { category: string; value: number }[] = [];
    transactions.forEach((transaction) => {
      transaction.events.forEach(({ category, amount, type }) => {
        if (type === "income") {
          income[category!] = income[category!] + amount || amount;
        }

        if (type === "expense") {
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

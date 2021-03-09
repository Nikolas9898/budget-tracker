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
    const incomeStats: any = {};
    const expenseStats: any = {};
    transactions.forEach((transaction) => {
      transaction.events.forEach(({ category, amount, type }) => {
        if (type === "income") {
          incomeStats[category!] = incomeStats[category!] + amount || amount;
        }

        if (type === "expense") {
          expenseStats[category!] = expenseStats[category!] + amount || amount;
        }
      });
    });

    return res.json({ incomeStats, expenseStats });
  } catch (error) {
    return res.json(error);
  }
};

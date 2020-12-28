import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../middleware/tokenDecoder";
import Transaction, {
  TransactionInterface,
} from "../../models/transaction/transaction.model";

export const createTransfer: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const to = req.body.to;
  const type = req.body.type.toLowerCase();
  const from = req.body.from;
  const note = req.body.note;
  const fees = req.body.fees;
  const userId = req.body.userId;
  const amount = req.body.amount;
  const currency = req.body.currency;
  const category = req.body.category;
  const description = req.body.description;
  const createdAt = req.body.createdAt;

  const newTransfer = new Transaction({
    to,
    type,
    from,
    note,
    fees,
    userId,
    amount,
    currency,
    category,
    description,
    createdAt,
  });

  await newTransfer
    .save()
    .then(() => res.json(newTransfer))
    .catch((err) => {
      res.status(400).json({ errorMsg: err });
    });
};

export const createTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const type = req.params.type.toLowerCase();
  const note = req.body.note;
  const fees = req.body.fees;
  const userId = req.body.userId;
  const amount = req.body.amount;
  const currency = req.body.currency;
  const category = req.body.category;
  const description = req.body.description;
  const createdAt = req.body.createdAt;

  const newTransaction = new Transaction({
    type,
    note,
    fees,
    userId,
    amount,
    currency,
    category,
    description,
    createdAt,
  });

  await newTransaction
    .save()
    .then(() => res.json(newTransaction))
    .catch((err) => {
      res.status(400).json({ errorMsg: err });
    });
};

export const getTransactionInSpecificDatePeriod: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const from = req.body.from;
  const to = req.body.to;
  const userId = tokenDecoder(req.headers.authorization);

  if (from === "" || to === "") {
    return res.status(400).json({
      errorMSG: "Please ensure you pick two dates",
    });
  }

  await Transaction.find(
    {
      createdAt: {
        $gte: new Date(new Date(from).setHours(0o0, 0o0, 0o0)),
        $lt: new Date(new Date(to).setHours(23, 59, 59)),
      },
      userId,
    },
    (err: any, transaction: any) => {
      try {
        res.json(transaction);
      } catch (error) {
        res.status(400).json({ errorMsg: error });
      }
    }
  );
};

export const getTransactionById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const userId = tokenDecoder(req.headers.authorization);

  const transaction = await Transaction.findOne({ _id: id, userId: userId });

  console.log(transaction);
};

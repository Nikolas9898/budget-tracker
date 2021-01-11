import { RequestHandler, Request, Response } from "express";
import { tokenDecoder } from "../../middleware/tokenDecoder";
import Transaction, {
  TransactionInterface,
} from "../../models/transaction/transaction.model";

export const createTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = tokenDecoder(req.headers.authorization);
  const events = req.body.events;
  const createdAt = req.body.createdAt;

  const transaction: any = await Transaction.findOne({
    createdAt: createdAt,
    userId,
  });

  if (!transaction) {
    let expense = 0;
    let income = 0;
    events.map((event: any) => {
      if (event.type.toLowerCase() === "income") {
        income = income + event.amount;
      } else {
        expense = expense + event.amount;
      }
    });

    const newTransaction = new Transaction({
      events,
      createdAt,
      userId,
      expense,
      income,
    });

    await newTransaction
      .save()
      .then(() => res.json(newTransaction))
      .catch((err) => {
        res.status(400).json({ errorMsg: err });
      });
  } else {
    transaction.events.push(events[0]);
    let expense = 0;
    let income = 0;
    transaction.events.map((event: any) => {
      if (event.type.toLowerCase() === "income") {
        income = income + event.amount;
      } else {
        expense = expense + event.amount;
      }
    });

    transaction.income = income;
    transaction.expense = expense;

    try {
      transaction.save();
      res.json(transaction);
    } catch (error) {
      res.json({ errorMSG: error });
    }
  }

  // const to = req.body.to;
  // const type = req.params.type.toLowerCase();
  // const from = req.body.from;
  // const note = req.body.note;
  // const fees = req.body.fees;
  // const userId = req.body.userId;
  // const amount = req.body.amount;
  // const currency = req.body.currency;
  // const category = req.body.category;
  // const description = req.body.description;

  // const newTransaction = new Transaction({
  //   to,
  //   type,
  //   from,
  //   note,
  //   fees,
  //   userId,
  //   amount,
  //   currency,
  //   category,
  //   description,
  //   createdAt,
  // });

  // await newTransaction
  //   .save()
  //   .then(() => res.json(newTransaction))
  //   .catch((err) => {
  //     res.status(400).json({ errorMsg: err });
  //   });
};

export const getTransactionInSpecificDatePeriod: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const from = req.params.from;
  const to = req.params.to;
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

  Transaction.findOne(
    { _id: id, userId },
    (err: any, transaction: TransactionInterface) => {
      try {
        if (!transaction) {
          let error = "No such transaction available";
          return res.status(400).json({ errorMsg: error });
        }
        res.json(transaction);
      } catch (error) {
        res.status(400).json({ errorMsg: error });
      }
    }
  );
};

export const deleteTransactionById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const userId = tokenDecoder(req.headers.authorization);

  const transaction = Transaction.findOneAndDelete(
    { _id: id, userId },
    (err) => {
      if (err) {
        return res.json({ errorMsg: err });
      } else {
        let msg = "Deleted successfully";
        return res.status(400).json({ msg });
      }
    }
  );
};

export const editTransaction = async (req: Request, res: Response) => {
  const id: any = req.params.id;

  const type = req.body.type.toLowerCase();
  const fees = req.body.fees;
  const note = req.body.note;
  const amount = req.body.amount;
  const from = req.body.from;
  const to = req.body.to;
  const currency = req.body.currency;
  const category = req.body.category;
  const description = req.body.description;
  const createdAt = req.body.createdAt;

  const userId = tokenDecoder(req.headers.authorization);

  const transaction: any = await Transaction.findOne({
    _id: id,
  });

  if (!transaction) {
    let error = "No such transaction available";
    return res.status(400).json({ errorMsg: error });
  }

  if (transaction.userId !== userId) {
    return res.status(400).json({
      errorMsg: "You are not authorized to update other people tranzactions",
    });
  }

  if (type == "transfer") {
    transaction.type = type;
    transaction.from = from;
    transaction.to = to;
    transaction.fees = fees;
    transaction.note = note;
    transaction.amount = amount;
    transaction.currency = currency;
    transaction.category = category;
    transaction.description = description;
    transaction.createdAt = createdAt;
  } else {
    transaction.type = type;
    transaction.fees = fees;
    transaction.note = note;
    transaction.from = "";
    transaction.to = "";
    transaction.amount = amount;
    transaction.currency = currency;
    transaction.category = category;
    transaction.description = description;
    transaction.createdAt = createdAt;
  }

  await transaction.save();

  res.json("Update successful");
};

export const getYearlyAndWeekly = async (req: Request, res: Response) => {};

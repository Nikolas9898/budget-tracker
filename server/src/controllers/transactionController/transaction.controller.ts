import { Months, Month } from "../../interfaces/monthInterface";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import { RequestHandler, Request, Response } from "express";
import TransactionInterface, {
  TransactionEvent,
} from "../../interfaces/transactions";
import Transaction from "../../models/transaction/transaction.model";
import { calculateTotalExpenseAndIncome } from "../../helpers/calculateTotalExpenseAndIncome";
import {
  createOrdinaryEvent,
  createTransferWithFees,
} from "../../helpers/transactionHelpers/transactionHelpers";

export const createTransaction: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = tokenDecoder(req.headers.authorization);
  const events = req.body.events;
  const createdAt = req.body.createdAt;

  const transaction = await Transaction.findOne({
    createdAt: createdAt,
    userId,
  });

  let income = 0;
  let expense = 0;

  if (!transaction) {
    //Here it enters when transaction is not found then check if it is tansfer

    if (events[0].fees && events[0].fees > 0) {
      // here it makes expense and transfer

      const transfer = createTransferWithFees(
        events,
        createdAt,
        userId,
        income,
        expense
      );

      return await transfer
        .save()
        .then(() => res.json(transfer))
        .catch((err) => res.json(err));
    } else {
      //here enters when there are not fees and just ordinary event is sent

      const transaction = createOrdinaryEvent(
        events,
        createdAt,
        userId,
        income,
        expense
      );

      return await transaction
        .save()
        .then(() => res.json(transaction))
        .catch((error) => res.json(error));
    }
  } else {
    //It enters here when there is found transaction on the same date and it needs to push in this transaction events
    if (events[0].fees && events[0].fees > 0) {
      const transfer = createTransferWithFees(
        events,
        createdAt,
        userId,
        income,
        expense
      );

      transaction.events.push(transfer.events[0]);
      transaction.events.push(transfer.events[1]);

      calculateTotalExpenseAndIncome(transaction, income, expense);

      return await transaction.save().then(() => res.json(transaction));
    } else {
      //here is when there is transaction but the event is ordinary without fees
      transaction.events.push(events[0]);

      calculateTotalExpenseAndIncome(transaction, income, expense);

      return await transaction.save().then(() => res.json(transaction));
    }
  }
};

export const getTransactionInSpecificDatePeriod: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const from = req.params.from;
  const to = req.params.to;
  const userId = tokenDecoder(req.headers.authorization);

  let sumExpense = 0;
  let sumIncome = 0;

  if (from === "" || to === "") {
    return res.status(400).json({
      errorMSG: "Please ensure you pick two dates",
    });
  }

  Transaction.find(
    {
      createdAt: {
        $gte: new Date(new Date(from).setHours(0, 0, 0)),
        $lt: new Date(new Date(to).setHours(23, 59, 59)),
      },
      userId,
    },
    (err, transactions) => {
      try {
        transactions.map((transaction: TransactionInterface) => {
          sumExpense += transaction.expense;
          sumIncome += transaction.income;
        });

        return res.json({ transactions, sumExpense, sumIncome });
      } catch (error) {
        return res.status(400).json({ errorMsg: error });
      }
    }
  );
};

export const getTransactionById = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const userId: string = tokenDecoder(req.headers.authorization);

  Transaction.findOne(
    { _id: id, userId },
    (err, transaction: TransactionInterface) => {
      try {
        if (!transaction) {
          return res
            .status(400)
            .json({ errorMsg: "No such transaction available" });
        }
        return res.json(transaction);
      } catch (error) {
        return res.status(400).json({ errorMsg: err });
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

  const transaction = await Transaction.findOne({
    _id: id,
    userId,
  });

  try {
    if (transaction) {
      transaction.remove();
      return res.json({ msg: "Deleted successfullu" });
    }
  } catch (error) {
    res.json({ errroMsg: error });
  }
};

// Edits specifid transaction event

export const editTransactionEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.transactionId;
  const event_id = req.params.event_id;
  const eventFromBody = req.body;

  const {
    type,
    fees,
    from,
    currency,
    date,
    to,
    amount,
    description,
    note,
    category,
    account,
    transferId,
  } = eventFromBody;

  const userId = tokenDecoder(req.headers.authorization);
  let expense = 0;
  let income = 0;

  try {
    const transaction: any = await Transaction.findOne({
      _id: id,
      userId,
    });
    if (type.toString() === "transfer") {
      transaction.events.map((oldEvent: any) => {
        if (oldEvent._id.toString() === event_id.toString()) {
          if (oldEvent.type !== "transfer" && type === "transfer" && fees > 0) {
            transaction.events.push({
              transferId: oldEvent._id,
              type: "expense",
              currency: "BG",
              date: oldEvent.date,
              category: "other",
              account: from,
              amount: fees,
              note: "fees",
              description: oldEvent.description,
            });
          }

          if (oldEvent.fees === 0 || (oldEvent.fees === null && fees > 0)) {
            transaction.events.push({
              transferId: oldEvent._id,
              type: "expense",
              currency: "BG",
              date: oldEvent.date,
              category: "other",
              account: oldEvent.from,
              amount: fees,
              note: "fees",
              description: oldEvent.description,
            });
          }

          oldEvent.type = type;
          oldEvent.currency = currency;
          oldEvent.date = date;
          oldEvent.from = from;
          oldEvent.category = null;
          oldEvent.account = null;
          oldEvent.fees = fees;
          oldEvent.to = to;
          oldEvent.amount = amount;
          oldEvent.description = description;
          oldEvent.note = note;
        }

        if (oldEvent.transferId === event_id) {
          oldEvent.amount = fees;
        }
      });

      calculateTotalExpenseAndIncome(transaction, income, expense);

      await transaction.save().then(() => {
        return res.json(transaction);
      });
    } else {
      if (transferId) {
        Promise.all(
          transaction.events.map((oldEvent: any) => {
            if (oldEvent._id.toString() === event_id) {
              oldEvent.amount = amount;
              oldEvent.type = type;
              oldEvent.currency = currency;
              oldEvent.date = date;
              oldEvent.category = category;
              oldEvent.account = account;
              oldEvent.note = note;
              oldEvent.description = description;
            }

            if (oldEvent._id.toString() === event_id && type === "income") {
              oldEvent.amount = amount;
              oldEvent.type = type;
              oldEvent.transferId = "";
              oldEvent.currency = currency;
              oldEvent.date = date;
              oldEvent.category = category;
              oldEvent.account = account;
              oldEvent.note = note;
              oldEvent.description = description;
            }

            if (oldEvent._id.toString() === transferId) {
              if (type === "income") {
                oldEvent.fees = 0;
              } else {
                oldEvent.fees = amount;
              }
            }
          })
        ).then(async () => {
          calculateTotalExpenseAndIncome(transaction, income, expense);

          await transaction.save().then(() => {
            return res.json(transaction);
          });
        });
      } else {
        let foundIndex = transaction.events.findIndex(
          (foundEvent: any) => foundEvent._id.toString() === event_id.toString()
        );
        transaction.events.splice(foundIndex, 1, eventFromBody);
        calculateTotalExpenseAndIncome(transaction, income, expense);
        await transaction.save().then(() => {
          return res.json(transaction);
        });
      }
    }
  } catch (error) {
    return res.json({ errorMsg: error });
  }
};

// delete specific transaction event

export const deleteTransactionEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.transactionId;
  const event_id = req.params.event_id;
  const userId = tokenDecoder(req.headers.authorization);

  try {
    const transaction = await Transaction.findOne({
      _id: id,
      userId,
    });

    if (transaction === null) {
      return res.json({
        errorMsg: "Not authorized or transaction does not exist",
      });
    } else {
      if (transaction.events.length === 1) {
        try {
          transaction.remove();
          return res.json({ msg: "Deleted successfullu" });
        } catch (error) {
          return res.json({ errroMsg: error });
        }
      }

      let expense = 0;
      let income = 0;
      const newEvents = transaction.events.filter(
        (event: TransactionEvent) => event._id != event_id
      );

      transaction.events = newEvents;

      calculateTotalExpenseAndIncome(transaction, income, expense);

      transaction.expense = expense;
      transaction.income = income;

      transaction.save();
      return res.json(transaction);
    }
  } catch (error) {
    return res.json({ errorMsg: error });
  }
};

export const getYearlyAndWeekly = async (req: Request, res: Response) => {
  const userId = tokenDecoder(req.headers.authorization);

  let months: Months = req.body;

  let sumExpense = 0;
  let sumIncome = 0;

  Promise.all(
    months.map(async (month: Month, index) => {
      Promise.all(
        await Transaction.find({
          createdAt: {
            $gte: new Date(new Date(month.from).setHours(0, 0, 0)),
            $lt: new Date(new Date(month.to).setHours(23, 59, 59)),
          },
          userId,
        })
      ).then((transactions) => {
        try {
          transactions.forEach(({ expense, income }) => {
            months[index].expense += expense;
            months[index].income += income;
          });
        } catch (error) {
          res.status(400).json({ errorMsg: error });
        }
      });
    })
  ).then(() => {
    months.forEach(({ expense, income }) => {
      sumExpense += expense;
      sumIncome += income;
    });

    return res.json({ months, sumExpense, sumIncome });
  });
};

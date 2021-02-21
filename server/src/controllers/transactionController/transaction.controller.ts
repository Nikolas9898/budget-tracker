import { Months, Month } from "../../interfaces/month";
import { tokenDecoder } from "../../helpers/tokenDecoder";
import { RequestHandler, Request, Response } from "express";
import ITransaction, {
  Expense,
  ITransactionEvent,
} from "../../interfaces/transactions";
import Transaction from "../../models/transaction/transaction.model";
import { calculateTotalExpenseAndIncome } from "../../helpers/calculateTotalExpenseAndIncome";
import {
  createOrdinaryEvent,
  saveAndSendResponse,
  createTransferWithFees,
  deleteTransaction,
  removeITransactionEvent,
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

      saveAndSendResponse(transfer, res);
    } else {
      //here enters when there are not fees and just ordinary event is sent

      const transaction = createOrdinaryEvent(
        events,
        createdAt,
        userId,
        income,
        expense
      );

      saveAndSendResponse(transaction, res);
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

      saveAndSendResponse(transaction, res);
    } else {
      //here is when there is transaction but the event is ordinary without fees
      transaction.events.push(events[0]);

      calculateTotalExpenseAndIncome(transaction, income, expense);

      saveAndSendResponse(transaction, res);
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
        transactions.forEach((transaction: ITransaction) => {
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

export const getTransactionById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;

  const userId: string = tokenDecoder(req.headers.authorization);

  Transaction.findOne({ _id: id, userId }, (err, transaction: ITransaction) => {
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
  });
};

export const deleteTransactionById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const userId = tokenDecoder(req.headers.authorization);
  try {
    const transaction = await Transaction.findOne({
      _id: id,
      userId,
    });

    if (transaction) {
      transaction.remove();
      return res.json({ msg: "Deleted successfullu" });
    }
  } catch (error) {
    res.json({ errroMsg: error });
  }
};

// Edits specifid transaction event

export const editITransactionEvent: RequestHandler = async (
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
    let transaction: any;

    try {
      transaction = await Transaction.findOne({
        _id: id,
        userId,
      });
    } catch (error) {
      return res.json({ error });
    }

    if (type === "transfer") {
      // when eventFrom body is transfer
      transaction.events.map((oldEvent: ITransactionEvent) => {
        if (oldEvent._id?.toString() === event_id.toString()) {
          // when editing income or expense into transfer with fees
          if (oldEvent.type !== "transfer" && type === "transfer" && fees > 0) {
            transaction.events.push({
              transferId: oldEvent._id,
              type: Expense.type,
              currency: Expense.currency,
              date: oldEvent.date,
              category: Expense.category,
              account: from,
              amount: fees,
              note: Expense.note,
              description: oldEvent.description,
            });
          }
          //when editing transfer withouth fees into transfer with fees
          if (oldEvent.fees === 0 || (oldEvent.fees === null && fees > 0)) {
            transaction.events.push({
              transferId: oldEvent._id,
              type: Expense.type,
              currency: Expense.currency,
              date: oldEvent.date,
              category: Expense.category,
              account: from,
              amount: fees,
              note: Expense.note,
              description: oldEvent.description,
            });
          }

          oldEvent.type = type;
          oldEvent.currency = currency;
          oldEvent.date = date;
          oldEvent.from = from;
          oldEvent.category = undefined;
          oldEvent.account = undefined;
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

      saveAndSendResponse(transaction, res);
    } else {
      if (transferId) {
        Promise.all(
          transaction.events.map((oldEvent: ITransactionEvent) => {
            if (oldEvent._id?.toString() === event_id) {
              oldEvent.amount = amount;
              oldEvent.type = type;
              oldEvent.currency = currency;
              oldEvent.date = date;
              oldEvent.category = category;
              oldEvent.account = account;
              oldEvent.note = note;
              oldEvent.description = description;
            }

            if (oldEvent._id?.toString() === event_id && type === "income") {
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

            if (oldEvent._id?.toString() === transferId) {
              if (type === "income") {
                oldEvent.fees = 0;
              } else {
                oldEvent.fees = amount;
              }
            }
          })
        ).then(async () => {
          calculateTotalExpenseAndIncome(transaction, income, expense);

          saveAndSendResponse(transaction, res);
        });
      } else {
        const foundIndex = transaction.events.findIndex(
          (foundEvent: ITransactionEvent) =>
            foundEvent._id?.toString() === event_id.toString()
        );
        transaction.events.splice(foundIndex, 1, eventFromBody);
        calculateTotalExpenseAndIncome(transaction, income, expense);

        saveAndSendResponse(transaction, res);
      }
    }
  } catch (error) {
    return res.json({ errorMsg: error });
  }
};

// delete specific transaction event

export const deleteITransactionEvent: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const id = req.params.transactionId;
  const event_id = req.params.event_id;
  const userId = tokenDecoder(req.headers.authorization);
  let transaction: ITransaction | null;

  try {
    transaction = await Transaction.findOne({
      _id: id,
      userId,
    });
  } catch (error) {
    return res.json({ errorMsg: error });
  }

  if (transaction === null) {
    return res.json({
      errorMsg: "Not authorized or transaction does not exist",
    });
  }

  if (transaction.events.length === 1) {
    return deleteTransaction(transaction, res);
  }

  return removeITransactionEvent(res, transaction, event_id);
};

export const getYearlyAndWeekly: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userId = tokenDecoder(req.headers.authorization);

  const months: Months = req.body;

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

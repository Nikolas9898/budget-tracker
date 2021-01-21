import { RequestHandler, Request, Response } from "express";
import { env } from "process";
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

  let income = 0;
  let expense = 0;

  if (!transaction) {
    //Here it enters when transaction is not found then check if it is tansfer

    if (events[0].fees && events[0].fees > 0) {
      // here it makes expense and transfer
      let transfer: any = new Transaction({
        events,
        createdAt,
        userId,
        expense: 0,
        income: 0,
      });

      let expenseEvent = {
        transferId: transfer.events[0]._id,
        type: "expense",
        currency: "BG",
        date: transfer.events[0].date,
        category: "other",
        account: transfer.events[0].from,
        amount: transfer.events[0].fees,
        note: "fees",
        description: transfer.events[0].description,
      };

      transfer.events.push(expenseEvent);

      Promise.all(
        transfer.events.map((event: any) => {
          if (event.type.toLowerCase() === "income") {
            income += event.amount;
          }
          if (event.type.toLowerCase() === "expense") {
            expense += event.amount;
          }
        })
      ).then(() => {
        transfer.income = income;
        transfer.expense = expense;
      });

      return await transfer
        .save()
        .then(() => res.json(transfer))
        .catch((err: any) => res.json(err));
    } else {
      //here enters when there are not fees and just ordinary event is sent
      events.map((event: any) => {
        if (event.type.toLowerCase() === "income") {
          income += event.amount;
        }
        if (event.type.toLowerCase() === "expense") {
          expense += event.amount;
        }
      });

      let transaction = new Transaction({
        events,
        createdAt,
        userId,
        income,
        expense,
      });

      return await transaction
        .save()
        .then(() => res.json(transaction))
        .catch((error) => res.json(error));
    }
  } else {
    //It enters here when there is found transaction on the same date and it needs to push in this transaction events
    if (events[0].fees && events[0].fees > 0) {
      let transfer: any = new Transaction({
        events,
        createdAt,
        userId,
        expense: 0,
        income: 0,
      });

      let expenseEvent = {
        transferId: transfer.events[0]._id,
        type: "expense",
        currency: "BG",
        date: transfer.events[0].date,
        category: "other",
        account: transfer.events[0].from,
        amount: transfer.events[0].fees,
        note: "fees",
        description: transfer.events[0].description,
      };
      transfer.events.push(expenseEvent);

      transaction.events.push(transfer.events[0]);
      transaction.events.push(transfer.events[1]);

      Promise.all(
        transaction.events.map((event: any) => {
          if (event.type.toLowerCase() === "income") {
            income += event.amount;
          }
          if (event.type.toLowerCase() === "expense") {
            expense += event.amount;
          }
        })
      ).then(async () => {
        transaction.income = income;
        transaction.expense = expense;

        return await transaction.save().then(() => res.json(transaction));
      });
    } else {
      //here is when there is transaction but the event is ordinary without fees
      transaction.events.push(events[0]);

      Promise.all(
        transaction.events.map((event: any) => {
          if (event.type.toLowerCase() === "income") {
            income += event.amount;
          }
          if (event.type.toLowerCase() === "expense") {
            expense += event.amount;
          }
        })
      ).then(async () => {
        transaction.income = income;
        transaction.expense = expense;

        return await transaction.save().then(() => res.json(transaction));
      });
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
        $gte: new Date(new Date(from).setHours(0o0, 0o0, 0o0)),
        $lt: new Date(new Date(to).setHours(23, 59, 59)),
      },
      userId,
    },
    (err: any, transactions: any) => {
      try {
        transactions.map((month: any) => {
          sumExpense += month.expense;
          sumIncome += month.income;
        });

        res.json({ transactions, sumExpense, sumIncome });
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

  const transaction: any = await Transaction.findOne({
    _id: id,
    userId,
  });

  try {
    transaction.remove();
    res.json({ msg: "Deleted successfullu" });
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
  const oldEvent_id = req.params.event_id;
  const eventFromBody = req.body;
  const userId = tokenDecoder(req.headers.authorization);
  let expense = 0;
  let income = 0;

  try {
    const transaction: any = await Transaction.findOne({
      _id: id,
      userId,
    });
    if (eventFromBody.type.toString() === "transfer") {
      //   let counter = 0;
      //   transaction.events.map((foundEvent: any, index: number) => {
      //     if (event_id === foundEvent.transferId) {
      //       counter = index;
      //     }
      //   });
      // let transferIndex = transaction.events.findIndex(
      //   (foundEvent: any) =>
      //     foundEvent._id.toString() === oldEvent_id.toString()
      // );
      // transaction.events.splice(transferIndex, 1, event);

      transaction.events.map((event: any) => {
        if (event._id.toString() === oldEvent_id.toString()) {
          console.log("vlezna li bre");
          event.type = eventFromBody.type;
          event.currency = eventFromBody.currency;
          event.date = eventFromBody.date;
          event.from = eventFromBody.from;
          event.fees = eventFromBody.fees;
          event.to = eventFromBody.to;
          event.amount = eventFromBody.amount;
          event.description = eventFromBody.description;
          event.note = eventFromBody.note;
        }
      });

      await transaction.save().then(() => {
        return res.json(transaction);
      });
      // await transaction.save();

      //   console.log("stiga")
      //   transaction.events[counter].amount = event.fees;
      //   transaction.events[counter].transferId = event_id;
      //   Promise.all(
      //     transaction.events.map((event: any) => {
      //       if (event.type.toLowerCase() === "income") {
      //         income += event.amount;
      //       }
      //       if (event.type.toLowerCase() === "expense") {
      //         expense += event.amount;
      //       }
      //     })
      //   ).then(() => {
      //     transaction.income = income;
      //     transaction.expense = expense;
      //     transaction.save().then(() => {
      //       return res.json(transaction);
      //     });
      //   });
      // } else if (event.type === "expense" && event.transferId) {
      //   console.log("tova e else if");
      //   let counter = 0;
      //   transaction.events.findIndex((foundEvent: any, index: number) => {
      //     if (foundEvent._id.toString() === event.transferId) {
      //       counter = index;
      //     }
      //   });
      //   let transfer = transaction.events.findIndex(
      //     (foundEvent: any) => foundEvent._id.toString() === event_id.toString()
      //   );
      //   transaction.events.splice(transfer, 1, event);
      //   transaction.events[counter].fees = event.amount;
      //   Promise.all(
      //     transaction.events.map((event: any) => {
      //       if (event.type.toLowerCase() === "income") {
      //         income += event.amount;
      //       }
      //       if (event.type.toLowerCase() === "expense") {
      //         expense += event.amount;
      //       }
      //     })
      //   ).then(() => {
      //     transaction.income = income;
      //     transaction.expense = expense;
      //     transaction.save().then(() => {
      //       return res.json(transaction);
      //     });
      //   });
    }
    if (eventFromBody.type === "expense" || eventFromBody.type === "income") {
      let foundIndex = transaction.events.findIndex(
        (foundEvent: any) =>
          foundEvent._id.toString() === oldEvent_id.toString()
      );
      transaction.events.splice(foundIndex, 1, eventFromBody);
      Promise.all(
        transaction.events.map((event: any) => {
          if (event.type.toLowerCase() === "income") {
            income += event.amount;
          }
          if (event.type.toLowerCase() === "expense") {
            expense += event.amount;
          }
        })
      ).then(async () => {
        transaction.income = income;
        transaction.expense = expense;
        await transaction.save().then(() => {
          return res.json(transaction);
        });
      });
    }
  } catch (error) {
    res.json({ errorMsg: error });
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
    const transaction: any = await Transaction.findOne({
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
        (event: any) => event._id != event_id
      );

      newEvents.map((event: any) => {
        if (event.type.toLowerCase() === "income") {
          income += event.amount;
        }
        if (event.type.toLowerCase() === "expense") {
          expense += event.amount;
        }
      });
      transaction.expense = expense;
      transaction.income = income;
      transaction.events = newEvents;

      transaction.save();
      res.json(transaction);
    }
  } catch (error) {
    res.json({ errorMsg: error });
  }
};

export const getYearlyAndWeekly = async (req: Request, res: Response) => {
  const userId = tokenDecoder(req.headers.authorization);

  const months = req.body;
  let sumExpense = 0;
  let sumIncome = 0;

  Promise.all(
    months.map(async (month: any, index: number) => {
      Promise.all(
        await Transaction.find(
          {
            createdAt: {
              $gte: new Date(new Date(month.from).setHours(0o0, 0o0, 0o0)),
              $lt: new Date(new Date(month.to).setHours(23, 59, 59)),
            },
            userId,
          }
          // async (err: any, transactions: any) => {
          //   try {
          //     transactions.map((transaction: any) => {
          //       months[index].expense += transaction.expense;
          //       months[index].income += transaction.income;
          //     });
          //   } catch (error) {
          //     res.status(400).json({ errorMsg: error });
          //   }
          // }
        )
      ).then((transactions) => {
        try {
          transactions.map((transaction: any) => {
            months[index].expense += transaction.expense;
            months[index].income += transaction.income;
          });
        } catch (error) {
          res.status(400).json({ errorMsg: error });
        }
      });
    })
  ).then(() => {
    months.map((month: any) => {
      sumExpense += month.expense;
      sumIncome += month.income;
    });

    res.json({ months, sumExpense, sumIncome });
  });
};

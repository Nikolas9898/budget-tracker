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

  if (events[0].type === "transfer" && events[0].fees > 0) {

    if (transaction === null) {
      events[0] = {
        ...events[0],
        note: "",
      };
      events.push({
        type: "expense",
        currency: "BG",
        date: events[0].date,
        category: "other",
        account: events[0].from,
        amount: events[0].fees,
        note: events[0].note,
        description: events[0].description,
      });
    } else {
      transaction.events.push({
        ...events[0],
        note: "",
      });
      transaction.events.push({
        type: "expense",
        currency: "BG",
        date: events[0].date,
        category: "other",
        account: events[0].from,
        amount: events[0].fees,
        note: events[0].note,
        description: events[0].description,
      });
    }
  }

  if (!transaction) {
    let expense = 0;
    let income = 0;
    events.map((event: any) => {
      if (event.type.toLowerCase() === "income") {
        income += event.amount;
      }
      if (event.type.toLowerCase() === "expense") {
        expense += event.amount;
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
    let expense = 0;
    let income = 0;
    if(events[0].fees ===0||events[0].type!=="transfer"){
      transaction.events.push(events[0]);
    }


    transaction.events.map((event: any) => {
      if (event.type.toLowerCase() === "income") {
        income += event.amount;
      }
      if (event.type.toLowerCase() === "expense") {
        expense += event.amount;
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
  const event_id = req.params.event_id;
  const event = req.body;
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
      let newEvents = transaction.events;

      let oldIndex = newEvents.findIndex(
        (ev: any) => ev._id.toString() === event_id.toString()
      );


      await newEvents.splice(oldIndex, 1, event);

      if(event.type!=="transfer"&&newEvents[oldIndex-1].type==="transfer"){
        newEvents[oldIndex-1].fees=event.amount
      }

      if (event.type === "transfer"&&event.fees>0&& event.type !== newEvents[oldIndex].type) {
        newEvents.splice(oldIndex+1, 0, {
          type: "expense",
          currency: "BG",
          date: event.date,
          category: "other",
          account: event.from,
          amount: event.fees,
          note: event.note,
          description: event.description,
        });
      }

      if (event.type === "transfer" && event.type === newEvents[oldIndex].type) {
        newEvents.splice(oldIndex+1, 1, {
          type: "expense",
          currency: "BG",
          date: event.date,
          category: "other",
          account: event.from,
          amount: event.fees,
          note: event.note,
          description: event.description,
        });
      }

      let expense = 0;
      let income = 0;
      await newEvents.map((event: any) => {
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

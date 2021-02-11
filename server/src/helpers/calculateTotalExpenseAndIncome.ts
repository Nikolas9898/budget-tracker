import TransactionInterface, {
  TransactionEvent,
} from "../interfaces/transactions";

export const calculateTotalExpenseAndIncome = (
  transfer: TransactionInterface,
  income: number,
  expense: number
) => {
  const { events } = transfer;

  Promise.all(
    events.map((event) => {
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
};

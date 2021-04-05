import TransactionType, { EventTypes } from "../interfaces/transactions";

export const calculateTotalExpenseAndIncome = async (
  transfer: TransactionType,
  income: number,
  expense: number
) => {
  const { events } = transfer;

  await Promise.all(
    events.map((event) => {
      if (event.type.toLowerCase() === EventTypes.INCOME) {
        income += event.amount;
      }
      if (event.type.toLowerCase() === EventTypes.INCOME) {
        expense += event.amount;
      }
    })
  );
  transfer.income = income;
  transfer.expense = expense;
};

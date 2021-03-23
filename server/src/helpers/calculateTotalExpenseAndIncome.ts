import ITransaction from "../interfaces/transactions";

export const calculateTotalExpenseAndIncome = async (
  transfer: ITransaction,
  income: number,
  expense: number
) => {
  const { events } = transfer;

  await Promise.all(
    events.map((event) => {
      if (event.type.toLowerCase() === "income") {
        income += event.amount;
      }
      if (event.type.toLowerCase() === "expense") {
        expense += event.amount;
      }
    })
  );
  transfer.income = income;
  transfer.expense = expense;
};

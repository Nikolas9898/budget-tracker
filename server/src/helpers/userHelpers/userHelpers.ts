import Category from "../../interfaces/category";
import ExpenseCategories from "../../models/category/expenseCategory";
import {
  dummyExpenseCategories,
  dummyIncomeCategories,
} from "../../interfaces/category";
import IncomeCategories from "../../models/category/incomeCategory";
export const addCategories = async (userId: string) => {
  try {
    const expenseCategories: Category = await new ExpenseCategories({
      userId,
      expenseCategories: dummyExpenseCategories,
    });
    const incomeCategories: Category = await new IncomeCategories({
      userId,
      dummyIncomeCategories,
    });

    expenseCategories.save();
    incomeCategories.save();
  } catch (error) {
    return error;
  }
};

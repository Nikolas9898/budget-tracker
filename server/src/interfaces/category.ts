import { Document } from "mongoose";

export default interface Category extends Document {
  userId: String;
  expenseCategories: CategoryArray[];
}

type CategoryArray = {
  name: string;
};

export const dummyExpenseCategories = [
  {
    name: "Food",
  },
  {
    name: "Culture",
  },
  {
    name: "Accounts",
  },
  {
    name: "Self-Development",
  },
  {
    name: "Transportation",
  },
  {
    name: "Household",
  },
  {
    name: "Apparel",
  },
  {
    name: "Beauty",
  },
  {
    name: "Health",
  },
  {
    name: "Education",
  },
  {
    name: "Gift",
  },
  {
    name: "Other",
  },
  {
    name: "Food",
  },
];

export const dummyIncomeCategories = [
  {
    name: "Allowance",
  },
  {
    name: "Salary",
  },
  {
    name: "Petty cash",
  },
  {
    name: "Bonus",
  },
  {
    name: "Other",
  },
];

import AddTransactionStyle from "../modules/transaction/components/addTransactionModal/AddTransactionStyle.module.css";
import { TransactionEvent } from "../models/Transaction";
import { Error } from "../models/Error";
import { Transaction, Transfer } from "../helpers/Variables";
export const validateTransaction = (value: TransactionEvent) => {
  let errors: Error = {
    account: "",
    from: "",
    category: "",
    to: "",
    amount: "",
    fees: "",
  };

  if (!value.account && value.type !== Transaction) {
    errors.account = "Please select an account";
  }

  if (value.type === Transfer && !value.from) {
    errors.from = "Please select from";
  }
  if (!value.category && value.type !== Transfer) {
    errors.category = "Please select a category";
  }
  if (value.type === Transfer && !value.to) {
    errors.to = "Please select to";
  }
  if (!value.amount) {
    errors.amount = "Please add an amount";
  }

  if (parseFloat(value.fees!) > parseFloat(value.amount)) {
    errors.fees = "Fees can't be greater then amount";
  }
  return errors;
};

export const errorMsg = (error: string) => {
  return (
    <>{error && <div className={AddTransactionStyle.error_msg}>{error}</div>}</>
  );
};

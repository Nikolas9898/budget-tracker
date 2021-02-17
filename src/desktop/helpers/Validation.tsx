import { State as StateTransaction } from "../modules/transaction/reducers/transactionReducer";

export const validateTransaction = (value: StateTransaction["transaction"]) => {
  let errors = {
    account: "",
    from: "",
    category: "",
    to: "",
    amount: "",
    fees: "",
  };

  if (value.account === "" && value.type !== "transfer") {
    errors.account = "Please select a account";
  }
  if (
    value.type === "transfer" &&
    (value.from === "" || value.from === undefined)
  ) {
    errors.from = "Please select  from";
  }
  if (value.category === "" && value.type !== "transfer") {
    errors.category = "Please select a category";
  }
  if (
    value.type === "transfer" &&
    (value.to === "" || value.to === undefined)
  ) {
    errors.to = "Please select  to";
  }
  if (value.amount === "") {
    errors.amount = "Please select a amount";
  }

  if (parseFloat(value.fees) > parseFloat(value.amount)) {
    errors.fees = "Fees can't be greater then amount";
  }
  return errors;
};

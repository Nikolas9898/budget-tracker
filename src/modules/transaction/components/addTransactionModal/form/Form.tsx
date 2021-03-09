import React, { useState } from "react";
import AddTransactionStyl from "../AddTransactionStyle.module.css";
import Moment from "moment";
import {
  TransactionEvent,
  Errors,
  HandleInput,
} from "../../../../../helpers/ITransactions";
import InputTitles from "./components/InputTitles";
import SelectInput from "./components/SelectInputs";
import FeesInput from "./components/FeesInput";
import AmountInput from "./components/AmountInput";

type Props = {
  transaction: TransactionEvent;
  errors: Errors;
  handleInputChange: (event: HandleInput) => void;
};
const Form: React.FC<Props> = ({ transaction, handleInputChange, errors }) => {
  const [feesIsOpen, setFeesIsOpen] = useState(false);
  const accounts = ["", "cash", "card", "accounts"];
  const categoriesIncome = [" ", "salary", "bonus", "petty cash", "other"];
  const categoriesExpense = [
    "",
    "food",
    "culture",
    "socialLife",
    "selfDevelopment",
    "transportation",
    "other",
  ];
  const selectOptions = (transactionType: string) => {
    if (transactionType === "transfer") {
      return accounts;
    } else {
      if (transactionType === "income") {
        return categoriesIncome;
      } else {
        return categoriesExpense;
      }
    }
  };
  return (
    <div className={AddTransactionStyl.content}>
      <InputTitles transaction={transaction} feesIsOpen={feesIsOpen} />
      <div className={AddTransactionStyl.content_inputs}>
        <div className={AddTransactionStyl.input_container}>
          {Moment(transaction.date).format("DD/M/Y(dd)")}
          {Moment(transaction.date).format("HH:HH")}
        </div>
        <SelectInput
          selectValue={
            transaction.type === "transfer"
              ? transaction.from
              : transaction.account
          }
          transactionType={transaction.type === "transfer" ? "from" : "account"}
          options={accounts}
          handleInputChange={handleInputChange}
          error={transaction.type === "transfer" ? errors.from : errors.account}
        />
        <SelectInput
          selectValue={
            transaction.type === "transfer"
              ? transaction.to
              : transaction.category
          }
          transactionType={transaction.type === "transfer" ? "to" : "category"}
          options={selectOptions(transaction.type)}
          handleInputChange={handleInputChange}
          error={transaction.type === "transfer" ? errors.to : errors.category}
        />
        <AmountInput
          transaction={transaction}
          handleInputChange={handleInputChange}
          setFeesIsOpen={setFeesIsOpen}
          feesIsOpen={feesIsOpen}
          error={errors.amount}
        />

        <FeesInput
          transaction={transaction}
          handleInputChange={handleInputChange}
          setFeesIsOpen={setFeesIsOpen}
          feesIsOpen={feesIsOpen}
        />

        <input
          type="text"
          className={AddTransactionStyl.input}
          name="note"
          value={transaction.note}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Form;

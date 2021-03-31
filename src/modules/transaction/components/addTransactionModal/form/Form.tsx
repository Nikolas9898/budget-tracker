import React, { useState } from "react";
import styles from "../AddTransactionStyle.module.css";
import Moment from "moment";
import { TransactionEvent } from "../../../../../models/Transaction";
import { HandleInput } from "../../../../../models/Function";
import { Error } from "../../../../../models/Error";
import { Transfer, Income, Expense } from "../../../../../helpers/Variables";
import InputTitles from "./components/InputTitles";
import SelectInput from "./components/SelectInputs";
import FeesInput from "./components/FeesInput";
import AmountInput from "./components/AmountInput";

type Props = {
  transaction: TransactionEvent;
  errors: Error;
  handleInputChange: (event: HandleInput) => void;
};
const Form: React.FC<Props> = ({ transaction, handleInputChange, errors }) => {
  const [isFeesOpen, setIsFeesOpen] = useState(false);
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
    if (transactionType === Transfer) {
      return accounts;
    } else {
      if (transactionType === Income) {
        return categoriesIncome;
      } else {
        return categoriesExpense;
      }
    }
  };
  return (
    <div className={styles.content}>
      <InputTitles transaction={transaction} isFeesOpen={isFeesOpen} />
      <div className={styles.content_inputs}>
        <div className={styles.input_container}>
          {Moment(transaction.date).format("DD/M/Y(dd)")}
          {Moment(transaction.date).format("HH:HH")}
        </div>
        <SelectInput
          selectValue={
            transaction.type === Transfer
              ? transaction.from
              : transaction.account
          }
          transactionType={transaction.type === Transfer ? "from" : "account"}
          options={accounts}
          handleInputChange={handleInputChange}
          error={transaction.type === Transfer ? errors.from : errors.account}
        />
        <SelectInput
          selectValue={
            transaction.type === Transfer
              ? transaction.to
              : transaction.category
          }
          transactionType={transaction.type === Transfer ? "to" : "category"}
          options={selectOptions(transaction.type)}
          handleInputChange={handleInputChange}
          error={transaction.type === Transfer ? errors.to : errors.category}
        />
        <AmountInput
          transaction={transaction}
          handleInputChange={handleInputChange}
          setIsFeesOpen={setIsFeesOpen}
          isFeesOpen={isFeesOpen}
          error={errors.amount}
        />

        <FeesInput
          transaction={transaction}
          handleInputChange={handleInputChange}
          setIsFeesOpen={setIsFeesOpen}
          isFeesOpen={isFeesOpen}
        />

        <input
          type="text"
          className={styles.input}
          name="note"
          value={transaction.note}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Form;

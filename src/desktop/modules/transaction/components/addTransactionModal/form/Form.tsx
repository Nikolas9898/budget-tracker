import React from "react";
import AddTransactionStyl from "../AddTransactionStyle.module.css";
import Moment from "moment";
import { State } from "../../../monthlyContainer/TransactionContainer";

type Props = {
  transaction: State["transaction"];
  errors: State["errors"];
  handleInputChange: (event: any) => void;
  isTransfer: boolean;
};
const Form: React.FC<Props> = ({
  transaction,
  handleInputChange,
  errors,
  isTransfer,
}) => {
  return (
    <div className={AddTransactionStyl.content}>
      <div className={AddTransactionStyl.content_titles}>
        <div className={AddTransactionStyl.title}>Day</div>
        {  transaction.type === "transfer" ? (
          <div className={AddTransactionStyl.title}>From</div>
        ) : (
          <div className={AddTransactionStyl.title}>Account</div>
        )}
        {  transaction.type === "transfer" ? (
          <div className={AddTransactionStyl.title}>To</div>
        ) : (
          <div className={AddTransactionStyl.title}>Category</div>
        )}
        <div className={AddTransactionStyl.title}>Amount</div>
        <div className={AddTransactionStyl.title}>Note</div>
      </div>

      <div className={AddTransactionStyl.content_inputs}>
        <div className={AddTransactionStyl.input_container}>

           {Moment(transaction.date).format("DD/M/Y(dd)")}
            {Moment(transaction.date).format("HH:HH")}
        </div>

        <div className={AddTransactionStyl.input_container}>
          <select
            className={AddTransactionStyl.input}
            value={
              transaction.type === "transfer"
                ? transaction.from
                : transaction.account
            }
            onChange={handleInputChange}
            name={transaction.type === "transfer" ? "from" : "account"}
          >
            <option value=""> </option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="accounts">Accounts</option>
          </select>
          {errors.account && (
            <div className={AddTransactionStyl.error_msg}>
              <span>{errors.account}</span>
            </div>
          )}
          {errors.from && (
              <div className={AddTransactionStyl.error_msg}>
                <span>{errors.from}</span>
              </div>
          )}
        </div>

        <div className={AddTransactionStyl.input_container}>
          <select
            className={AddTransactionStyl.input}
            value={
              transaction.type === "transfer"
                  ? transaction.to
                  : transaction.category
            }
            onChange={handleInputChange}
            name={transaction.type === "transfer" ? "to" : "category"}
          >
            {
              transaction.type==="transfer"?
                  <React.Fragment>
                    <option value=""> </option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="accounts">Accounts</option>
                  </React.Fragment>:
                  <React.Fragment>
                    {transaction.type==="expense"?
                        <React.Fragment>
                          <option value=""> </option>
                          <option value="food">Food</option>
                          <option value="culture">Culture</option>
                          <option value="socialLife">Accounts</option>
                          <option value="selfDevelopment">Self Development</option>
                          <option value="transportation">Transportation</option>
                          <option value="household">Household</option>
                          <option value="apparel">Apparel</option>
                          <option value="beauty">Beauty</option>
                          <option value="health">Health</option>
                          <option value="education">Education</option>
                          <option value="gift">Gift</option>
                          <option value="other">Other</option>
                        </React.Fragment>:
                        <React.Fragment>
                          <option value=""> </option>
                          <option value="salary">Salary</option>
                          <option value="other">Other</option>
                          <option value="bonus">Bonus</option>
                          <option value="petty cash">Petty cash</option>
                        </React.Fragment>
                    }
                  </React.Fragment>
            }

          </select>
          {errors.category && (
            <div className={AddTransactionStyl.error_msg}>
              <span>{errors.category}</span>
            </div>
          )}
          {errors.to && (
              <div className={AddTransactionStyl.error_msg}>
                <span>{errors.to}</span>
              </div>
          )}
        </div>

        <div className={AddTransactionStyl.input_container}>
          <input
            type="number"
            name="amount"
            className={AddTransactionStyl.input}
            value={transaction.amount}
            onChange={handleInputChange}
          />
          {errors.amount && (
            <div className={AddTransactionStyl.error_msg}>
              <span>{errors.amount}</span>
            </div>
          )}
        </div>

        <input type="text" className={AddTransactionStyl.input} />
      </div>
    </div>
  );
};

export default Form;

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
          {isTransfer ? (
            <div className={AddTransactionStyl.title}>From</div>
          ) : (
            <div className={AddTransactionStyl.title}>Account</div>
          )}
          {isTransfer ? (
            <div className={AddTransactionStyl.title}>To</div>
          ) : (
            <div className={AddTransactionStyl.title}>Category</div>
          )}
          <div className={AddTransactionStyl.title}>Amount</div>
          <div className={AddTransactionStyl.title}>Note</div>
        </div>

        <div className={AddTransactionStyl.content_inputs}>
          <div className={AddTransactionStyl.input_container}>
            <input
              type="text"
              className={AddTransactionStyl.input}
              value={Moment(transaction.date).format("DD/M/Y(dd)")}
            />
          </div>

          <div className={AddTransactionStyl.input_container}>
            <select
              className={AddTransactionStyl.input}
              value={transaction.account}
              onChange={handleInputChange}
              name="account"
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
          </div>

          <div className={AddTransactionStyl.input_container}>
            <select
              className={AddTransactionStyl.input}
              value={transaction.category}
              onChange={handleInputChange}
              name="category"
            >
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
            </select>
            {errors.category && (
              <div className={AddTransactionStyl.error_msg}>
                <span>{errors.category}</span>
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

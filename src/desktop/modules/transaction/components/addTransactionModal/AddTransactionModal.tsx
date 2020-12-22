import React from "react";
import AddTransactionStyl from "./AddTransactionStyle.module.css";
import Moment from "moment";

type Props = {
  isAddTransactionOpen: boolean;
  transaction: {
    type: string;
    date: string;
    account?: string;
    from?: string;
    to?: string;
    category?: string;
    amount: number;
    note: string;
  };
  handleInputChange: (event: any) => void;
};

const AddTransactionModal: React.FC<Props> = ({
  isAddTransactionOpen,
  transaction,
  handleInputChange,
}) => {
  return (
    <div>
      {isAddTransactionOpen ? (
        <div className={AddTransactionStyl.modal_wrapper}>
          <div className={AddTransactionStyl.container}>
            <div className={AddTransactionStyl.menu}>
              <div>Income</div>
              <div>Expense</div>
              <div>Transfer</div>
            </div>
            <div className={AddTransactionStyl.content}>
              <div className={AddTransactionStyl.content_titles}>
                <div className={AddTransactionStyl.title}>Day</div>
                <div className={AddTransactionStyl.title}>Account</div>
                <div className={AddTransactionStyl.title}>Category</div>
                <div className={AddTransactionStyl.title}>Amount</div>
                <div className={AddTransactionStyl.title}>Note</div>
              </div>
              <div className={AddTransactionStyl.content_inputs}>
                <input
                  type="text"
                  className={AddTransactionStyl.input}
                  value={Moment(transaction.date).format("d/M/Y(dd)")}
                />
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
                <input
                  type="number"
                  name="amount"
                  className={AddTransactionStyl.input}
                  value={transaction.amount}
                  onChange={handleInputChange}
                />
                <input type="text" className={AddTransactionStyl.input} />
              </div>
            </div>
            <input
              type="text"
              className={AddTransactionStyl.description}
              placeholder="Description"
            />
            <div className={AddTransactionStyl.buttons_content}>
              <button className={AddTransactionStyl.save_button}>Save</button>
              <button className={AddTransactionStyl.continue_button}>
                Continue
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddTransactionModal;

import React from "react";
import AddTransactionStyl from "./AddTransactionStyle.module.css";

type Props = {
  isAddTransactionOpen: boolean;
};

const AddTransactionModal: React.FC<Props> = ({ isAddTransactionOpen }) => {
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
                <input type="text" className={AddTransactionStyl.input} />
                <input type="text" className={AddTransactionStyl.input} />
                <input type="text" className={AddTransactionStyl.input} />
                <input type="text" className={AddTransactionStyl.input} />
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
              <button className={AddTransactionStyl.continue_button}>Continue</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddTransactionModal;

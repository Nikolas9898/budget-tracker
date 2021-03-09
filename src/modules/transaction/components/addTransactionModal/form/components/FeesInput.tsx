import React from "react";
import AddTransactionStyl from "../../AddTransactionStyle.module.css";
import {
  HandleInput,
  TransactionEvent,
} from "../../../../../../helpers/ITransactions";
type Props = {
  handleInputChange: (event: HandleInput) => void;
  setFeesIsOpen: (arg0: boolean) => void;
  transaction: TransactionEvent;
  feesIsOpen: boolean;
};

const FeesInput: React.FC<Props> = ({
  handleInputChange,
  setFeesIsOpen,
  transaction,
  feesIsOpen,
}) => {
  return (
    <div>
      {feesIsOpen ? (
        <div className={AddTransactionStyl.input_container}>
          <div className={AddTransactionStyl.amount_container}>
            <input
              type="text"
              className={AddTransactionStyl.input}
              name="fees"
              value={transaction.fees}
              onChange={handleInputChange}
            />

            {/* {errors.fees && (
              <div className={AddTransactionStyl.error_msg}>
                <span>{errors.fees}</span>
              </div>
            )} */}
            <div
              className={AddTransactionStyl.fees}
              onClick={() => {
                handleInputChange({ target: { value: "0", name: "fees" } });
                setFeesIsOpen(!feesIsOpen);
              }}
            >
              X
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default FeesInput;

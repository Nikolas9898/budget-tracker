import React from "react";
import AddTransactionStyl from "../../AddTransactionStyle.module.css";
import {
  HandleInput,
  TransactionEvent,
} from "../../../../../../helpers/ITransactions";
import { errorMsg } from "../../../../../../helpers/Validation";
type Props = {
  handleInputChange: (event: HandleInput) => void;
  setFeesIsOpen: (arg0: boolean) => void;
  transaction: TransactionEvent;
  feesIsOpen: boolean;
  error: string;
};

const AmountInput: React.FC<Props> = ({
  handleInputChange,
  setFeesIsOpen,
  transaction,
  feesIsOpen,
  error,
}) => {
  return (
    <div className={AddTransactionStyl.input_container}>
      <div className={AddTransactionStyl.amount_container}>
        <input
          type="number"
          name="amount"
          className={AddTransactionStyl.input}
          value={transaction.amount}
          onChange={handleInputChange}
        />
        {transaction.type === "transfer" && !feesIsOpen ? (
          <div
            className={AddTransactionStyl.fees}
            onClick={() => setFeesIsOpen(!feesIsOpen)}
          >
            Fees
          </div>
        ) : null}
      </div>
      {errorMsg(error)}
    </div>
  );
};
export default AmountInput;

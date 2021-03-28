import React from "react";
import styles from "../../AddTransactionStyle.module.css";
import { TransactionEvent } from "../../../../../../models/Transaction";
import { HandleInput } from "../../../../../../models/Function";
import { errorMsg } from "../../../../../../helpers/Validation";
import { Transfer } from "../../../../../../helpers/Variables";
type Props = {
  handleInputChange: (event: HandleInput) => void;
  setIsFeesOpen: (isOpen: boolean) => void;
  transaction: TransactionEvent;
  isFeesOpen: boolean;
  error: string;
};

const AmountInput: React.FC<Props> = ({
  handleInputChange,
  setIsFeesOpen,
  transaction,
  isFeesOpen,
  error,
}) => {
  return (
    <div className={styles.input_container}>
      <div className={styles.amount_container}>
        <input
          type="number"
          name="amount"
          className={styles.input}
          value={transaction.amount}
          onChange={handleInputChange}
        />
        {transaction.type === Transfer && !isFeesOpen ? (
          <div
            className={styles.fees}
            onClick={() => setIsFeesOpen(!isFeesOpen)}
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

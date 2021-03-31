import React from "react";
import styles from "../../AddTransactionStyle.module.css";
import { TransactionEvent } from "../../../../../../models/Transaction";
import { HandleInput } from "../../../../../../models/Function";
type Props = {
  handleInputChange: (event: HandleInput) => void;
  setIsFeesOpen: (arg0: boolean) => void;
  transaction: TransactionEvent;
  isFeesOpen: boolean;
};

const FeesInput: React.FC<Props> = ({
  handleInputChange,
  setIsFeesOpen,
  transaction,
  isFeesOpen,
}) => {
  return (
    <>
      {isFeesOpen ? (
        <div className={styles.input_container}>
          <div className={styles.amount_container}>
            <input
              type="text"
              className={styles.input}
              name="fees"
              value={transaction.fees}
              onChange={handleInputChange}
            />

            <div
              className={styles.fees}
              onClick={() => {
                handleInputChange({ target: { value: "0", name: "fees" } });
                setIsFeesOpen(!isFeesOpen);
              }}
            >
              X
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default FeesInput;

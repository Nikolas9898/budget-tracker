import React, { useCallback } from "react";
import styles from "../../AddTransactionStyle.module.css";
import { TransactionEvent } from "../../../../../../interfaces/Transaction";
import { HandleInput } from "../../../../../../interfaces/Function";
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
  const closeFees = useCallback(() => {
    handleInputChange({ target: { value: "0", name: "fees" } });
    setIsFeesOpen(!isFeesOpen);
  }, [isFeesOpen]);
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

            <div className={styles.fees} onClick={closeFees}>
              X
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default FeesInput;

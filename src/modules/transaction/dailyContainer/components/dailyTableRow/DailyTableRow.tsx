import React, { useCallback } from "react";
import {
  TransactionEventWithAmountNumber,
  TransactionWithAmountNumber,
} from "../../../../../interfaces/Transaction";
import { TransactionTypes } from "../../../../../helpers/Variables";
import styles from "./DailyTableRow.module.css";
type Props = {
  handleSelectEvent: (
    transactionEvent: TransactionEventWithAmountNumber,
    transactionId: string
  ) => void;
  transactionEvent: TransactionEventWithAmountNumber;
  transaction: TransactionWithAmountNumber;
};

const DailyTableRow: React.FC<Props> = ({
  transactionEvent,
  handleSelectEvent,
  transaction,
}) => {
  const selectEvent = useCallback(() => {
    handleSelectEvent(transactionEvent, transaction._id);
  }, [transactionEvent]);
  return (
    <tr onClick={selectEvent}>
      <td>
        <div className={styles.account_container}>
          <div className={styles.account}>
            {transactionEvent.type === TransactionTypes.Transfer
              ? "transfer"
              : transactionEvent.category}
          </div>
          <div className={styles.category}>
            <div>{transactionEvent.note}</div>
            {transactionEvent.type === TransactionTypes.Transfer ? (
              <div>
                {transactionEvent.from}
                {" ---> "}
                {transactionEvent.to}
              </div>
            ) : (
              transactionEvent.account
            )}
          </div>
        </div>
      </td>
      <td className={styles.income}>
        {transactionEvent.type === TransactionTypes.Income
          ? (transactionEvent.amount / 100).toFixed(2)
          : null}
      </td>
      <td
        className={
          transactionEvent.type === TransactionTypes.Expense
            ? styles.expense
            : styles.transfer
        }
      >
        <div>
          {transactionEvent.type === TransactionTypes.Expense ||
          transactionEvent.type === TransactionTypes.Transfer
            ? (transactionEvent.amount / 100).toFixed(2)
            : null}
        </div>
      </td>
    </tr>
  );
};

export default DailyTableRow;

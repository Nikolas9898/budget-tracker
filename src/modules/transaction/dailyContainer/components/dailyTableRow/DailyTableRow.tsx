import React from "react";
import { TransactionEventWithAmountNumber } from "../../../../../models/Transaction";
import styles from "./DailyTableRow.module.css";
import { Transfer, Income, Expense } from "../../../../../helpers/Variables";
type Props = {
  handleSelectEvent: (event: TransactionEventWithAmountNumber) => void;
  event: TransactionEventWithAmountNumber;
};
const DailyTableRow: React.FC<Props> = ({ event, handleSelectEvent }) => {
  return (
    <tr onClick={() => handleSelectEvent(event)}>
      <td>
        <div className={styles.account_container}>
          <div className={styles.account}>
            {event.type === Transfer ? "transfer" : event.category}
          </div>
          <div className={styles.category}>
            <div>{event.note}</div>
            {event.type === Transfer ? (
              <div>
                {event.from}
                {" ---> "}
                {event.to}
              </div>
            ) : (
              event.account
            )}
          </div>
        </div>
      </td>
      <td className={styles.income}>
        {event.type === Income ? (event.amount / 100).toFixed(2) : null}
      </td>
      <td className={event.type === Expense ? styles.expense : styles.transfer}>
        <div>
          {event.type === Expense || event.type === Transfer
            ? (event.amount / 100).toFixed(2)
            : null}
        </div>
      </td>
    </tr>
  );
};

export default DailyTableRow;

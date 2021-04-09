import React from "react";
import Moment from "moment";
import { isTheSameDate } from "../../../../../helpers/Variables";
import { TransactionWithAmountNumber } from "../../../../../interfaces/Transaction";
import styles from "../../DailyStyle.module.css";
type Props = {
  transaction: TransactionWithAmountNumber;
};
const DailyTableHeader: React.FC<Props> = ({ transaction }) => {
  return (
    <tr>
      <th>
        <div className={styles.date_content}>
          <div className={styles.date}>
            {Moment(transaction.createdAt).format("DD")}
          </div>
          <div>
            <div className={styles.date_year}>
              {Moment(transaction.createdAt).format("MM.YYYY")}
            </div>
            <div
              className={
                isTheSameDate(
                  transaction.createdAt,
                  Moment().startOf("date").toDate()
                )
                  ? styles.date_day_select
                  : styles.date_day
              }
            >
              {Moment(transaction.createdAt).format("ddd")}
            </div>
          </div>
        </div>
      </th>
      <th>
        <div className={styles.income}>
          {(transaction.income / 100).toFixed(2)}
        </div>
      </th>
      <th>
        <div className={styles.expense}>
          {(transaction.expense / 100).toFixed(2)}
        </div>
      </th>
    </tr>
  );
};

export default DailyTableHeader;

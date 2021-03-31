import React from "react";
import styles from "../../weeklyContainer/WeeklyStyle.module.css";

type Props = {
  sumIncome: number;
  sumExpense: number;
};

const InfoTableHead: React.FC<Props> = ({ sumIncome, sumExpense }) => {
  return (
    <thead>
      <tr>
        <th>
          <label className={styles.info_title}>Income</label>
          <div className={styles.income}>{(sumIncome / 100).toFixed(2)}</div>
        </th>
        <th>
          <label className={styles.info_title}>Expense</label>
          <div className={styles.expense}>{(sumExpense / 100).toFixed(2)}</div>
        </th>
        <th>
          <label className={styles.info_title}>Total</label>
          <div className={styles.total}>
            {((sumIncome - sumExpense) / 100).toFixed(2)}
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default InfoTableHead;

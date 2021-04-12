import React from 'react';
import styles from '../../weeklyContainer/WeeklyStyle.module.css';

type Props = {
  sumIncome: number;
  sumExpense: number;
};

const InfoTableHead: React.FC<Props> = ({sumIncome, sumExpense}) => {
  return (
    <thead>
      <tr>
        <th>
          <label htmlFor="Income" className={styles.info_title}>
            Income
            <div className={styles.income}>{(sumIncome / 100).toFixed(2)}</div>
          </label>
        </th>
        <th>
          <label htmlFor="Expense" className={styles.info_title}>
            Expense
            <div className={styles.expense}>{(sumExpense / 100).toFixed(2)}</div>
          </label>
        </th>
        <th>
          <label htmlFor="Total" className={styles.info_title}>
            Total
            <div className={styles.total}>{((sumIncome - sumExpense) / 100).toFixed(2)}</div>
          </label>
        </th>
      </tr>
    </thead>
  );
};

export default InfoTableHead;

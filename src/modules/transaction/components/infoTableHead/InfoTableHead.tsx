import React from "react";
import WeeklyStyle from "../../weeklyContainer/WeeklyStyle.module.css";

type Props = {
  sumIncome: number;
  sumExpense: number;
};

const InfoRow: React.FC<Props> = ({ sumIncome, sumExpense }) => (
 
    <thead>
      <tr>
        <th>
          <div className={WeeklyStyle.info_title}>Income</div>
          <div className={WeeklyStyle.income}>
            {(sumIncome / 100).toFixed(2)}
          </div>
        </th>
        <th>
          <label className={WeeklyStyle.info_title}>Expense</label>
          <div className={WeeklyStyle.expense}>
            {(sumExpense / 100).toFixed(2)}
          </div>
        </th>
        <th>
          <label className={WeeklyStyle.info_title}>Total</label>
          <div className={WeeklyStyle.total}>
            {((sumIncome - sumExpense) / 100).toFixed(2)}
          </div>
        </th>
      </tr>
    </thead>
  
);

export default InfoRow;

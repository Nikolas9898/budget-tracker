import React from 'react';
import classes from './InfoTableHeadStyle.module.css';

type Props = {
  sumIncome: number;
  sumExpense: number;
};

const InfoTableHead: React.FC<Props> = ({sumIncome, sumExpense}) => {
  return (
    <div className="row justify-content-center text-center mt-5 mb-5">
      <div className="col-3">
        <h2>Income</h2>
        <h2 className={classes.income}>{(sumIncome / 100).toFixed(2)}</h2>
      </div>
      <div className="col-3">
        <h2>Expense </h2>
        <h2 className={classes.expense}>{(sumExpense / 100).toFixed(2)}</h2>
      </div>
      <div className="col-3">
        <h2>Total</h2>
        <h2 className={classes.total}>{((sumIncome - sumExpense) / 100).toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default InfoTableHead;

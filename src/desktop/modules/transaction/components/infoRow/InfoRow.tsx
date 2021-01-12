import React from 'react';
import WeeklyStyle from "../../weeklyContainer/WeeklyStyle.module.css";

type Props={
    sumIncome:number,
    sumExpense:number
}

const InfoRow:React.FC<Props> = ({sumIncome,sumExpense}) => {
    return (
        <div className={WeeklyStyle.info_row}>
            <div>
                <label className={WeeklyStyle.info_title}>Income</label>
                <div className={WeeklyStyle.income}>{(sumIncome / 100).toFixed(2)}</div>
            </div>
            <div>
                <label className={WeeklyStyle.info_title}>Expense</label>
                <div className={WeeklyStyle.expense}>{(sumExpense / 100).toFixed(2)}</div>
            </div>
            <div>
                <label className={WeeklyStyle.info_title}>Total</label>
                <div className={WeeklyStyle.total}>{((sumIncome-sumExpense) / 100).toFixed(2)}</div>
            </div>
        </div>
    );
};


export default InfoRow;

import React, { useState } from "react";
import TransactionStyle from "./MonthlyStyle.module.css";
import TransactionStyl from "./MonthlyStyle.module.css";
import { Transaction } from "../../../helpers/ITransactions";
import { currentDay } from "../../../helpers/Variables";

type Props = {
  calendarDates: { date: Date }[];
  date: Date;
  transactions: Transaction[];
  handleOpenInfoModal: (date: Date) => void;
};

const Calendar: React.FC<Props> = ({
  calendarDates,
  date,
  transactions,
  handleOpenInfoModal,
}) => {
  const [days] = useState(["M", "T", "W", "Th", "F", "Sa", "Su"]);

  return (
    <div className={TransactionStyle.container}>
      <div className={TransactionStyle.days_wrapper}>
        {days.map((day, index) => (
          <div key={index} className={TransactionStyle.day_container}>
            {day}
          </div>
        ))}
      </div>
      <div className={TransactionStyle.calendar_wrapper}>
        {calendarDates.map((calDate: { date: Date }) => (
          <div
            className={
              date.getMonth() === calDate.date.getMonth()
                ? TransactionStyle.calendar_date_box_container
                : TransactionStyle.calendar_date_box_container_other_month
            }
            onClick={() => handleOpenInfoModal(calDate.date)}
          >
            <div
              className={
                currentDay(calDate.date, new Date())
                  ? TransactionStyle.current_date
                  : TransactionStyle.calendar_date
              }
            >
              {calDate.date.getDate()}
            </div>
            {transactions.map(transaction =>
              currentDay(calDate.date, transaction.createdAt) ? (
                <div
                  key={transaction._id}
                  className={TransactionStyle.calendar_events_content}
                >
                  <div className={TransactionStyl.income}>
                    {(transaction.income / 100).toFixed(2)}
                  </div>
                  <div className={TransactionStyl.expense}>
                    {(transaction.expense / 100).toFixed(2)}
                  </div>
                  <div className={TransactionStyl.total}>
                    {((transaction.income - transaction.expense) / 100).toFixed(
                      2
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

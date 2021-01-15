import React, { useEffect, useState } from "react";
import TransactionStyle from "./TransactionStyle.module.css";
import TransactionStyl from "./TransactionStyle.module.css";
import { State } from "./TransactionContainer";

type Props = {
  calendarDate: any;
  date: any;
  transactions: State["transactions"];
  handleOpenInfoModal: (date: any) => void;
};

const NewCalendar: React.FC<Props> = ({
  calendarDate,
  date,
  transactions,
  handleOpenInfoModal,
}) => {
  const [days, setDays] = useState(["Su", "M", "T", "W", "Th", "F", "Sa"]);

  const currentDay = (calDate: any, event: any) => {
    let isTrue =
      calDate.date.getDate() === new Date(event.createdAt).getDate() &&
      calDate.date.getMonth() === new Date(event.createdAt).getMonth() &&
      calDate.date.getFullYear() === new Date(event.createdAt).getFullYear();
    return isTrue;
  };
  return (
    <div className={TransactionStyl.container}>
      <div className={TransactionStyle.days_wrapper}>
        {days.map((day) => (
          <div className={TransactionStyle.day_container}>{day}</div>
        ))}
      </div>

      <div className={TransactionStyle.calendar_wrapper}>
        {calendarDate.map((calDate: any) => (
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
                currentDay(calDate, { createdAt: new Date() })
                  ? TransactionStyle.current_date
                  : TransactionStyle.calendar_date
              }
            >
              {calDate.date.getDate()}
            </div>
            {transactions.map((transaction) =>
              currentDay(calDate, transaction) ? (
                <div className={TransactionStyle.calendar_events_content}>
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

export default NewCalendar;

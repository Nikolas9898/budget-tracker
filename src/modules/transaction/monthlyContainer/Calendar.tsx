import React, { useState } from "react";
import styles from "./MonthlyStyle.module.css";
import { Transaction, CalendarDates } from "../../../models/Transaction";
import { isTheSameDate } from "../../../helpers/Variables";
import Moment from "moment";
type Props = {
  calendarDates: CalendarDates[];
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
    <div className={styles.container}>
      <div className={styles.days_wrapper}>
        {days.map((day, index) => (
          <div key={index} className={styles.day_container}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.calendar_wrapper}>
        {calendarDates.map((calDate: { date: Date }) => (
          <div
            className={
              Moment(date).get("month") === Moment(calDate.date).get("month")
                ? styles.calendar_date_box_container
                : styles.calendar_date_box_container_other_month
            }
            onClick={() =>
              handleOpenInfoModal(Moment(calDate.date).startOf("date").toDate())
            }
          >
            <div
              className={
                isTheSameDate(calDate.date, Moment().startOf("date").toDate())
                  ? styles.current_date
                  : styles.calendar_date
              }
            >
              {Moment(calDate.date).get("date")}
            </div>
            {transactions.map(transaction =>
              isTheSameDate(calDate.date, transaction.createdAt) ? (
                <div
                  key={transaction._id}
                  className={styles.calendar_events_content}
                >
                  <div className={styles.income}>
                    {(transaction.income / 100).toFixed(2)}
                  </div>
                  <div className={styles.expense}>
                    {(transaction.expense / 100).toFixed(2)}
                  </div>
                  <div className={styles.total}>
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

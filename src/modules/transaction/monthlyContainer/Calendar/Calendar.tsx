import React, { useState } from "react";
import CalendarDate from "./CalendarDate";
import { Transaction, CalendarDates } from "../../../../models/Transaction";
import {
  Monday,
  Thuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
} from "../../../../helpers/Variables";
import styles from "../MonthlyStyle.module.css";
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
  const [days] = useState([
    Monday,
    Thuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  ]);

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
        {calendarDates.map((calendarDate: { date: Date }) => (
          <CalendarDate
            calendarDate={calendarDate}
            transactions={transactions}
            date={date}
            handleOpenInfoModal={handleOpenInfoModal}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;

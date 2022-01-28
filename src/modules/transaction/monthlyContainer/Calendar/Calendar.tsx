import React, {useState} from 'react';
import CalendarDate from './CalendarDate';
import {CalendarDates, TransactionWithAmountNumber} from '../../../../models/Transaction';

import classes from '../MonthlyStyle.module.css';
import {DaysOfWeek} from '../../../../models/Clendar';

type Props = {
  calendarDates: CalendarDates[];
  date: Date;
  transactions: TransactionWithAmountNumber[];
  handleOpenInfoModal: (date: Date) => void;
};

const Calendar: React.FC<Props> = ({calendarDates, date, transactions, handleOpenInfoModal}) => {
  const [days] = useState([
    DaysOfWeek.MONDAY,
    DaysOfWeek.THUESDAY,
    DaysOfWeek.WEDNESDAY,
    DaysOfWeek.THURSDAY,
    DaysOfWeek.FRIDAY,
    DaysOfWeek.SATURDAY,
    DaysOfWeek.SUNDAY
  ]);

  return (
    <div className={classes.container}>
      <div className={classes.days_wrapper}>
        {days.map((day) => (
          <div key={day} className={classes.day_container}>
            {day}
          </div>
        ))}
      </div>
      <div className={classes.calendar_wrapper}>
        {calendarDates.map((calendarDate: {date: Date}) => (
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

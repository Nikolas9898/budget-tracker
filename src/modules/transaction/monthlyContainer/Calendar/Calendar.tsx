import React, {useState} from 'react';
import CalendarDate from './CalendarDate';
import {CalendarDates, TransactionWithAmountNumber} from '../../../../models/Transaction';
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
    <>
      <div className="row text-center">
        {days.map((day) => (
          <h4 key={day} className="col">
            {day}
          </h4>
        ))}
      </div>

      <div className="row ">
        {calendarDates.map((calendarDate: {date: Date}) => (
          <CalendarDate
            key={calendarDate.date.toString()}
            calendarDate={calendarDate}
            transactions={transactions}
            date={date}
            handleOpenInfoModal={handleOpenInfoModal}
          />
        ))}
      </div>
    </>
  );
};

export default Calendar;

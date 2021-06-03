import React, {useCallback} from 'react';
import Moment from 'moment';
import {TransactionWithAmountNumber} from '../../../../models/Transaction';
import classes from '../MonthlyStyle.module.css';
import {UnitOfTime} from '../../../../models/Clendar';
import {isTheSameDate} from '../../../../helpers/MomentHelpers';

type Props = {
  calendarDate: {date: Date};
  transactions: TransactionWithAmountNumber[];
  date: Date;
  handleOpenInfoModal: (date: Date) => void;
};

const CalendarDate: React.FC<Props> = ({calendarDate, transactions, date, handleOpenInfoModal}) => {
  const openInfoModal = useCallback(() => {
    handleOpenInfoModal(Moment(calendarDate.date).startOf(UnitOfTime.DATE).toDate());
  }, [calendarDate.date, handleOpenInfoModal]);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={openInfoModal}
      className={`
        ${
          Moment(date).get(UnitOfTime.MONTH) === Moment(calendarDate.date).get(UnitOfTime.MONTH)
            ? classes.calendar_date_box_container
            : classes.calendar_date_box_container_other_month
        }
      `}
      onClick={openInfoModal}
    >
      <div
        className={
          isTheSameDate(calendarDate.date, Moment().startOf(UnitOfTime.DATE).toDate())
            ? classes.current_date
            : classes.calendar_date
        }
      >
        {Moment(calendarDate.date).get(UnitOfTime.DATE)}
      </div>
      {transactions.map((transaction) => {
        const {_id: transactionId, income, expense} = transaction;
        return isTheSameDate(calendarDate.date, transaction.createdAt) ? (
          <div className="ps-3" key={transactionId}>
            <div className={` text-center ${classes.calendar_date_income}`}>{(income / 100).toFixed(2)}</div>
            <div className={` text-center ${classes.calendar_date_expense}`}>{(expense / 100).toFixed(2)}</div>
            <div className={` text-center ${classes.calendar_date_total}`}>{((income - expense) / 100).toFixed(2)}</div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default CalendarDate;

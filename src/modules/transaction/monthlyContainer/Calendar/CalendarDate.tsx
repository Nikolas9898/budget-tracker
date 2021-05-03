import React, {useCallback} from 'react';
import Moment from 'moment';
import {TransactionWithAmountNumber} from '../../../../models/Transaction';
import styles from '../MonthlyStyle.module.css';
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
    <button
      type="button"
      className={
        Moment(date).get(UnitOfTime.MONTH) === Moment(calendarDate.date).get(UnitOfTime.MONTH)
          ? styles.calendar_date_box_container
          : styles.calendar_date_box_container_other_month
      }
      onClick={openInfoModal}
    >
      <div
        className={
          isTheSameDate(calendarDate.date, Moment().startOf(UnitOfTime.DATE).toDate())
            ? styles.current_date
            : styles.calendar_date
        }
      >
        {Moment(calendarDate.date).get(UnitOfTime.DATE)}
      </div>
      {/* {transactions.map((transaction) => {
        const {_id: transactionId} = transaction;
        return isTheSameDate(calendarDate.date, transaction.createdAt) ? (
          <div key={transactionId}>
            <div className={styles.income}>{(transaction.income / 100).toFixed(2)}</div>
            <div className={styles.expense}>{(transaction.expense / 100).toFixed(2)}</div>
            <div className={styles.total}>{((transaction.income - transaction.expense) / 100).toFixed(2)}</div>
          </div>
        ) : null;
      })} */}
    </button>
  );
};

export default CalendarDate;

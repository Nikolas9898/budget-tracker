import React, {useCallback} from 'react';
import Moment from 'moment';
import {Transaction} from '../../../../models/Transaction';
import {isTheSameDate, transaction} from '../../../../helpers/Variables';
import styles from '../MonthlyStyle.module.css';

type Props = {
  calendarDate: {date: Date};
  transactions: Transaction[];
  date: Date;
  handleOpenInfoModal: (date: Date) => void;
};

const CalendarDate: React.FC<Props> = ({calendarDate, transactions, date, handleOpenInfoModal}) => {
  const openInfoModal = useCallback(() => {
    handleOpenInfoModal(Moment(calendarDate.date).startOf('date').toDate());
  }, [calendarDate.date, handleOpenInfoModal]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      tabIndex={0}
      className={
        Moment(date).get('month') === Moment(calendarDate.date).get('month')
          ? styles.calendar_date_box_container
          : styles.calendar_date_box_container_other_month
      }
      onClick={openInfoModal}
    >
      <div
        className={
          isTheSameDate(calendarDate.date, Moment().startOf('date').toDate())
            ? styles.current_date
            : styles.calendar_date
        }
      >
        {Moment(calendarDate.date).get('date')}
      </div>
      {transactions.map((transaction) => {
        const {_id: transactionId} = transaction;
        return isTheSameDate(calendarDate.date, transaction.createdAt) ? (
          <div key={transactionId} className={styles.calendar_events_content}>
            <div className={styles.income}>{(transaction.income / 100).toFixed(2)}</div>
            <div className={styles.expense}>{(transaction.expense / 100).toFixed(2)}</div>
            <div className={styles.total}>{((transaction.income - transaction.expense) / 100).toFixed(2)}</div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default CalendarDate;

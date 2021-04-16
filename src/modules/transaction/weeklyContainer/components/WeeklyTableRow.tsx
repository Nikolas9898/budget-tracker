import React from 'react';
import Moment from 'moment';
import styles from '../WeeklyStyle.module.css';

type Props = {
  week: {from: Date; to: Date; income: number; expense: number};
};

const WeeklyTableRow: React.FC<Props> = ({week}) => {
  const isDateInWeek = () => {
    return (
      Moment(week.from).startOf('isoWeek').diff(Moment(), 'week') === 0 &&
      Moment(week.to).endOf('isoWeek').diff(Moment(), 'week') === 0
    );
  };
  return (
    <tr>
      <td className={styles.date_container}>
        <div className={isDateInWeek() ? styles.selected_date : styles.date}>
          {Moment(week.from).format('DD.MM')} ~ {Moment(week.to).format('DD.MM')}
        </div>
      </td>
      <td className={styles.income}>{(week.income / 100).toFixed(2)}</td>
      <td className={styles.expense}>{(week.expense / 100).toFixed(2)}</td>
    </tr>
  );
};

export default WeeklyTableRow;

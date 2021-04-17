import React from 'react';
import Moment from 'moment';
import {useHistory} from 'react-router-dom';
import styles from '../YearlyStyle.module.css';

type Props = {
  month: {from: Date; to: Date; expense: number; income: number};
};

const YearlyTableRow: React.FC<Props> = ({month}) => {
  const history = useHistory();
  return (
    <tr onClick={() => history.push(`/transaction/monthly?date=${month.from}`)}>
      {' '}
      <td className={styles.month_content}>
        <div
          className={
            Moment(month.from).diff(Moment().startOf('month').toDate(), 'month') === 0
              ? styles.month_selected
              : styles.month
          }
        >
          {Moment(month.from).format('MMMM')}
        </div>
      </td>
      <td className={styles.income}>{(month.income / 100).toFixed(2)}</td>
      <td className={styles.expense}>{(month.expense / 100).toFixed(2)}</td>
    </tr>
  );
};

YearlyTableRow.propTypes = {};

export default YearlyTableRow;

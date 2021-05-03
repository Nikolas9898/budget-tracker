import React from 'react';
import Moment from 'moment';

import {TransactionWithAmountNumber} from '../../../../../models/Transaction';
import classes from '../../DailyStyle.module.css';
import {UnitOfTime} from '../../../../../models/Clendar';
import {isTheSameDate} from '../../../../../helpers/MomentHelpers';

type Props = {
  transaction: TransactionWithAmountNumber;
};
const DailyTableHeader: React.FC<Props> = ({transaction}) => {
  return (
    <tr>
      <th>
        <div className={classes.date_content}>
          <div className={classes.date}>{Moment(transaction.createdAt).format('DD')}</div>
          <div>
            <div className={classes.date_year}>{Moment(transaction.createdAt).format('MM.YYYY')}</div>
            <div
              className={
                isTheSameDate(transaction.createdAt, Moment().startOf(UnitOfTime.DATE).toDate())
                  ? classes.date_day_select
                  : classes.date_day
              }
            >
              {Moment(transaction.createdAt).format('ddd')}
            </div>
          </div>
        </div>
      </th>
      <th>
        <div className={classes.income}>{(transaction.income / 100).toFixed(2)}</div>
      </th>
      <th>
        <div className={classes.expense}>{(transaction.expense / 100).toFixed(2)}</div>
      </th>
    </tr>
  );
};

export default DailyTableHeader;

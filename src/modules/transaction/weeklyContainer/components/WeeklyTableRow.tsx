import React from 'react';
import Moment from 'moment';
import classes from '../WeeklyStyle.module.css';
import {UnitOfTime} from '../../../../helpers/Variables';

type Props = {
  week: {from: Date; to: Date; income: number; expense: number};
};

const WeeklyTableRow: React.FC<Props> = ({week}) => {
  const isDateInWeek = () => {
    return (
      Moment(week.from).startOf(UnitOfTime.ISO_WEEK).diff(Moment(), UnitOfTime.WEEK) === 0 &&
      Moment(week.to).endOf(UnitOfTime.ISO_WEEK).diff(Moment(), UnitOfTime.WEEK) === 0
    );
  };
  return (
    <tr>
      <td className={classes.date_container}>
        <div className={isDateInWeek() ? classes.selected_date : classes.date}>
          {Moment(week.from).format('DD.MM')} ~ {Moment(week.to).format('DD.MM')}
        </div>
      </td>
      <td className={classes.income}>{(week.income / 100).toFixed(2)}</td>
      <td className={classes.expense}>{(week.expense / 100).toFixed(2)}</td>
    </tr>
  );
};

export default WeeklyTableRow;

import React from 'react';
import Moment from 'moment';
import {UnitOfTime} from '../../../../models/Clendar';
import classes from '../WeeklyStyle.module.css';

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
    <div className="row justify-content-center mb-3">
      <div className="col-3 d-flex justify-content-center">
        <div className={isDateInWeek() ? classes.selected_date : classes.date}>
          {Moment(week.from).format('DD.MM')} ~ {Moment(week.to).format('DD.MM')}
        </div>
      </div>
      <div className={`col-3  ${classes.income}`}>{(week.income / 100).toFixed(2)}</div>
      <div className={`col-3  ${classes.expense}`}>{(week.expense / 100).toFixed(2)}</div>
    </div>
  );
};

export default WeeklyTableRow;

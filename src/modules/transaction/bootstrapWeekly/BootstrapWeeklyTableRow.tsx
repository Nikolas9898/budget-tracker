import React from 'react';
import Moment from 'moment';
import classes from '../weeklyContainer/WeeklyStyle.module.css';
import {UnitOfTime} from '../../../models/Clendar';

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
    <div className="row justify-content-center">
      <div className="col-3 align-self-center">
        <div className={isDateInWeek() ? classes.selected_date : classes.date}>
          {Moment(week.from).format('DD.MM')} ~ {Moment(week.to).format('DD.MM')}
        </div>
      </div>
      <div className="col-3 text-center align-self-center">
        <h3 className={classes.income}>{(week.income / 100).toFixed(2)}</h3>
      </div>
      <div className="col-3 text-center align-self-center">
        <h3 className={classes.expense}> {(week.expense / 100).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default WeeklyTableRow;

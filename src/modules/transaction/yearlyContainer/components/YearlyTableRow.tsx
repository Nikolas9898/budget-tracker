import React, {useCallback} from 'react';
import Moment from 'moment';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import classes from '../YearlyStyle.module.css';

import {setDate} from '../../actions/transactionActions';
import {UnitOfTime} from '../../../../models/Clendar';

type Props = {
  month: {from: Date; to: Date; expense: number; income: number};
};

const YearlyTableRow: React.FC<Props> = ({month}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const openMonthContainer = useCallback(() => {
    dispatch(setDate(month.from));
    history.push(`/transaction/monthly`);
  }, [dispatch, history, month.from]);

  return (
    <div
      role="button"
      tabIndex={-1}
      onClick={openMonthContainer}
      onKeyDown={openMonthContainer}
      className="row justify-content-center"
    >
      <div className="col-3 d-flex justify-content-center">
        <div
          className={` align-self-center ${
            Moment(month.from).diff(Moment().startOf(UnitOfTime.MONTH).toDate(), UnitOfTime.MONTH) === 0
              ? classes.month_selected
              : classes.month
          }`}
        >
          {Moment(month.from).format('MMMM')}
        </div>
      </div>

      <div className={`col-3 align-self-center ${classes.income}`}>{(month.income / 100).toFixed(2)}</div>
      <div className={`col-3 align-self-center ${classes.expense}`}>{(month.expense / 100).toFixed(2)}</div>
    </div>
  );
};

YearlyTableRow.propTypes = {};

export default YearlyTableRow;

import React, {useCallback} from 'react';
import Moment from 'moment';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import classes from '../YearlyStyle.module.css';
import {UnitOfTime} from '../../../../helpers/Variables';
import {setDate} from '../../actions/transactionActions';

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
    <tr onClick={openMonthContainer}>
      <td className={classes.month_content}>
        <div
          className={
            Moment(month.from).diff(Moment().startOf(UnitOfTime.MONTH).toDate(), UnitOfTime.MONTH) === 0
              ? classes.month_selected
              : classes.month
          }
        >
          {Moment(month.from).format('MMMM')}
        </div>
      </td>
      <td className={classes.income}>{(month.income / 100).toFixed(2)}</td>
      <td className={classes.expense}>{(month.expense / 100).toFixed(2)}</td>
    </tr>
  );
};

YearlyTableRow.propTypes = {};

export default YearlyTableRow;

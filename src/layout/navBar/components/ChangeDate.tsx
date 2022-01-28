import React, {useCallback} from 'react';
import Moment from 'moment';
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router';
import {isSelectedTitle} from '../../../helpers/TransactionHelpers';
import {TransactionReducer} from '../../../models/Transaction';
import {
  handlePreviousYear,
  handlePreviousWeek,
  handlePreviousMonth,
  handleNextYear,
  handleNextWeek,
  handleNextMonth
} from '../../../modules/transaction/actions/transactionActions';

const ChangeDate = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const date = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer.date);

  const handlePreviousYearOrMonth = useCallback(() => {
    if (isSelectedTitle(location.pathname, 'yearly')) {
      return dispatch(handlePreviousYear());
    }
    if (location.pathname === '/stats/weekly') {
      return dispatch(handlePreviousWeek());
    }
    return dispatch(handlePreviousMonth());
  }, [dispatch, location.pathname]);
  const handleNextYearOrMonth = useCallback(() => {
    if (isSelectedTitle(location.pathname, 'yearly')) {
      return dispatch(handleNextYear());
    }
    if (location.pathname === '/stats/weekly') {
      return dispatch(handleNextWeek());
    }
    return dispatch(handleNextMonth());
  }, [dispatch, location.pathname]);

  return (
    <div className="d-flex justify-content-center">
      <button className="btn navBarBtn mr-2 " type="button" onClick={handlePreviousYearOrMonth}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </button>
      <div className="date">
        {location.pathname === '/stats/weekly' &&
          `${Moment(date).set('day', 1).format('DD.MM')} - ${Moment(date).set('day', 7).format('DD.MM')}`}
        {isSelectedTitle(location.pathname, 'yearly') && Moment(date).format('YYYY')}
        {location.pathname !== '/stats/weekly' &&
          !isSelectedTitle(location.pathname, 'yearly') &&
          Moment(date).format('MMM YYYY')}
      </div>
      <button className="btn navBarBtn ml-2" type="button" onClick={handleNextYearOrMonth}>
        <FontAwesomeIcon icon={faCaretRight} />
      </button>
    </div>
  );
};
export default ChangeDate;

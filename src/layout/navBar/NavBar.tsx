import React, {useCallback} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import {
  handleNextMonth,
  handleNextYear,
  handlePreviousMonth,
  handlePreviousYear
} from '../../modules/transaction/actions/transactionActions';

import {TransactionReducer} from '../../models/Transaction';
import './NavBarStyle.css';
import languageWords from '../../helpers/LanguageConsts';
import {isSelectedTitle, isTransactionContainer} from '../../helpers/TransactionHelpers';

const NavBarMenu = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const date = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer.date);

  const handlePreviousYearOrMonth = useCallback(() => {
    if (isSelectedTitle(location.pathname, 'yearly')) {
      return dispatch(handlePreviousYear());
    }
    return dispatch(handlePreviousMonth());
  }, [dispatch, location.pathname]);
  const handleNextYearOrMonth = useCallback(() => {
    if (isSelectedTitle(location.pathname, 'yearly')) {
      return dispatch(handleNextYear());
    }
    return dispatch(handleNextMonth());
  }, [dispatch, location.pathname]);
  return (
    <div className="row m-3 w-100">
      <div className="col-md container_navigation">
        <div className="row justify-content-md-center">
          <Link
            to={isTransactionContainer(location.pathname) ? '/transaction/daily' : '/stats/daily'}
            className={isSelectedTitle(location.pathname, 'daily') ? 'col btn disabled' : 'col btn'}
          >
            {languageWords.DAILY}
          </Link>{' '}
          <Link
            to={isTransactionContainer(location.pathname) ? '/transaction/weekly' : '/stats/weekly'}
            className={isSelectedTitle(location.pathname, 'weekly') ? 'col btn disabled' : 'col btn'}
          >
            {languageWords.WEEKLY}
          </Link>
          <Link
            to={isTransactionContainer(location.pathname) ? '/transaction/monthly' : '/stats/monthly'}
            className={isSelectedTitle(location.pathname, 'monthly') ? 'col btn disabled' : 'col btn'}
          >
            {languageWords.MONTHLY}
          </Link>{' '}
          <Link
            to={isTransactionContainer(location.pathname) ? '/transaction/yearly' : '/stats/yearly'}
            className={isSelectedTitle(location.pathname, 'yearly') ? 'col btn disabled' : 'col btn'}
          >
            {languageWords.YEARLY}
          </Link>{' '}
        </div>
      </div>
      <div className="col-md-auto">
        {' '}
        <button className="btn mr-2 " type="button" onClick={handlePreviousYearOrMonth}>
          {'<'}
        </button>
        {isSelectedTitle(location.pathname, 'yearly') ? Moment(date).format('YYYY') : Moment(date).format('MMM YYYY')}
        <button className="btn ml-2" type="button" onClick={handleNextYearOrMonth}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default NavBarMenu;

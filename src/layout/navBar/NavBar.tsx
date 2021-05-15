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
    <div className="row ml-3 mb-3 mt-3 w-100">
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/daily' : '/stats/daily'}
        className={`col-1 mr-1 btn ${isSelectedTitle(location.pathname, 'daily') ? 'navBarBtnActive' : 'navBarBtn'}`}
      >
        {languageWords.DAILY}
      </Link>{' '}
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/weekly' : '/stats/weekly'}
        className={`col-1 mr-1 btn ${isSelectedTitle(location.pathname, 'weekly') ? 'navBarBtnActive' : 'navBarBtn'}`}
      >
        {languageWords.WEEKLY}
      </Link>
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/monthly' : '/stats/monthly'}
        className={`col-1 mr-1 btn ${isSelectedTitle(location.pathname, 'monthly') ? 'navBarBtnActive' : 'navBarBtn'}`}
      >
        {languageWords.MONTHLY}
      </Link>{' '}
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/yearly' : '/stats/yearly'}
        className={`col-1 mr-1 btn ${isSelectedTitle(location.pathname, 'yearly') ? 'navBarBtnActive' : 'navBarBtn'}`}
      >
        {languageWords.YEARLY}
      </Link>{' '}
      <div className="col-8 col-md-4  d-flex justify-content-center">
        {' '}
        <button className="btn navBarBtn mr-2 " type="button" onClick={handlePreviousYearOrMonth}>
          {'<'}
        </button>
        <div className="date">
          {isSelectedTitle(location.pathname, 'yearly') ? Moment(date).format('YYYY') : Moment(date).format('MMM YYYY')}
        </div>
        <button className="btn navBarBtn ml-2" type="button" onClick={handleNextYearOrMonth}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default NavBarMenu;

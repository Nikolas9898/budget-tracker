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
import './BootstrapNavBarStyle.css';
import {TransactionReducer} from '../../models/Transaction';
import languageWords from '../../helpers/LanguageConsts';
import {isSelectedTitle, isTransactionContainer} from '../../helpers/TransactionHelpers';

const BootstrapNavBarMenu = (): JSX.Element => {
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
    <div className="row mb-3 mt-3 w-100 justify-content-center">
      {/* <div className="col-12 mb-3 col-lg-8 container_navigation"> */}
      {/* <div className="row"> */}
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/daily' : '/stats/daily'}
        className={isSelectedTitle(location.pathname, 'daily') ? 'col-2 btn disabled' : 'col btn navBarBtn'}
      >
        {languageWords.DAILY}
      </Link>{' '}
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/weekly' : '/stats/weekly'}
        className={isSelectedTitle(location.pathname, 'weekly') ? 'col btn navBarBtnActive' : 'col btn navBarBtn'}
      >
        {languageWords.WEEKLY}
      </Link>
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/monthly/bootstrap' : '/stats/monthly'}
        className={
          isSelectedTitle(location.pathname, 'monthly/bootstrap') ? 'col btn navBarBtnActive' : 'col btn navBarBtn'
        }
      >
        {languageWords.MONTHLY}
      </Link>{' '}
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/yearly' : '/stats/yearly'}
        className={isSelectedTitle(location.pathname, 'yearly') ? 'col btn navBarBtnActive' : 'col btn navBarBtn'}
      >
        {languageWords.YEARLY}
      </Link>{' '}
      {/* </div>
      </div> */}
      <div className="col-6 col-md-4 text-center">
        {' '}
        <button className="btn navBarBtn mr-2 " type="button" onClick={handlePreviousYearOrMonth}>
          {'<'}
        </button>
        {isSelectedTitle(location.pathname, 'yearly') ? Moment(date).format('YYYY') : Moment(date).format('MMM YYYY')}
        <button className="btn navBarBtn ml-2" type="button" onClick={handleNextYearOrMonth}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default BootstrapNavBarMenu;

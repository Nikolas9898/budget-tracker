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
import {isTransactionContainer, isSelectedTitle} from '../../helpers/Variables';
import {TransactionReducer} from '../../models/Transaction';
import classes from './NavBarStyle.module.css';
import languageWords from '../../helpers/LanguageConsts';

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
    <div className={classes.container}>
      <div className={classes.container_navigation}>
        <Link
          to={isTransactionContainer(location.pathname) ? '/transaction/daily' : '/stats/daily'}
          className={isSelectedTitle(location.pathname, 'daily') ? classes.title_selected : classes.title}
        >
          {languageWords.DAILY}
        </Link>

        <Link
          to={isTransactionContainer(location.pathname) ? '/transaction/weekly' : '/stats/weekly'}
          className={isSelectedTitle(location.pathname, 'weekly') ? classes.title_selected : classes.title}
        >
          {languageWords.WEEKLY}
        </Link>

        <Link
          to={isTransactionContainer(location.pathname) ? '/transaction/monthly' : '/stats/monthly'}
          className={isSelectedTitle(location.pathname, 'monthly') ? classes.title_selected : classes.title}
        >
          {languageWords.MONTHLY}
        </Link>

        <Link
          to={isTransactionContainer(location.pathname) ? '/transaction/yearly' : '/stats/yearly'}
          className={isSelectedTitle(location.pathname, 'yearly') ? classes.title_selected : classes.title}
        >
          {languageWords.YEARLY}
        </Link>

        <Link
          to={isTransactionContainer(location.pathname) ? '/transaction/period' : '/stats/period'}
          className={isSelectedTitle(location.pathname, 'period') ? classes.title_selected : classes.title}
        >
          Period
        </Link>
      </div>
      <div className={classes.change_month_content}>
        <button type="button" className={classes.change_month_button} onClick={handlePreviousYearOrMonth}>
          {'<'}
        </button>
        {isSelectedTitle(location.pathname, 'yearly') ? Moment(date).format('YYYY') : Moment(date).format('MMM YYYY')}
        <button type="button" className={classes.change_month_button} onClick={handleNextYearOrMonth}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default NavBarMenu;

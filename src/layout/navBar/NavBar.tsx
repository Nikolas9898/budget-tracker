import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import languageWords from '../../helpers/LanguageConsts';
import {isSelectedTitle, isTransactionContainer} from '../../helpers/TransactionHelpers';
import AddTransactionButton from '../addTranasctionButton/AddTransactionButton';
import ChangeDate from './components/ChangeDate';
import './NavBarStyle.css';

const NavBarMenu = (): JSX.Element => {
  const location = useLocation();

  return (
    <div className="row ml-3 mb-3 mt-3 w-100">
      {location.pathname.includes('transaction') ? (
        <Link
          to="/transaction/daily"
          className={`col-md-1 mr-1 btn ${
            isSelectedTitle(location.pathname, 'daily') ? 'navBarBtnActive' : 'navBarBtn'
          }`}
        >
          {languageWords.DAILY}
        </Link>
      ) : null}
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/weekly' : '/stats/weekly'}
        className={`col-md-1 mr-1 btn ${
          isSelectedTitle(location.pathname, 'weekly') ? 'navBarBtnActive' : 'navBarBtn'
        }`}
      >
        {languageWords.WEEKLY}
      </Link>
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/monthly' : '/stats/monthly'}
        className={`col-md-1 mr-1 btn ${
          isSelectedTitle(location.pathname, 'monthly') ? 'navBarBtnActive' : 'navBarBtn'
        }`}
      >
        {languageWords.MONTHLY}
      </Link>{' '}
      <Link
        to={isTransactionContainer(location.pathname) ? '/transaction/yearly' : '/stats/yearly'}
        className={`col-md-1 mr-1 btn ${
          isSelectedTitle(location.pathname, 'yearly') ? 'navBarBtnActive' : 'navBarBtn'
        }`}
      >
        {languageWords.YEARLY}
      </Link>
      <ChangeDate />
      <AddTransactionButton />
    </div>
  );
};

export default NavBarMenu;

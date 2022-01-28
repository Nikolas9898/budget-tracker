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
    <div className="row  mb-3 mt-3 ">
      <div className="col-lg-5 pe-lg-5 col-sm-12">
        <div className="row   row-cols-xl-5 row-cols-lg-12 align-items-center">
          {location.pathname.includes('transaction') ? (
            <Link
              to="/transaction/daily"
              className={`m-1 btn ${isSelectedTitle(location.pathname, 'daily') ? 'navBarBtnActive' : 'navBarBtn'}`}
            >
              {languageWords.DAILY}
            </Link>
          ) : null}
          <Link
            to={isTransactionContainer(location.pathname) ? '/transaction/weekly' : '/stats/weekly'}
            className={`m-1 btn ${isSelectedTitle(location.pathname, 'weekly') ? 'navBarBtnActive' : 'navBarBtn'}`}
          >
            {languageWords.WEEKLY}
          </Link>
          <Link
            to={isTransactionContainer(location.pathname) ? '/transaction/monthly' : '/stats/monthly'}
            className={`m-1 btn ${isSelectedTitle(location.pathname, 'monthly') ? 'navBarBtnActive' : 'navBarBtn'}`}
          >
            {languageWords.MONTHLY}
          </Link>{' '}
          <Link
            to={isTransactionContainer(location.pathname) ? '/transaction/yearly' : '/stats/yearly'}
            className={` m-1 btn ${isSelectedTitle(location.pathname, 'yearly') ? 'navBarBtnActive' : 'navBarBtn'}`}
          >
            {languageWords.YEARLY}
          </Link>
        </div>
      </div>
      <div className="col-lg-2 col-sm-12 mt-sm-2 d-flex text-center justify-content-center align-items-center">
        <ChangeDate />
      </div>
      <div className="col-lg-5 col-sm-12 mt-sm-2 d-flex justify-content-end">
        <AddTransactionButton />
      </div>
    </div>
  );
};

export default NavBarMenu;

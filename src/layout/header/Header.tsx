import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import classes from './HeaderStyle.module.css';

import {UserReducer} from '../../models/User';
import AccountMenu from '../accountMenu/AccountMenu';
import {getHeaderTitle} from '../../helpers/TransactionHelpers';

const NavBar = (): JSX.Element => {
  const user = useSelector((state: {userReducer: UserReducer}) => state.userReducer.user);

  return (
    <nav className={`pe-3 ${classes.container}`}>
      <div className="navbar navbar-expand-lg row justify-content-center align-items-center">
        <div className="col" />
        <div className="col text-center">
          <div className={`collapse navbar-collapse ${classes.page_title}`}>
            {window.location.pathname === '/' ? 'Budget-Tracker' : getHeaderTitle(window.location.pathname)}
          </div>
        </div>
        <div className="col d-flex justify-content-end">
          <div role="button" tabIndex={-1} className="dropdown">
            <div
              role="button"
              className={`dropdown-toggl ${classes.user_content}`}
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className={classes.user_email}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className={classes.user_email}>{user.username}</div>
              <div className={classes.caret_down}>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <AccountMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;

/* <div className={`collapse navbar-collapse ${classes.page_title}`}>
            {window.location.pathname === '/' ? 'Budget-Tracker' : getHeaderTitle(window.location.pathname)}
          </div>
          <div role="button" tabIndex={-1} className="dropdown">
            <div
              role="button"
              className={`dropdown-toggl ${classes.user_content}`}
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className={classes.user_email}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className={classes.user_email}>{user.username}</div>
              <div className={classes.caret_down}>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <AccountMenu />
          </div> */

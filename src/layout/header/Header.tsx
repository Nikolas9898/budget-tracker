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
    <>
      <nav className={`navbar navbar-expand-sm ${classes.container}`}>
        <div className="container-fluid">
          {/* <FontAwesomeIcon className={classes.menu_bar} icon={faBars} onClick={() => setIsSideBarOpen(true)} /> */}
          <div className={`collapse navbar-collapse ${classes.page_title}`}>
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
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;

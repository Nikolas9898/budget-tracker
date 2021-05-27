import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import classes from './HeaderStyle.module.css';

import {UserReducer} from '../../models/User';
import AccountMenu from '../accountMenu/AccountMenu';
import {getHeaderTitle} from '../../helpers/TransactionHelpers';

const NavBar = (): JSX.Element => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = useSelector((state: {userReducer: UserReducer}) => state.userReducer.user);

  const openDropdownMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const test = false;

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
              <FontAwesomeIcon className={classes.user_email} icon={faUser} />
              <span className={classes.user_email}>{user.username}</span>
              <FontAwesomeIcon className={classes.caret_down} icon={faCaretDown} />
            </div>
            <AccountMenu />
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;

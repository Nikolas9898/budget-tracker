import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import classes from './HeaderStyle.module.css';
import AccountMenu from '../accountMenu/AccountMenu';
import {getHeaderTitle} from '../../helpers/TransactionHelpers';
import {getUsername} from '../../helpers/userSelectors';

const NavBar = (): JSX.Element => {
  const username = useSelector(getUsername);

  return (
    <nav className={`pe-3  ${classes.container}`}>
      <div className="navbar navbar-expand-lg row justify-content-center align-items-center">
        <div className="col" />
        <div className="col text-center">
          <div className={`collapse navbar-collapse ${classes.page_title}`}>
            {window.location.pathname === '/' ? 'Budget-Tracker' : getHeaderTitle(window.location.pathname)}
          </div>
        </div>
        <div className="col d-flex justify-content-end align-items-center">
          <div className="dropdown" data-bs-toggle="tooltip" data-bs-placement="left" title={username}>
            <div
              role="button"
              className={`dropdown-toggl ${classes.user_content}`}
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faUser} />

              <div className={classes.user_email}>{username}</div>
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

import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faBars, faUser} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import SideBar from '../sideBar/SideBar';
import classes from './HeaderStyle.module.css';

import {UserReducer} from '../../models/User';
import AccountMenu from '../accountMenu/AccountMenu';
import {getHeaderTitle} from '../../helpers/TransactionHelpers';

const NavBar = (): JSX.Element => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const user = useSelector((state: {userReducer: UserReducer}) => state.userReducer.user);

  return (
    <div>
      <nav className={classes.container}>
        <FontAwesomeIcon className={classes.menu_bar} icon={faBars} onClick={() => setIsSideBarOpen(true)} />
        <div className={classes.page_title}>
          {window.location.pathname === '/' ? 'Budget-Tracker' : getHeaderTitle(window.location.pathname)}
        </div>
        <div className={classes.dropdown}>
          <div className={classes.user_content}>
            <FontAwesomeIcon className={classes.user_email} icon={faUser} />
            <span className={classes.user_email}>{user.email}</span>
            <FontAwesomeIcon className={classes.caret_down} icon={faCaretDown} />
          </div>
          <AccountMenu />
        </div>
      </nav>
      <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
    </div>
  );
};
export default NavBar;

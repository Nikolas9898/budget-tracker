import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown, faUser} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import classes from './HeaderStyle.module.css';

import {UserReducer} from '../../models/User';
import AccountMenu from '../accountMenu/AccountMenu';
import {getHeaderTitle} from '../../helpers/TransactionHelpers';

const NavBar = (): JSX.Element => {
  // const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const user = useSelector((state: {userReducer: UserReducer}) => state.userReducer.user);

  return (
    <>
      <nav className={`navbar navbar-expand-sm   ${classes.container}`}>
        <div className={`container-fluid `}>
          {/* <FontAwesomeIcon className={classes.menu_bar} icon={faBars} onClick={() => setIsSideBarOpen(true)} /> */}
          <div className={`collapse navbar-collapse ${classes.page_title}`}>
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
        </div>
      </nav>

      {/* <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} /> */}
    </>
  );
};
export default NavBar;

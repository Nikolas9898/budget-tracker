import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import classes from '../header/HeaderStyle.module.css';
import languageWords from '../../helpers/LanguageConsts';

const AccountMenu = (): JSX.Element => {
  const handleExit = () => {
    localStorage.removeItem('jwt');
    window.location.pathname = '/authentication';
  };
  return (
    <div className={`dropdown-menu ${classes.dropdown_content}`} aria-labelledby="dropdownMenuButton1">
      {/* <Link to="/">
        <FontAwesomeIcon icon={faUser} />
        <div>{languageWords.PROFILE}</div>
      </Link>

      <Link to="/">
        <FontAwesomeIcon icon={faCog} />
        <div> {languageWords.SETTINGS}</div>
      </Link> */}

      <a type="button" href="/" onClick={handleExit}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <div>{languageWords.EXIT}</div>
      </a>
    </div>
  );
};

export default AccountMenu;

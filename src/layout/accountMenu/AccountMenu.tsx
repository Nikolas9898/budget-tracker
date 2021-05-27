import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faCog, faUser} from '@fortawesome/free-solid-svg-icons';
import classes from '../header/HeaderStyle.module.css';
import languageWords from '../../helpers/LanguageConsts';

const AccountMenu = (): JSX.Element => {
  const handleExit = () => {
    localStorage.removeItem('jwt');
    window.location.pathname = '/authentication';
  };
  return (
    <div className={`dropdown-menu ${classes.dropdown_content}`} aria-labelledby="dropdownMenuButton1">
      <Link to="/" className={classes.dropdown_item}>
        <FontAwesomeIcon className={classes.user_email} icon={faUser} />
        <div className={classes.dropdown_item_text}>{languageWords.PROFILE}</div>
      </Link>

      <Link to="/" className={classes.dropdown_item}>
        <FontAwesomeIcon className={classes.user_email} icon={faCog} />
        <div className={classes.dropdown_item_text}> {languageWords.SETTINGS}</div>
      </Link>

      <button type="button" className={classes.dropdown_item} onClick={handleExit}>
        <FontAwesomeIcon className={classes.user_email} icon={faSignOutAlt} />
        <div className={classes.dropdown_item_text}>{languageWords.EXIT}</div>
      </button>
    </div>
  );
};

export default AccountMenu;

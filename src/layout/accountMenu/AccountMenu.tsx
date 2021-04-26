import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faCog, faUserCog} from '@fortawesome/free-solid-svg-icons';
import styles from '../header/HeaderStyle.module.css';
import languageWords from '../../helpers/LanguageConsts';

const AccountMenu = (): JSX.Element => {
  const handleExit = () => {
    localStorage.removeItem('jwt');
    window.location.pathname = '/authentication';
  };
  return (
    <div className={styles.dropdown_content}>
      <Link to="/" className={styles.dropdown_item}>
        <FontAwesomeIcon className={styles.user_email} icon={faUserCog} /> {languageWords.PROFILE}
      </Link>

      <Link to="/" className={styles.dropdown_item}>
        <FontAwesomeIcon className={styles.user_email} icon={faCog} /> {languageWords.SETTINGS}
      </Link>

      <button type="button" className={styles.dropdown_item} onClick={handleExit}>
        <FontAwesomeIcon className={styles.user_email} icon={faSignOutAlt} /> {languageWords.EXIT}
      </button>
    </div>
  );
};

export default AccountMenu;

import React, {useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import classes from './SideBarStyle.module.css';
import languageWords from '../../helpers/LanguageConsts';

interface Props {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (value: boolean) => void;
}

const SideBar: React.FC<Props> = ({isSideBarOpen, setIsSideBarOpen}) => {
  const closeSideBar = useCallback(() => {
    setIsSideBarOpen(false);
  }, [setIsSideBarOpen]);
  return (
    <div className={isSideBarOpen ? classes.container : classes.container_back}>
      <nav className={isSideBarOpen ? classes.wrapper : classes.wrapper_back}>
        <FontAwesomeIcon className={classes.close_button} icon={faTimes} onClick={closeSideBar} />
        <ul className={classes.content}>
          <Link to="/transaction/monthly" className={classes.title}>
            {languageWords.TRANSACTIONS}
          </Link>

          <Link to="/stats/monthly" className={classes.title}>
            {languageWords.STATS}
          </Link>

          <Link to="/export" className={classes.title}>
            {languageWords.EXPORT}
          </Link>

          <Link to="/accounts" className={classes.title}>
            {languageWords.ACCOUNT}
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;

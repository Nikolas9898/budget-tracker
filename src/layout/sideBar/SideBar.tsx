import React, {useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import SideBarStyle from './SideBarStyle.module.css';
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
    <div>
      {isSideBarOpen ? (
        <div className={SideBarStyle.wrapper}>
          <FontAwesomeIcon className={SideBarStyle.close_button} icon={faTimes} onClick={closeSideBar} />
          <div className={SideBarStyle.content}>
            <Link to="/transaction/monthly" className={SideBarStyle.title}>
              {languageWords.TRANSACTIONS}
            </Link>
            <Link to="/stats/monthly" className={SideBarStyle.title}>
              {languageWords.STATS}
            </Link>
            <Link to="/export" className={SideBarStyle.title}>
              {languageWords.EXPORT}
            </Link>
            <Link to="/accounts" className={SideBarStyle.title}>
              {languageWords.ACCOUNT}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SideBar;

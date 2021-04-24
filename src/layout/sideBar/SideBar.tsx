import React, {useCallback} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import SideBarStyle from './SideBarStyle.module.css';
import {SideBarOptions} from '../../helpers/LanguageConsts';

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
              {SideBarOptions.TRANSACTIONS}
            </Link>
            <Link to="/stats/monthly" className={SideBarStyle.title}>
              {SideBarOptions.STATS}
            </Link>
            <Link to="/export" className={SideBarStyle.title}>
              {SideBarOptions.EXPORT}
            </Link>
            <Link to="/accounts" className={SideBarStyle.title}>
              {SideBarOptions.ACCOUNT}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SideBar;

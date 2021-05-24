import React, {useCallback, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faBook,
  faChartBar,
  faFileDownload,
  faDatabase,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import classes from './SideBarStyle.module.css';
import languageWords from '../../helpers/LanguageConsts';

// interface Props {
//   isSideBarOpen: boolean;
//   setIsSideBarOpen: (value: boolean) => void;
// }

const SideBar = (): JSX.Element => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const closeSideBar = useCallback(() => {
    setIsSideBarOpen(!isSideBarOpen);
  }, [isSideBarOpen]);
  return (
    <>
      <nav className={isSideBarOpen ? classes.container : classes.container_back}>
        <div className={isSideBarOpen ? classes.wrapper : classes.wrapper_back}>
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
        </div>
        {isSideBarOpen ? (
          <div
            className={classes.container_close_button}
            role="button"
            tabIndex={0}
            aria-label="Mute volume"
            onKeyDown={closeSideBar}
            onClick={closeSideBar}
          />
        ) : null}
      </nav>
      <nav className={` col-xll-1 col-xl-1 col-lg-1 col-md-1 col-sm-2  me-3 `} style={{backgroundColor: '#0160b2'}}>
        <div className=" text-end">
          <FontAwesomeIcon className={classes.open_menu} icon={faChevronRight} onClick={closeSideBar} />
        </div>

        <div className=" text-center  min-vh-100">
          <ul className={classes.content}>
            {' '}
            <Link to="/transaction/monthly" className={classes.menu_icon_container}>
              <FontAwesomeIcon icon={faBook} />
            </Link>{' '}
            <Link to="/stats/monthly" className={classes.menu_icon_container}>
              <FontAwesomeIcon icon={faChartBar} />
            </Link>{' '}
            <Link to="/export" className={classes.menu_icon_container}>
              <FontAwesomeIcon icon={faFileDownload} />
            </Link>{' '}
            <Link to="/accounts" className={classes.menu_icon_container}>
              <FontAwesomeIcon icon={faDatabase} />
            </Link>{' '}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
/* // <nav className={isSideBarOpen ? classes.container : classes.container_back}>
    //   <div className={isSideBarOpen ? classes.wrapper : classes.wrapper_back}>
    //     <FontAwesomeIcon className={classes.close_button} icon={faTimes} onClick={closeSideBar} />
    //     <ul className={classes.content}>
    //       <Link to="/transaction/monthly" className={classes.title}>
    //         {languageWords.TRANSACTIONS}
    //       </Link>

    //       <Link to="/stats/monthly" className={classes.title}>
    //         {languageWords.STATS}
    //       </Link>

    //       <Link to="/export" className={classes.title}>
    //         {languageWords.EXPORT}
    //       </Link>

    //       <Link to="/accounts" className={classes.title}>
    //         {languageWords.ACCOUNT}
    //       </Link>
    //     </ul>
    //   </div>
    // </nav> */

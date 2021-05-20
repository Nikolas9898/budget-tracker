import React, {forwardRef, useCallback, useState} from 'react';
import {CSVLink} from 'react-csv';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay, faCaretDown, faTimes} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import classes from './ExportStyle.module.css';
import {errorMsg} from '../../helpers/Validation';

type CustomInput = {
  value: string | number;
  onClick: React.MouseEventHandler<HTMLInputElement> | undefined;
};

const ExportContainer = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState('Income');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(['Cash']);
  const [isSelectedAccountOpen, setIsSelectedAccountOpen] = useState(false);
  const [isSelectedTypeOpen, setIsSelectedTypeOpen] = useState(false);
  const [accounts, setAccounts] = useState<string[]>(['Card', 'Account']);
  const [from, setFrom] = useState<Date>(Moment().toDate());
  const [to, setTo] = useState(Moment().toDate());
  const [error, setError] = useState('');

  const types = ['Income', 'Expense', 'Income & Expense'];

  const handleSetFromDate = useCallback(
    (date) => {
      setFrom(date);
      if (date > to) {
        setTo(date);
      }
    },
    [from]
  );
  const handleSetToDate = useCallback(
    (date) => {
      setTo(date);
    },
    [to]
  );

  const selectType = useCallback(
    (option) => () => {
      setSelectedType(option);
      setIsSelectedTypeOpen(false);
    },
    []
  );

  const removeSelectAccount = (account: string) => {
    const result = selectedAccounts.filter((word) => word !== account);
    setSelectedAccounts(result);
    setAccounts([...accounts, account]);
  };
  const handleSelectAccount = (account: string) => {
    selectedAccounts.push(account);
    const result = accounts.filter((word) => word !== account);
    setAccounts(result);
    setError('');
    setIsSelectedAccountOpen(false);
  };
  // const handleSelect = useCallback(
  //   (account) => () => {
  //     selectedAccounts.push(account);
  //     const result = accounts.filter((word) => word !== account);
  //     setAccounts(result);
  //     setIsSelectedAccountOpen(false);
  //   },
  //   []
  // );

  const openTypeOptions = useCallback(() => {
    setIsSelectedTypeOpen(!isSelectedTypeOpen);
  }, [isSelectedTypeOpen]);

  const openAccountOptions = useCallback(() => {
    setIsSelectedAccountOpen(!isSelectedAccountOpen);
  }, [isSelectedAccountOpen]);

  const headers = [
    {label: 'First Name', key: 'firstname'},
    {label: 'Last Name', key: 'lastname'},
    {label: 'Email', key: 'email'}
  ];

  const data = [
    {firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com'},
    {firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com'},
    {firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com'}
  ];
  const ExampleCustomInput: React.FC<CustomInput> = forwardRef(({value, onClick}) => (
    <div className="row align-items-center" role="button" tabIndex={0} onKeyDown={() => onClick} onClick={onClick}>
      <div className={`col-9 ps-4 `}>{value}</div>
      <div className={`col-2  text-end `}>
        <FontAwesomeIcon className={classes.calendar_icon} icon={faCalendarDay} />
      </div>
    </div>
  ));
  return (
    <div className="container-xx m-5">
      <div className="row justify-content-between">
        <div className="col-xxl-3 col-sm-12 col-lg-6 mb-2">
          <div className={classes.label}>Transaction Type</div>
          <div
            className={classes.input}
            role="button"
            tabIndex={0}
            onKeyDown={openTypeOptions}
            onClick={openTypeOptions}
          >
            <div className={classes.title}>{selectedType}</div>
            <div>
              {' '}
              <FontAwesomeIcon className={classes.caret_down_icon} icon={faCaretDown} />
            </div>
          </div>

          {isSelectedTypeOpen ? (
            <div>
              <div
                className={isSelectedTypeOpen ? classes.select_options_wrraper : classes.select_options_wrraper_back}
              >
                {types.map((option) => (
                  <div
                    className={classes.select_option_title}
                    role="button"
                    tabIndex={0}
                    onKeyDown={selectType(option)}
                    onClick={selectType(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className="col-xxl-3 col-sm-12 col-lg-6 mb-2">
          <div className={classes.label}>Account</div>
          <div
            className={classes.input}
            role="button"
            tabIndex={0}
            onKeyDown={openAccountOptions}
            onClick={openAccountOptions}
          >
            <div className={classes.title}>
              {selectedAccounts.map((account) => (
                <div className={classes.select_account_box}>
                  <div>{account}</div>
                  <FontAwesomeIcon
                    className={classes.select_delete_icon}
                    onClick={() => removeSelectAccount(account)}
                    icon={faTimes}
                  />
                </div>
              ))}
            </div>
            <div>
              {' '}
              <FontAwesomeIcon
                className={classes.caret_down_icon}
                role="button"
                tabIndex={0}
                onKeyDown={openAccountOptions}
                onClick={openAccountOptions}
                icon={faCaretDown}
              />
            </div>
          </div>
          {isSelectedAccountOpen ? (
            <div className={` ${classes.select_options_wrraper}`}>
              {accounts.map((option) => (
                <div
                  className={classes.select_option_title}
                  role="button"
                  tabIndex={0}
                  onKeyDown={() => handleSelectAccount(option)}
                  onClick={() => handleSelectAccount(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          ) : null}
          <div style={{fontSize: '1.7rem'}}>{errorMsg(error)}</div>
        </div>
        <div className="col-xxl-3 col-sm-12 col-lg-6 mb-2">
          <div className={classes.label}>From</div>
          <DatePicker
            wrapperClassName={classes.input}
            selected={from}
            dateFormat=" dd / MM / yyyy"
            onChange={handleSetFromDate}
            timeCaption="time"
            customInput={React.createElement(ExampleCustomInput)}
          />
        </div>
        <div className="col-xxl-3 col-sm-12 col-lg-6 mb-2">
          <div className={classes.label}>To</div>
          <DatePicker
            wrapperClassName={classes.input}
            selected={to}
            dateFormat=" dd / MM / yyyy"
            onChange={handleSetToDate}
            timeCaption="time"
            minDate={from}
            customInput={React.createElement(ExampleCustomInput)}
          />
        </div>
      </div>
      <div className="row justify-content-end mt-5">
        <div className="col-xl-3 text-end ">
          {selectedAccounts.length === 0 ? (
            <button
              onClick={() => {
                setError('Please select an account');
              }}
              type="button"
              className={classes.export_disabled_button}
            >
              Export CSV
            </button>
          ) : (
            <CSVLink
              className={classes.export_button}
              data={data}
              headers={headers}
              filename="my-file.csv"
              target="_blank"
            >
              Export CSV
            </CSVLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportContainer;

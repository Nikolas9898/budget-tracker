import React, {forwardRef, useCallback, useState} from 'react';
import {CSVLink} from 'react-csv';
import Moment from 'moment';
import Select, {OptionsType, OptionTypeBase} from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';
import classes from './ExportStyle.module.css';
import {errorMsg} from '../../helpers/Validation';

type CustomInput = {
  value: string | number;
  onClick: React.MouseEventHandler<HTMLInputElement> | undefined;
};

type OptionType = {
  value: string;
  label: string;
};
const animatedComponents = makeAnimated();
const ExportContainer = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState('Income');
  const [accounts] = useState<OptionType[]>([
    {label: 'Card', value: 'card'},
    {label: 'Account', value: 'account'},
    {label: 'Cash', value: 'cash'}
  ]);
  const [selectedAccounts, setSelectedAccounts] = useState<OptionTypeBase | OptionsType<OptionTypeBase> | null>([]);
  // const [isSelectedAccountOpen, setIsSelectedAccountOpen] = useState(false);
  const [isSelectedTypeOpen, setIsSelectedTypeOpen] = useState(false);

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
  const handleAccountSelect = (option: OptionTypeBase | OptionsType<OptionTypeBase> | null) => {
    setSelectedAccounts(option);
  };
  const openTypeOptions = useCallback(() => {
    setIsSelectedTypeOpen(true);
  }, [isSelectedTypeOpen]);

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

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#0160b2',
      color: 'white',
      height: '70px'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fonSize: '2rem',
      color: 'white'
    }),

    menu: (provided: any, state: any) => ({
      ...provided,
      // color: state.isFocused ? 'white' : 'red',
      backgroundColor: 'coral',
      fonSize: '2rem',
      border: '2px solid coral'
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#0160b2' : 'white',
      backgroundColor: state.isFocused ? 'white' : 'coral',
      fonSize: '2rem'
    })
  };

  return (
    <div className=" col container-xx mt-5 ">
      <div className="row justify-content-between">
        <div className="col-xxl-3 col-sm-12 col-lg-6 mb-2">
          <div className={classes.label}>Transaction Type</div>
          <div style={{position: 'relative'}}>
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
            ) : null}
          </div>
        </div>
        <div className="col-xxl-3 col-sm-12 col-lg-6 mb-2">
          <div className={classes.label}>Account</div>

          <Select
            isMulti
            styles={customStyles}
            closeMenuOnSelect={false}
            onChange={(option) => handleAccountSelect(option)}
            components={animatedComponents}
            options={accounts}
          />

          {/* <div
            style={{position: 'relative'}}
            role="button"
            tabIndex={0}
            onKeyDown={openAccountOptions}
            onClick={openAccountOptions}
          >
            <div className={classes.input}>
              <div className={classes.title}>
                {selectedAccounts.map((account) => (
                  <div className={classes.select_account_box}>
                    <div>{account}</div>
                    <FontAwesomeIcon
                      className={classes.select_delete_icon}
                      // onClick={() => removeSelectAccount(account)}
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
                    // onKeyDown={() => handleSelectAccount(option)}
                    // onClick={() => handleSelectAccount(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            ) : null}
          </div> */}
          <div style={{fontSize: '1.4rem'}}>{errorMsg(error)}</div>
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
          {selectedAccounts?.length === 0 ? (
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

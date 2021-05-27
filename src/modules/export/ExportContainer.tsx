import React, {forwardRef, useCallback, useEffect, useState, CSSProperties} from 'react';
import {CSVLink} from 'react-csv';
import Moment from 'moment';
import Select, {OptionsType, OptionTypeBase, StylesConfig} from 'react-select';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDay} from '@fortawesome/free-solid-svg-icons';
import makeAnimated from 'react-select/animated';
import DatePicker from 'react-datepicker';

import classes from './ExportStyle.module.css';
import {errorMsg} from '../../helpers/Validation';
import {getExportApiData} from './service/ExportService';
import {TransactionEvent} from '../../models/Transaction';

type CustomInput = {
  value: string | number;
  onClick: React.MouseEventHandler<HTMLInputElement> | undefined;
};
type MyOptionType = {
  label: string;
  value: string;
};

const animatedComponents = makeAnimated();
const ExportContainer = (): JSX.Element => {
  const [selectedType, setSelectedType] = useState<OptionTypeBase>({
    label: 'Income',
    value: 'income'
  });
  const [selectedAccounts, setSelectedAccounts] = useState<OptionTypeBase | OptionsType<OptionTypeBase> | null>([
    {label: 'Cash', value: 'cash'}
  ]);
  const [from, setFrom] = useState<Date>(Moment().toDate());
  const [to, setTo] = useState(Moment().toDate());
  const [error, setError] = useState('');
  const [exportData, setExportData] = useState<TransactionEvent[]>([]);

  const types: MyOptionType[] = [
    {label: 'Income', value: 'income'},
    {label: 'Expense', value: 'expense'},
    {label: 'Income&Expense', value: 'income & expense'}
  ];
  const accounts: MyOptionType[] = [
    {label: 'Card', value: 'card'},
    {label: 'Accounts', value: 'accounts'},
    {label: 'Cash', value: 'cash'}
  ];

  const getExportData = async () => {
    const response = await getExportApiData(from, to, selectedType.value, selectedAccounts);

    setExportData(response.data);
  };

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

  const selectType = (option: OptionTypeBase) => {
    setSelectedType(option);
  };
  const handleAccountSelect = (option: OptionTypeBase | OptionsType<OptionTypeBase> | null) => {
    setSelectedAccounts(option);
  };

  useEffect(() => {
    getExportData();
    if (selectedAccounts?.length > 0) {
      setError('');
    }
  }, [selectedType, selectedAccounts, from, to]);
  const ExampleCustomInput: React.FC<CustomInput> = forwardRef(({value, onClick}) => (
    <div className="row align-items-center" role="button" tabIndex={0} onKeyDown={() => onClick} onClick={onClick}>
      <div className={`col-9 ps-4 `}>{value}</div>
      <div className={`col-2  text-end `}>
        <FontAwesomeIcon className={classes.calendar_icon} icon={faCalendarDay} />
      </div>
    </div>
  ));

  const customControlStyles: CSSProperties = {
    backgroundColor: '#0160b2',
    color: 'white',
    height: '100%',
    minHeight: '70px',
    fontSize: '1.5rem',
    borderRadius: '6px'
  };

  const customPlaceholderStyle: CSSProperties = {
    fontSize: '2rem',
    color: 'white'
  };
  const customOptionStyle: CSSProperties = {
    color: 'white',
    backgroundColor: 'coral',
    fontSize: '1.5rem'
  };
  const customMenuStyle: CSSProperties = {
    color: 'white',
    backgroundColor: 'coral',
    fontSize: '1rem',
    border: '2px solid lightgrey'
  };
  const customSingleValueStyle: CSSProperties = {
    color: 'white',
    fontSize: '1.5rem'
  };

  type IsMulti = true;

  const selectStyle: StylesConfig<OptionTypeBase, IsMulti> = {
    control: (provided) => {
      return {
        ...provided,
        ...customControlStyles
      };
    },
    placeholder: (provided) => {
      return {
        ...provided,
        ...customPlaceholderStyle
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        ...customOptionStyle,
        color: state.isFocused ? '#0160b2' : 'white',
        backgroundColor: state.isFocused ? 'white' : 'coral'
      };
    },
    menu: (provided) => {
      return {
        ...provided,
        ...customMenuStyle
      };
    },
    singleValue: (provided) => {
      return {
        ...provided,
        ...customSingleValueStyle
      };
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className="container-xx mt-5 ">
        <div className="row justify-content-between  align-items-end">
          <div className="col-xxl col-sm-12 col-lg-6 mb-2">
            <div className={classes.label}>Transaction Type</div>
            <Select
              value={selectedType}
              styles={selectStyle}
              onChange={(option) => selectType(option)}
              components={animatedComponents}
              options={types}
            />
          </div>
          <div className="col-xxl col-sm-12 col-lg-6 mb-2">
            <div className={classes.label}>Account</div>
            <Select
              isMulti
              value={selectedAccounts}
              styles={selectStyle}
              closeMenuOnSelect={false}
              onChange={(option) => handleAccountSelect(option)}
              components={animatedComponents}
              options={accounts}
            />
            <div style={{fontSize: '1.4rem'}}>{errorMsg(error)}</div>
          </div>
          <div className="col-xxl col-sm-12 col-lg-6 mb-2">
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
          <div className="col-xxl col-sm-12 col-lg-6 mb-2">
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

          <div className="col-xxl col-sm-12 mb-2 mt-4">
            {selectedAccounts?.length === 0 ? (
              <div className="row align-items-end justify-content-center">
                <button
                  onClick={() => {
                    setError('Please select an account');
                  }}
                  type="button"
                  className={classes.export_disabled_button}
                >
                  Export CSV
                </button>
              </div>
            ) : (
              <div className="row align-items-end justify-content-center">
                <CSVLink
                  className={classes.export_button}
                  data={exportData}
                  filename={`${selectedType.value} - ${Moment(from).format('MMMM Do YYYY')} - ${Moment(to).format(
                    'MMMM Do YYYY'
                  )}.csv`}
                  target="_blank"
                >
                  Export CSV
                </CSVLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportContainer;

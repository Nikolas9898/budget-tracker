import React, {forwardRef, useCallback, useEffect, useState, CSSProperties} from 'react';
import {CSVLink} from 'react-csv';
import Moment from 'moment';
import Select, {OptionsType, OptionTypeBase, StylesConfig, components} from 'react-select';
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
  const [selectedAccounts, setSelectedAccounts] = useState<OptionTypeBase | OptionsType<OptionTypeBase> | null>([]);
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

  const dateFormat = 'dd/MM/yyyy';
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
  const ExampleCustomInput = forwardRef(
    ({value, onClick}: CustomInput, ref: React.LegacyRef<HTMLInputElement> | undefined) => (
      <div
        className="row align-items-center"
        role="button"
        tabIndex={0}
        onKeyDown={() => onClick}
        onClick={onClick}
        ref={ref}
      >
        <div className={`col-10 ps-4 `}>{value}</div>
        <div className={`col-2 d-flex justify-content-end `}>
          <FontAwesomeIcon className={classes.calendar_icon} icon={faCalendarDay} />
        </div>
      </div>
    )
  );

  const customControlStyles: CSSProperties = {
    height: '100%',
    minHeight: '50px',
    fontSize: '1.2rem',
    borderRadius: '6px',
    border: '2px solid #0160b2'
  };

  const customPlaceholderStyle: CSSProperties = {
    fontSize: '1.2rem',
    color: '#0160b2'
  };
  const customOptionStyle: CSSProperties = {
    color: '#0160b2',
    fontSize: '1.2rem'
  };
  const customMenuStyle: CSSProperties = {
    color: 'white',
    fontSize: '1.2rem',
    border: '2px solid #0160b2'
  };
  const customSingleValueStyle: CSSProperties = {
    color: '#0160b2'
  };

  const customIndicator: CSSProperties = {
    color: '#0160b2',
    cursor: 'pointer'
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
    indicatorSeparator: () => {
      return {visible: 'none'};
    },
    option: (provided, state) => {
      return {
        ...provided,
        ...customOptionStyle,
        fontWeight: state.isSelected ? 'bolder' : 'lighter',
        backgroundColor: state.isSelected ? '#0160b2' : 'white',
        color: state.isSelected ? 'white' : '#0160b2'
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
    },
    noOptionsMessage: (provided) => {
      return {
        ...provided,
        ...customSingleValueStyle
      };
    },

    clearIndicator: () => {
      return {
        ...customIndicator
      };
    },
    dropdownIndicator: (provided) => {
      return {
        ...provided,
        ...customIndicator
      };
    }
  };
  const ValueContainer = ({children, getValue, ...props}: any) => {
    const {hasValue} = props;
    const nbValues = getValue().length;
    if (!hasValue) {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
    }
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <components.ValueContainer {...props}>{`${nbValues} accounts`}</components.ValueContainer>;
  };
  return (
    <div className="wrapper">
      <div className="container-xx mt-5 ">
        <div className="row justify-content-between ">
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
              hideSelectedOptions={false}
              value={selectedAccounts}
              styles={selectStyle}
              closeMenuOnSelect={false}
              onChange={(option) => handleAccountSelect(option)}
              components={{ValueContainer}}
              options={accounts}
            />
            <div className={classes.error_accout}>{errorMsg(error)}</div>
          </div>
          <div className="col-xxl col-sm-12 col-lg-6 mb-2">
            <div className={classes.label}>From</div>
            <DatePicker
              wrapperClassName={classes.input}
              selected={from}
              dateFormat={dateFormat}
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
              dateFormat={dateFormat}
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

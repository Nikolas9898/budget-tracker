import React, {forwardRef, useState, useCallback} from 'react';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import classes from '../AddTransactionStyle.module.css';
import {SelectInputTitle, TransactionEvent, TransactionTypes} from '../../../../../models/Transaction';
import {HandleInputChange} from '../../../../../models/Function';
import {Error} from '../../../../../models/Error';
import SelectInput from './components/SelectInputs';
import FeesInput from './components/FeesInput';
import AmountInput from './components/AmountInput';
import 'react-datepicker/dist/react-datepicker.css';
import {errorMsg} from '../../../../../helpers/Validation';

type Props = {
  transaction: TransactionEvent;
  errors: Error;
  handleInputChange: (event: HandleInputChange) => void;
};
type CustomInput = {
  value: string | number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const Form: React.FC<Props> = ({transaction, handleInputChange, errors}) => {
  const [isFeesOpen, setIsFeesOpen] = useState(false);

  // const accounts = Object.keys(useSelector(getUserAccounts).accounts);
  // const categoriesIncome = useSelector(getCategoriesIncome);
  // const categoriesExpense = useSelector(getCategoriesExpense).forEach((element) => element.name);

  // TODO/mockup state//
  const accounts = ['', 'cash', 'card', 'accounts'];
  const categoriesIncome = ['', 'salary', 'bonus', 'petty cash', 'other'];
  const categoriesExpense = ['', 'food', 'culture', 'socialLife', 'selfDevelopment', 'transportation', 'other'];

  const selectOptions = (transactionType: string) => {
    if (transactionType === TransactionTypes.TRANSFER) {
      if (transaction.from === '' && transaction.to === '') {
        return accounts;
      }
      return accounts.filter((element) => element !== transaction.from);
    }

    if (transactionType === TransactionTypes.INCOME) {
      return categoriesIncome;
    }
    return categoriesExpense;
  };
  const handleSetDate = useCallback(
    (date) => {
      handleInputChange({
        target: {value: Moment(date).toDate(), name: 'date'}
      });
    },
    [handleInputChange]
  );

  const ExampleCustomInput = forwardRef(
    ({value, onClick}: CustomInput, ref: React.LegacyRef<HTMLButtonElement> | undefined) => (
      <div className=" align-items-center ">
        <button type="button" onClick={onClick} className={classes.input} ref={ref}>
          {value}
        </button>
      </div>
    )
  );

  return (
    <>
      <div className="row  align-items-center justify-content-center mb-2">
        <div className={`col-3 align-items-start ${classes.title}`}>Day</div>
        <div className="col-8 ">
          <DatePicker
            selected={Moment(transaction.date).toDate()}
            dateFormat=" dd / MMMM / yyyy  h:mm aa"
            onChange={handleSetDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            customInput={React.createElement(ExampleCustomInput)}
          />
        </div>
      </div>

      <div className="row  align-items-center justify-content-center mb-2">
        <div className={`col-3 ${classes.title}`}>
          {transaction.type === TransactionTypes.TRANSFER ? 'From' : 'Account'}
        </div>
        <div className="col-8">
          {' '}
          <SelectInput
            selectValue={transaction.type === TransactionTypes.TRANSFER ? transaction.from : transaction.account}
            transactionType={
              transaction.type === TransactionTypes.TRANSFER ? SelectInputTitle.FROM : SelectInputTitle.ACCOUNT
            }
            options={accounts}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="col-3" />
        {errorMsg(transaction.type === TransactionTypes.TRANSFER ? errors.from : errors.account)}
      </div>

      <div className="row  align-items-center justify-content-center mb-2">
        <div className={`col-3 ${classes.title}`}>
          {' '}
          {transaction.type === TransactionTypes.TRANSFER ? 'To' : 'Category'}
        </div>
        <div className="col-8">
          {' '}
          <SelectInput
            selectValue={transaction.type === TransactionTypes.TRANSFER ? transaction.to : transaction.category}
            transactionType={
              transaction.type === TransactionTypes.TRANSFER ? SelectInputTitle.TO : SelectInputTitle.CATEGORY
            }
            options={selectOptions(transaction.type)}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="col-3" />
        {errorMsg(transaction.type === TransactionTypes.TRANSFER ? errors.to : errors.category)}
      </div>

      <div className="row  align-items-center justify-content-center mb-2">
        <div className={`col-3 ${classes.title}`}>Amount</div>
        <div className="col-8">
          {' '}
          <AmountInput
            transaction={transaction}
            handleInputChange={handleInputChange}
            setIsFeesOpen={setIsFeesOpen}
            isFeesOpen={isFeesOpen}
          />
        </div>
        <div className="col-3" />
        {errorMsg(errors.amount)}
      </div>

      {isFeesOpen ? (
        <div className="row  align-items-center justify-content-center mb-2">
          <div className={`col-3 ${classes.title}`}>Fees</div>
          <div className="col-8">
            {' '}
            <FeesInput
              transaction={transaction}
              handleInputChange={handleInputChange}
              setIsFeesOpen={setIsFeesOpen}
              isFeesOpen={isFeesOpen}
            />
          </div>
          <div className="col-3" />
          {errorMsg(errors.fees)}
        </div>
      ) : null}

      <div className="row  align-items-center justify-content-center mb-2">
        <div className={`col-3 ${classes.title}`}>Note</div>
        <div className="col-8">
          <input
            type="text"
            className={classes.input}
            name="note"
            value={transaction.note}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default Form;

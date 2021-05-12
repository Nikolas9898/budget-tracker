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

type Props = {
  transaction: TransactionEvent;
  errors: Error;
  handleInputChange: (event: HandleInputChange) => void;
};
type CustomInput = {
  value: string | number;
  onClick: React.MouseEventHandler<HTMLInputElement> | undefined;
};
const Form: React.FC<Props> = ({transaction, handleInputChange, errors}) => {
  const [isFeesOpen, setIsFeesOpen] = useState(false);

  // TODO/mockup state//
  const accounts = ['', 'cash', 'card', 'accounts'];
  const categoriesIncome = [' ', 'salary', 'bonus', 'petty cash', 'other'];
  const categoriesExpense = ['', 'food', 'culture', 'socialLife', 'selfDevelopment', 'transportation', 'other'];

  const selectOptions = (transactionType: string) => {
    if (transactionType === TransactionTypes.TRANSFER) {
      return accounts;
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
  const ExampleCustomInput: React.FC<CustomInput> = forwardRef(({value, onClick}) => (
    <div className={classes.input_container}>
      <input className={classes.input} onClick={onClick} value={value} />
    </div>
  ));

  return (
    <>
      {/* <InputTitles transaction={transaction} isFeesOpen={isFeesOpen} /> */}
      <div className="row align-items-start">
        <div className="col-3">Day</div>
        <div className="col-8">
          <DatePicker
            selected={Moment(transaction.date).toDate()}
            dateFormat=" dd / MMMM / yyyy  h:mm aa"
            onChange={handleSetDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            locale="pt-BR"
            customInput={React.createElement(ExampleCustomInput)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">{transaction.type === TransactionTypes.TRANSFER ? 'From' : 'Account'}</div>
        <div className="col-8 ">
          {' '}
          <SelectInput
            selectValue={transaction.type === TransactionTypes.TRANSFER ? transaction.from : transaction.account}
            transactionType={
              transaction.type === TransactionTypes.TRANSFER ? SelectInputTitle.FROM : SelectInputTitle.ACCOUNT
            }
            options={accounts}
            handleInputChange={handleInputChange}
            error={transaction.type === TransactionTypes.TRANSFER ? errors.from : errors.account}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3"> {transaction.type === TransactionTypes.TRANSFER ? 'To' : 'Category'}</div>
        <div className="col-8">
          {' '}
          <SelectInput
            selectValue={transaction.type === TransactionTypes.TRANSFER ? transaction.to : transaction.category}
            transactionType={
              transaction.type === TransactionTypes.TRANSFER ? SelectInputTitle.TO : SelectInputTitle.CATEGORY
            }
            options={selectOptions(transaction.type)}
            handleInputChange={handleInputChange}
            error={transaction.type === TransactionTypes.TRANSFER ? errors.to : errors.category}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">Amount</div>
        <div className="col-8">
          {' '}
          <AmountInput
            transaction={transaction}
            handleInputChange={handleInputChange}
            setIsFeesOpen={setIsFeesOpen}
            isFeesOpen={isFeesOpen}
            error={errors.amount}
          />
        </div>
      </div>

      {isFeesOpen ? (
        <div className="row">
          <div className="col-3">Fees</div>
          <div className="col-8">
            {' '}
            <FeesInput
              transaction={transaction}
              handleInputChange={handleInputChange}
              setIsFeesOpen={setIsFeesOpen}
              isFeesOpen={isFeesOpen}
            />
          </div>
        </div>
      ) : null}

      <div className="row">
        <div className="col-3">Note</div>
        <div className="col-8">
          <input type="text" className="w-100" name="note" value={transaction.note} onChange={handleInputChange} />
        </div>
      </div>
    </>
  );
};

export default Form;

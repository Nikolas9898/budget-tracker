import React, {forwardRef, useState, useCallback} from 'react';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import styles from '../AddTransactionStyle.module.css';
import {SelectInputTitle, TransactionEvent, TransactionTypes} from '../../../../../models/Transaction';
import {HandleInputChange} from '../../../../../models/Function';
import {Error} from '../../../../../models/Error';
import InputTitles from './components/InputTitles';
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
    <div className={styles.input_container}>
      <input className={styles.input} onClick={onClick} value={value} />
    </div>
  ));

  return (
    <div className={styles.content}>
      <InputTitles transaction={transaction} isFeesOpen={isFeesOpen} />
      <div className={styles.content_inputs}>
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

        <SelectInput
          selectValue={transaction.type === TransactionTypes.TRANSFER ? transaction.from : transaction.account}
          transactionType={
            transaction.type === TransactionTypes.TRANSFER ? SelectInputTitle.FROM : SelectInputTitle.ACCOUNT
          }
          options={accounts}
          handleInputChange={handleInputChange}
          error={transaction.type === TransactionTypes.TRANSFER ? errors.from : errors.account}
        />
        <SelectInput
          selectValue={transaction.type === TransactionTypes.TRANSFER ? transaction.to : transaction.category}
          transactionType={
            transaction.type === TransactionTypes.TRANSFER ? SelectInputTitle.TO : SelectInputTitle.CATEGORY
          }
          options={selectOptions(transaction.type)}
          handleInputChange={handleInputChange}
          error={transaction.type === TransactionTypes.TRANSFER ? errors.to : errors.category}
        />
        <AmountInput
          transaction={transaction}
          handleInputChange={handleInputChange}
          setIsFeesOpen={setIsFeesOpen}
          isFeesOpen={isFeesOpen}
          error={errors.amount}
        />

        <FeesInput
          transaction={transaction}
          handleInputChange={handleInputChange}
          setIsFeesOpen={setIsFeesOpen}
          isFeesOpen={isFeesOpen}
        />

        <input type="text" className={styles.input} name="note" value={transaction.note} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default Form;

import React, {forwardRef, useState, useCallback} from 'react';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import styles from '../AddTransactionStyle.module.css';
import {TransactionEvent} from '../../../../../models/Transaction';
import {HandleInput} from '../../../../../models/Function';
import {Error} from '../../../../../models/Error';
import {TransactionTypes} from '../../../../../helpers/Variables';
import InputTitles from './components/InputTitles';
import SelectInput from './components/SelectInputs';
import FeesInput from './components/FeesInput';
import AmountInput from './components/AmountInput';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  transaction: TransactionEvent;
  errors: Error;
  handleInputChange: (event: HandleInput) => void;
};
const Form: React.FC<Props> = ({transaction, handleInputChange, errors}) => {
  const [isFeesOpen, setIsFeesOpen] = useState(false);
  const accounts = ['', 'cash', 'card', 'accounts'];
  const categoriesIncome = [' ', 'salary', 'bonus', 'petty cash', 'other'];
  const categoriesExpense = ['', 'food', 'culture', 'socialLife', 'selfDevelopment', 'transportation', 'other'];

  const selectOptions = (transactionType: string) => {
    if (transactionType === TransactionTypes.Transfer) {
      return accounts;
    }
    if (transactionType === TransactionTypes.Income) {
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
  const ExampleCustomInput: React.FC<any> = forwardRef(({value, onClick}) => (
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
          customInput={<ExampleCustomInput />}
        />

        <SelectInput
          selectValue={transaction.type === TransactionTypes.Transfer ? transaction.from : transaction.account}
          transactionType={transaction.type === TransactionTypes.Transfer ? 'from' : 'account'}
          options={accounts}
          handleInputChange={handleInputChange}
          error={transaction.type === TransactionTypes.Transfer ? errors.from : errors.account}
        />
        <SelectInput
          selectValue={transaction.type === TransactionTypes.Transfer ? transaction.to : transaction.category}
          transactionType={transaction.type === TransactionTypes.Transfer ? 'to' : 'category'}
          options={selectOptions(transaction.type)}
          handleInputChange={handleInputChange}
          error={transaction.type === TransactionTypes.Transfer ? errors.to : errors.category}
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

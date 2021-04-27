import React from 'react';
import {errorMsg} from '../../../../../../helpers/Validation';
import {HandleInput} from '../../../../../../models/Function';
import classes from '../../AddTransactionStyle.module.css';

type Props = {
  handleInputChange: (event: HandleInput) => void;
  options: string[];
  transactionType: string;
  selectValue: string | undefined;
  error: string;
};

const SelectInput: React.FC<Props> = ({handleInputChange, options, transactionType, selectValue, error}) => {
  return (
    <div className={classes.input_container}>
      <select className={classes.input} value={selectValue} onChange={handleInputChange} name={transactionType}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
      {errorMsg(error)}
    </div>
  );
};
export default SelectInput;

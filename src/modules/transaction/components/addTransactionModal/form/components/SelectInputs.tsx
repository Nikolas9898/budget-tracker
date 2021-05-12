import React from 'react';
import {errorMsg} from '../../../../../../helpers/Validation';
import {HandleInputChange} from '../../../../../../models/Function';
import classes from '../../AddTransactionStyle.module.css';

type Props = {
  handleInputChange: (event: HandleInputChange) => void;
  options: string[];
  transactionType: string;
  selectValue: string | undefined;
  error: string;
};

const SelectInput: React.FC<Props> = ({handleInputChange, options, transactionType, selectValue, error}) => {
  return (
    <>
      <select className="w-100" value={selectValue} onChange={handleInputChange} name={transactionType}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
      {errorMsg(error)}
    </>
  );
};
export default SelectInput;

import React from 'react';
import {HandleInputChange} from '../../../../../../models/Function';
import classes from '../../AddTransactionStyle.module.css';

type Props = {
  handleInputChange: (event: HandleInputChange) => void;
  options: string[];
  transactionType: string;
  selectValue: string | undefined;
};

const SelectInput: React.FC<Props> = ({handleInputChange, options, transactionType, selectValue}) => {
  return (
    <>
      <select className={classes.input} value={selectValue} onChange={handleInputChange} name={transactionType}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
export default SelectInput;

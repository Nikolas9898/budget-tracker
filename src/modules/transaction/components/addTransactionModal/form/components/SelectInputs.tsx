import React from "react";
import AddTransactionStyl from "../../AddTransactionStyle.module.css";
import { errorMsg } from "../../../../../../helpers/Validation";
import { HandleInput } from "../../../../../../helpers/ITransactions";
type Props = {
  handleInputChange: (event: HandleInput) => void;
  options: string[];
  transactionType: string;
  selectValue: string | undefined;
  error: string;
};

const SelectInput: React.FC<Props> = ({
  handleInputChange,
  options,
  transactionType,
  selectValue,
  error,
}) => {
  return (
    <div className={AddTransactionStyl.input_container}>
      <select
        className={AddTransactionStyl.input}
        value={selectValue}
        onChange={handleInputChange}
        name={transactionType}
      >
        {options.map(option => (
          <option value={option}>{option}</option>
        ))}
      </select>
      {errorMsg(error)}
    </div>
  );
};
export default SelectInput;

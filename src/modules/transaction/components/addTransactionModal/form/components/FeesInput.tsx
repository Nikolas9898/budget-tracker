import React, {useCallback} from 'react';
import classes from '../../AddTransactionStyle.module.css';
import {TransactionEvent} from '../../../../../../models/Transaction';
import {HandleInputChange} from '../../../../../../models/Function';

type Props = {
  handleInputChange: (event: HandleInputChange) => void;
  setIsFeesOpen: (arg0: boolean) => void;
  transaction: TransactionEvent;
  isFeesOpen: boolean;
};

const FeesInput: React.FC<Props> = ({handleInputChange, setIsFeesOpen, transaction, isFeesOpen}) => {
  const closeFees = useCallback(() => {
    handleInputChange({target: {value: '0', name: 'fees'}});
    setIsFeesOpen(!isFeesOpen);
  }, [handleInputChange, isFeesOpen, setIsFeesOpen]);
  return (
    <>
      {isFeesOpen ? (
        <div className={classes.input_container}>
          <div className={classes.amount_container}>
            <input
              type="text"
              className={classes.input}
              name="fees"
              value={transaction.fees}
              onChange={handleInputChange}
            />

            <button type="button" className={classes.fees} onClick={closeFees}>
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default FeesInput;

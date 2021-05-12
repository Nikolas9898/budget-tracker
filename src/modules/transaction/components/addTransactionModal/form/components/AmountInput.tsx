import React, {useCallback} from 'react';
import classes from '../../AddTransactionStyle.module.css';
import {TransactionEvent, TransactionTypes} from '../../../../../../models/Transaction';
import {HandleInputChange} from '../../../../../../models/Function';
import {errorMsg} from '../../../../../../helpers/Validation';

type Props = {
  handleInputChange: (event: HandleInputChange) => void;
  setIsFeesOpen: (isOpen: boolean) => void;
  transaction: TransactionEvent;
  isFeesOpen: boolean;
  error: string;
};

const AmountInput: React.FC<Props> = ({handleInputChange, setIsFeesOpen, transaction, isFeesOpen, error}) => {
  const setFeesOpen = useCallback(() => {
    setIsFeesOpen(!isFeesOpen);
  }, [isFeesOpen, setIsFeesOpen]);

  return (
    <>
      <div className={classes.amount_container}>
        <input
          type="number"
          name="amount"
          className={classes.input}
          value={transaction.amount}
          onChange={handleInputChange}
        />
        {transaction.type === TransactionTypes.TRANSFER && !isFeesOpen ? (
          <button type="button" className={classes.fees} onClick={setFeesOpen}>
            Fees
          </button>
        ) : null}
      </div>
      {errorMsg(error)}
    </>
  );
};
export default AmountInput;

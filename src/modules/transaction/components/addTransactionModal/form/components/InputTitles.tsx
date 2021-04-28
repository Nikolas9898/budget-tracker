import React from 'react';
import {TransactionEvent, TransactionTypes} from '../../../../../../models/Transaction';
import classes from '../../AddTransactionStyle.module.css';

type Props = {
  transaction: TransactionEvent;
  isFeesOpen: boolean;
};

const InputTitles: React.FC<Props> = ({transaction, isFeesOpen}) => {
  return (
    <div className={classes.content_titles}>
      <div className={classes.title}>Day</div>
      {transaction.type === TransactionTypes.TRANSFER ? (
        <div className={classes.title}>From</div>
      ) : (
        <div className={classes.title}>Account</div>
      )}
      {transaction.type === TransactionTypes.TRANSFER ? (
        <div className={classes.title}>To</div>
      ) : (
        <div className={classes.title}>Category</div>
      )}
      <div className={classes.title}>Amount</div>
      {isFeesOpen ? <div className={classes.title}>Fees</div> : null}
      <div className={classes.title}>Note</div>
    </div>
  );
};
export default InputTitles;

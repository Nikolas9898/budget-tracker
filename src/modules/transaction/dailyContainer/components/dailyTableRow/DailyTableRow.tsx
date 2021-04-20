import React, {useCallback} from 'react';
import {TransactionEventWithAmountNumber, TransactionWithAmountNumber} from '../../../../../models/Transaction';
import {TransactionTypes} from '../../../../../helpers/Variables';
import styles from './DailyTableRow.module.css';

type Props = {
  handleSelectEvent: (transactionEvent: TransactionEventWithAmountNumber, transactionId: string) => void;
  transactionEvent: TransactionEventWithAmountNumber;
  transaction: TransactionWithAmountNumber;
};

const DailyTableRow: React.FC<Props> = ({transactionEvent, handleSelectEvent, transaction}) => {
  const {_id: transactionId} = transaction;

  const selectEvent = useCallback(() => {
    handleSelectEvent(transactionEvent, transactionId);
  }, [handleSelectEvent, transactionId, transactionEvent]);
  return (
    <tr onClick={selectEvent}>
      <td>
        <div className={styles.account_container}>
          <div className={styles.account}>
            {transactionEvent.type === TransactionTypes.TRANSFER
              ? TransactionTypes.TRANSFER
              : transactionEvent.category}
          </div>
          <div className={styles.category}>
            <div>{transactionEvent.note}</div>
            {transactionEvent.type === TransactionTypes.TRANSFER ? (
              <div>
                {transactionEvent.from}
                {' ---> '}
                {transactionEvent.to}
              </div>
            ) : (
              transactionEvent.account
            )}
          </div>
        </div>
      </td>
      <td className={styles.income}>
        {transactionEvent.type === TransactionTypes.INCOME ? (transactionEvent.amount / 100).toFixed(2) : null}
      </td>
      <td className={transactionEvent.type === TransactionTypes.EXPENSE ? styles.expense : styles.transfer}>
        <div>
          {transactionEvent.type === TransactionTypes.EXPENSE || transactionEvent.type === TransactionTypes.TRANSFER
            ? (transactionEvent.amount / 100).toFixed(2)
            : null}
        </div>
      </td>
    </tr>
  );
};

export default DailyTableRow;

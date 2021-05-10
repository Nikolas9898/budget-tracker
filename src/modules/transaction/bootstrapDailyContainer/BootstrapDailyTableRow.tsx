import React, {useCallback} from 'react';
import {
  TransactionEventWithAmountNumber,
  TransactionTypes,
  TransactionWithAmountNumber
} from '../../../models/Transaction';

import classes from './DailyTableRow.module.css';

type Props = {
  handleSelectEvent: (transactionEvent: TransactionEventWithAmountNumber, transactionId: string) => void;
  transactionEvent: TransactionEventWithAmountNumber;
  transaction: TransactionWithAmountNumber;
};

const BootstrapDailyTableRow: React.FC<Props> = ({transactionEvent, handleSelectEvent, transaction}) => {
  const {_id: transactionId} = transaction;

  const selectEvent = useCallback(() => {
    handleSelectEvent(transactionEvent, transactionId);
  }, [handleSelectEvent, transactionId, transactionEvent]);
  return (
    <div
      className="row align-self-center text-center"
      role="button"
      tabIndex={0}
      onKeyDown={selectEvent}
      onClick={selectEvent}
    >
      <div className="col-4 align-self-center ">
        <div className="row justify-content-center ">
          <div className="col-6 align-self-center">
            {transactionEvent.type === TransactionTypes.TRANSFER ? (
              TransactionTypes.TRANSFER
            ) : (
              <h2>{transactionEvent.category}</h2>
            )}
          </div>
          <div className="col-6 align-self-center">
            <div>{transactionEvent.note}</div>
            {transactionEvent.type === TransactionTypes.TRANSFER ? (
              <div>
                {transactionEvent.from}
                {' ---> '}
                {transactionEvent.to}
              </div>
            ) : (
              <h2>{transactionEvent.account}</h2>
            )}
          </div>
        </div>
      </div>
      <h2 className="col-4 align-self-center ">
        {transactionEvent.type === TransactionTypes.INCOME ? (transactionEvent.amount / 100).toFixed(2) : null}
      </h2>
      <div className="col-4 align-self-center">
        <h2>
          {transactionEvent.type === TransactionTypes.EXPENSE || transactionEvent.type === TransactionTypes.TRANSFER
            ? (transactionEvent.amount / 100).toFixed(2)
            : null}
        </h2>
      </div>
    </div>
  );
};

export default BootstrapDailyTableRow;

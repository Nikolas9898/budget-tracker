import React, {useCallback} from 'react';
import {
  TransactionEventWithAmountNumber,
  TransactionTypes,
  TransactionWithAmountNumber
} from '../../../../../models/Transaction';

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
    <div
      className="row align-self-center text-center "
      style={{borderTop: '2px solid black', padding: '15px 0 15px 0'}}
      role="button"
      tabIndex={0}
      onKeyDown={selectEvent}
      onClick={selectEvent}
    >
      <div className="col-4 align-self-center ">
        <div className="row justify-content-center ">
          <div className="col-xxl-6 col-xl-6 align-self-center">
            {transactionEvent.type === TransactionTypes.TRANSFER ? (
              <h2>{TransactionTypes.TRANSFER}</h2>
            ) : (
              <h2>{transactionEvent.category}</h2>
            )}
          </div>
          <div className="col-xll-6 col-xl-6 align-self-center">
            {transactionEvent.type === TransactionTypes.TRANSFER ? (
              <h4>
                {transactionEvent.from}
                {' ---> '}
                {transactionEvent.to}
              </h4>
            ) : (
              <h2>{transactionEvent.account}</h2>
            )}
          </div>
        </div>
      </div>
      <h2 className="col-4 align-self-center ">
        {transactionEvent.type === TransactionTypes.INCOME ? (transactionEvent.amount / 100).toFixed(2) : null}
      </h2>
      <div className="col-4 ">
        <h2>
          {transactionEvent.type === TransactionTypes.EXPENSE || transactionEvent.type === TransactionTypes.TRANSFER
            ? (transactionEvent.amount / 100).toFixed(2)
            : null}
        </h2>
      </div>
    </div>
  );
};

export default DailyTableRow;

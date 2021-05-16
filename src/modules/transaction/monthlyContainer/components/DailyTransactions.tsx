import React from 'react';
import Moment from 'moment';
import {TransactionEventWithAmountNumber, TransactionWithAmountNumber} from '../../../../models/Transaction';
import DailyInfoTableRow from './DailyInfoTableRow';
import classes from '../MonthlyStyle.module.css';

type Props = {
  handleDelete: (eventId: string) => void;
  selectedTransaction: TransactionWithAmountNumber;
  handleOpenEdit: (event: TransactionEventWithAmountNumber) => void;
};

const DailyTransactions: React.FC<Props> = ({handleDelete, selectedTransaction, handleOpenEdit}) => {
  const {createdAt, events} = selectedTransaction;
  return (
    <>
      <div className="text-center font-weight-bold pt-sm-3 pb-3">
        <h5>{Moment(createdAt).format('DD.MM.YYYY(dddd)')}</h5>
      </div>
      <div className={classes.table_scroll}>
        {events.length === 0 ? (
          <div>Този ден няма транзакции</div>
        ) : (
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Account</th>
                <th scope="col">Income</th>
                <th scope="col">Expense</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <DailyInfoTableRow event={event} handleDelete={handleDelete} handleOpenEdit={handleOpenEdit} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default DailyTransactions;

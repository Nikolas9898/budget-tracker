import React, {useCallback} from 'react';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleLeft, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {TransactionEventWithAmountNumber, TransactionWithAmountNumber} from '../../../../models/Transaction';
import DailyInfoTableRow from './DailyInfoTableRow';
import classes from '../MonthlyStyle.module.css';

type Props = {
  handleDelete: (eventId: string) => void;
  selectedTransaction: TransactionWithAmountNumber;
  handleOpenEdit: (event: TransactionEventWithAmountNumber) => void;
};

const DailyTransactions: React.FC<Props> = ({handleDelete, selectedTransaction, handleOpenEdit}) => {
  return (
    <>
      <div className="text-center font-weight-bold pt-sm-3 pb-3">
        <h5>{Moment(selectedTransaction.createdAt).format('DD.MM.YYYY(dddd)')}</h5>
      </div>
      <div className={classes.table_scroll}>
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
            {selectedTransaction.events.map((event) => (
              <DailyInfoTableRow event={event} handleDelete={handleDelete} handleOpenEdit={handleOpenEdit} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default DailyTransactions;

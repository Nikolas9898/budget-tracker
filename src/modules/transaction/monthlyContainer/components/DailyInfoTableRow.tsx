import React from 'react';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {TransactionEventWithAmountNumber, TransactionTypes} from '../../../../models/Transaction';
import {isTransactionTypeIncome, isTransactionTypeExpense} from '../../../../helpers/TransactionHelpers';
import classes from '../MonthlyStyle.module.css';

type Props = {
  handleDelete: (eventId: string) => void;
  handleOpenEdit: (event: TransactionEventWithAmountNumber) => void;
  event: TransactionEventWithAmountNumber;
};
const DailyInfoTableRow: React.FC<Props> = ({handleDelete, handleOpenEdit, event}) => {
  const {category, from, account, to, type, amount, _id: eventId} = event;
  return (
    <tr>
      <th>
        {category}
        {from}
      </th>
      <th>
        {account}
        {to}
      </th>
      <th className={`text-${type === TransactionTypes.INCOME ? 'success' : 'dark  '}`}>
        {isTransactionTypeIncome(type, amount)}
      </th>
      <th className={`text-${type === TransactionTypes.EXPENSE ? 'danger' : 'dark  '}`}>
        {isTransactionTypeExpense(type, amount)}
      </th>
      <th>
        <div className="row  ">
          <FontAwesomeIcon onClick={() => handleOpenEdit(event)} icon={faPen} className={classes.actions} />
          <FontAwesomeIcon onClick={() => handleDelete(eventId)} icon={faTrash} className={classes.actions} />
        </div>
      </th>
    </tr>
  );
};
export default DailyInfoTableRow;

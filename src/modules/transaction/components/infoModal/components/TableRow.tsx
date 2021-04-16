import React from 'react';
import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {isTransactionTypeIncome, isTransactionTypeExpense} from '../../../../../helpers/Variables';
import {TransactionEvent, TransactionEventWithAmountNumber} from '../../../../../models/Transaction';
import styles from '../infoModalStyle.module.css';

type Props = {
  handleDelete: (eventId: string) => void;
  handleOpenEdit: (event: TransactionEventWithAmountNumber) => void;
  event: TransactionEventWithAmountNumber;
};
const TableRow: React.FC<Props> = ({handleDelete, handleOpenEdit, event}) => {
  const {category, from, account, to, type, amount, _id: eventId} = event;
  return (
    <tr>
      <th className={styles.content_row}>
        {category}
        {from}
      </th>
      <th className={styles.content_row}>
        {account}
        {to}
      </th>
      <th className={styles.content_row}>{isTransactionTypeIncome(type, amount)}</th>
      <th className={styles.content_row}>{isTransactionTypeExpense(type, amount)}</th>
      <th className={styles.content_row}>
        <div className={styles.function_container}>
          <FontAwesomeIcon className={styles.edit} onClick={() => handleOpenEdit(event)} icon={faPen} />
          <FontAwesomeIcon className={styles.delete} onClick={() => handleDelete(eventId)} icon={faTrash} />
        </div>
      </th>
    </tr>
  );
};
export default TableRow;

import React, {useCallback} from 'react';

import {TransactionEventWithAmountNumber, TransactionTypes} from '../../../../models/Transaction';
import {isTransactionTypeIncome, isTransactionTypeExpense} from '../../../../helpers/TransactionHelpers';

type Props = {
  handleOpenEdit: (event: TransactionEventWithAmountNumber) => void;
  event: TransactionEventWithAmountNumber;
};
const DailyInfoTableRow: React.FC<Props> = ({handleOpenEdit, event}) => {
  const {category, from, account, to, type, amount, currency} = event;
  const openEdit = useCallback(() => {
    handleOpenEdit(event);
  }, [event]);
  return (
    <tr role="button" onClick={openEdit}>
      <th>
        {category}
        {from}
      </th>
      <th>
        {account}
        {to}
      </th>
      <th className={`text-${type === TransactionTypes.INCOME ? 'success' : 'dark  '}`}>
        {isTransactionTypeIncome(type, amount)} {currency}
      </th>
      <th className={`text-${type === TransactionTypes.EXPENSE ? 'danger' : 'dark  '}`}>
        {isTransactionTypeExpense(type, amount)} {currency}
      </th>
    </tr>
  );
};
export default DailyInfoTableRow;

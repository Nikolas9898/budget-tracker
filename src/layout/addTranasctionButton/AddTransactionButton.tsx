import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {TransactionTypes} from '../../models/Transaction';
import {
  transactionInputChange,
  setTransaction,
  setIsTransactionOpen
} from '../../modules/transaction/actions/transactionActions';
import AddTransactionModal from '../../modules/transaction/components/addTransactionModal/AddTransactionModal';
import {validateTransaction} from '../../helpers/Validation';

import {
  createTransactionRequest,
  deleteTransaction,
  editTransaction
} from '../../modules/transaction/service/TransactionService';
import classes from '../../modules/transaction/dailyContainer/DailyStyle.module.css';
import {UnitOfTime} from '../../models/Clendar';
import {getTransaction} from '../../helpers/TransactionHelpers';
import {getTransactionState} from '../../helpers/transactionSelectors';

const AddTransactionButton = (): JSX.Element => {
  const [errors, setErrors] = useState({
    account: '',
    from: '',
    category: '',
    to: '',
    amount: ''
  });
  const dispatch = useDispatch();

  const stateTransaction = useSelector(getTransactionState);

  const {transactionId, _id: transactionEventId} = stateTransaction.transactionEvent;

  const clearState = () => {
    setErrors({account: '', from: '', category: '', to: '', amount: ''});
    dispatch(setIsTransactionOpen());
    dispatch(
      setTransaction({
        _id: '',
        type: TransactionTypes.INCOME,
        date: Moment().toDate(),
        account: '',
        from: '',
        category: '',
        fees: '0',
        to: '',
        amount: '0',
        note: '',
        description: '',
        transactionId: ''
      })
    );
  };
  const handleSave = async () => {
    const validationErrors = validateTransaction(stateTransaction.transactionEvent);
    const isValid = Object.values(validationErrors).filter(Boolean).length <= 0;
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    const event = getTransaction(stateTransaction.transactionEvent);
    if (transactionId) {
      await editTransaction(transactionId, transactionEventId, event.events[0]);
    } else {
      await createTransactionRequest(event);
    }

    clearState();
  };
  const handleDelete = async (eventId: string) => {
    await deleteTransaction(transactionId, eventId);
    clearState();
  };

  const handleOpenTransaction = () => {
    if (stateTransaction.isTransactionOpen) {
      clearState();
    } else {
      dispatch(setIsTransactionOpen());
      dispatch(
        transactionInputChange({
          target: {
            name: UnitOfTime.DATE,
            value: stateTransaction.date
          }
        })
      );
    }
  };

  return (
    <>
      <FontAwesomeIcon className={classes.add_button} icon={faPlusCircle} onClick={handleOpenTransaction} />

      <AddTransactionModal
        isAddTransactionOpen={stateTransaction.isTransactionOpen}
        transactionEvent={stateTransaction.transactionEvent}
        errors={errors}
        isEditTransactionOpen={transactionId.length > 0}
        handleInputChange={(event) => dispatch(transactionInputChange(event))}
        handleSave={handleSave}
        handleOpenTransaction={handleOpenTransaction}
        handleOpenEdit={clearState}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default AddTransactionButton;

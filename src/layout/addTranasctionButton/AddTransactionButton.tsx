import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {TransactionReducer} from '../../models/Transaction';
import {handleInput, setTransaction, setDate} from '../../modules/transaction/actions/transactionActions';
import AddTransactionModal from '../../modules/transaction/components/addTransactionModal/AddTransactionModal';
import {validateTransaction} from '../../helpers/Validation';
import {getTransaction, UnitOfTime} from '../../helpers/Variables';
import {
  createTransactionRequest,
  deleteTransaction,
  editTransaction
} from '../../modules/transaction/service/TransactionService';
import styles from '../../modules/transaction/dailyContainer/DailyStyle.module.css';

const AddTransactionButton = (): JSX.Element => {
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [errors, setErrors] = useState({
    account: '',
    from: '',
    category: '',
    to: '',
    amount: ''
  });
  const dispatch = useDispatch();

  const stateTransaction = useSelector((state: {transactionReducer: TransactionReducer}) => state.transactionReducer);

  const {transactionId, _id: transactionEventId} = stateTransaction.transactionEvent;

  const clearState = () => {
    setErrors({account: '', from: '', category: '', to: '', amount: ''});
    setIsTransactionOpen(false);
    // dispatch(setDate(stateTransaction.date));
    dispatch(
      setTransaction({
        _id: '',
        type: 'income',
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
      setErrors(errors);
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
    if (isTransactionOpen) {
      clearState();
    } else {
      setIsTransactionOpen(true);
      dispatch(
        handleInput({
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
      <FontAwesomeIcon className={styles.add_button} icon={faPlusCircle} onClick={handleOpenTransaction} />

      <AddTransactionModal
        isAddTransactionOpen={isTransactionOpen}
        transactionEvent={stateTransaction.transactionEvent}
        errors={errors}
        isEditTransactionOpen={transactionId.length > 0}
        handleInputChange={(event) => dispatch(handleInput(event))}
        handleSave={handleSave}
        handleOpenTransaction={handleOpenTransaction}
        handleOpenEdit={clearState}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default AddTransactionButton;

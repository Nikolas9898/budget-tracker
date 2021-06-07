import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Moment from 'moment';
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
  editTransaction,
  getAccounts
} from '../../modules/transaction/service/TransactionService';
import '../navBar/NavBarStyle.css';
import {UnitOfTime} from '../../models/Clendar';
import {getTransaction} from '../../helpers/TransactionHelpers';
import {getTransactionState} from '../../helpers/transactionSelectors';
import {getUserAccounts} from '../../helpers/userSelectors';
import {setAccounts} from '../../modules/login/actions/usersActions';

const AddTransactionButton = (): JSX.Element => {
  const [errors, setErrors] = useState({
    account: '',
    from: '',
    category: '',
    to: '',
    amount: '',
    fees: ''
  });
  const dispatch = useDispatch();

  const stateTransaction = useSelector(getTransactionState);
  const userAccounts = useSelector(getUserAccounts);
  const {transactionId, _id: transactionEventId} = stateTransaction.transactionEvent;

  const clearState = () => {
    setErrors({account: '', from: '', category: '', to: '', amount: '', fees: ''});
    // dispatch(setIsTransactionOpen());
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
    const validationErrors = validateTransaction(stateTransaction.transactionEvent, userAccounts);
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
    const response = await getAccounts();
    dispatch(setAccounts(response.data));

    clearState();
  };
  const handleDelete = async (eventId: string) => {
    await deleteTransaction(transactionId, eventId);
    const response = await getAccounts();
    dispatch(setAccounts(response.data));
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
  const {isTransactionOpen} = stateTransaction;

  return (
    <div>
      <button type="button" className="btn add_button navBarBtn ml-2" onClick={handleOpenTransaction}>
        Add Transaction
      </button>
      {(isTransactionOpen || transactionId.length) > 0 && (
        <AddTransactionModal
          transactionEvent={stateTransaction.transactionEvent}
          errors={errors}
          isEditTransactionOpen={transactionId.length > 0}
          handleInputChange={(event) => dispatch(transactionInputChange(event))}
          handleSave={handleSave}
          handleOpenTransaction={handleOpenTransaction}
          handleOpenEdit={clearState}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AddTransactionButton;

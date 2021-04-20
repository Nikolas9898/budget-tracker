import React, {useCallback} from 'react';
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import styles from './AddTransactionStyle.module.css';
import {TransactionEvent} from '../../../../models/Transaction';
import {Error} from '../../../../models/Error';
import {HandleInput} from '../../../../models/Function';
import {TransactionTypes} from '../../../../helpers/Variables';
import Form from './form/Form';

type Props = {
  isAddTransactionOpen: boolean;
  transactionEvent: TransactionEvent;
  errors: Error;
  isEditTransactionOpen: boolean;
  handleInputChange: (event: HandleInput) => void;
  handleSave: () => void;
  handleOpenTransaction: (date: Date) => void;
  handleOpenEdit: (event: TransactionEvent) => void;
  handleDelete: (eventId: string) => void;
};

const AddTransactionModal: React.FC<Props> = ({
  isAddTransactionOpen,
  transactionEvent,
  handleInputChange,
  errors,
  handleSave,
  handleOpenTransaction,
  isEditTransactionOpen,
  handleOpenEdit,
  handleDelete
}) => {
  const ChooseCategory = (event: string) => {
    switch (event) {
      case TransactionTypes.INCOME:
        return 0;
      case TransactionTypes.EXPENSE:
        return 1;
      case TransactionTypes.TRANSFER:
        return 2;
      default:
        return 0;
    }
  };

  const handleOpen = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isEditTransactionOpen ? handleOpenEdit(transactionEvent) : handleOpenTransaction(Moment().toDate());
  }, [handleOpenEdit, handleOpenTransaction, isEditTransactionOpen, transactionEvent]);
  const handleSetIncomeType = useCallback(() => {
    handleInputChange({
      target: {value: TransactionTypes.INCOME, name: 'type'}
    });
  }, [handleInputChange]);
  const handleSetExpenseType = useCallback(() => {
    handleInputChange({
      target: {value: TransactionTypes.EXPENSE, name: 'type'}
    });
  }, [handleInputChange]);
  const handleSetTransferType = useCallback(() => {
    handleInputChange({
      target: {value: TransactionTypes.TRANSFER, name: 'type'}
    });
  }, [handleInputChange]);
  const handleDeleteTransaction = useCallback(() => {
    const {_id: transactionEventId} = transactionEvent;

    handleDelete(transactionEventId);
  }, [handleDelete, transactionEvent]);
  return (
    <div>
      {isAddTransactionOpen || isEditTransactionOpen ? (
        <div className={styles.modal_wrapper}>
          <div className={styles.container}>
            <FontAwesomeIcon className={styles.close_button} onClick={handleOpen} icon={faTimesCircle} />
            <Tabs selectedTabClassName={styles.selected_tab} selectedIndex={ChooseCategory(transactionEvent.type)}>
              <TabList className={styles.tab_list}>
                <Tab className={styles.tab} onClick={handleSetIncomeType}>
                  <span>Income</span>
                </Tab>
                <Tab className={styles.tab} onClick={handleSetExpenseType}>
                  <span>Expense</span>
                </Tab>
                <Tab className={styles.tab} onClick={handleSetTransferType}>
                  <span>Transfer</span>
                </Tab>
              </TabList>

              <TabPanel>
                <Form transaction={transactionEvent} handleInputChange={handleInputChange} errors={errors} />
              </TabPanel>
              <TabPanel>
                <Form transaction={transactionEvent} handleInputChange={handleInputChange} errors={errors} />
              </TabPanel>
              <TabPanel>
                <Form transaction={transactionEvent} handleInputChange={handleInputChange} errors={errors} />
              </TabPanel>
            </Tabs>
            <input
              type="text"
              className={styles.input}
              name="description"
              value={transactionEvent.description}
              onChange={handleInputChange}
            />

            {isEditTransactionOpen ? (
              <div className={styles.buttons_content}>
                <button type="button" className={styles.save_button} onClick={handleSave}>
                  Save
                </button>

                <button type="button" className={styles.delete_button} onClick={handleDeleteTransaction}>
                  Delete
                </button>
              </div>
            ) : (
              <div className={styles.buttons_content}>
                <button type="button" className={styles.save_button} onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddTransactionModal;

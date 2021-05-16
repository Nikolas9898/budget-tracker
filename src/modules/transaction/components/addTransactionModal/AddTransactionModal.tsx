import React, {useCallback, useEffect} from 'react';
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import Moment from 'moment';
import {Modal as BootstrapModal} from 'bootstrap';
import {useDispatch} from 'react-redux';
import classes from './AddTransactionStyle.module.css';
import {TransactionEvent, TransactionTypes} from '../../../../models/Transaction';
import {Error} from '../../../../models/Error';
import {HandleInputChange} from '../../../../models/Function';

import Form from './form/Form';
import {setIsTransactionOpen} from '../../actions/transactionActions';

type Props = {
  transactionEvent: TransactionEvent;
  errors: Error;
  isEditTransactionOpen: boolean;
  handleInputChange: (event: HandleInputChange) => void;
  handleSave: () => void;
  handleOpenTransaction: (date: Date) => void;
  handleOpenEdit: (event: TransactionEvent) => void;
  handleDelete: (eventId: string) => void;
};

const AddTransactionModal: React.FC<Props> = ({
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

  const dispatch = useDispatch();

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

  useEffect(() => {
    const myModal = new BootstrapModal('#RealBootstrapModal');
    myModal.show();

    const myModalDom = document.getElementById('RealBootstrapModal');
    myModalDom?.addEventListener('hidden.bs.modal', () => {
      dispatch(setIsTransactionOpen());
      handleOpen();
    });
  }, []);
  return (
    <div
      className="modal fade"
      id="RealBootstrapModal"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
            <FontAwesomeIcon
              className={classes.close_button}
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleOpen}
              icon={faTimesCircle}
            />

            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" /> */}
          </div>
          <div className="modal-body justify-content-center">
            <Tabs selectedTabClassName={classes.selected_tab} selectedIndex={ChooseCategory(transactionEvent.type)}>
              <TabList className="row w-100 justify-content-center">
                <Tab className={classes.tab} onClick={handleSetIncomeType}>
                  Income
                </Tab>
                <Tab className={classes.tab} onClick={handleSetExpenseType}>
                  Expense
                </Tab>
                <Tab className={classes.tab} onClick={handleSetTransferType}>
                  Transfer
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

            <textarea
              className={classes.input_description}
              name="description"
              value={transactionEvent.description}
              onChange={handleInputChange}
            />
          </div>
          <div className={`modal-footer justify-content-center ${classes.input_description}`}>
            {isEditTransactionOpen ? (
              <div className={classes.buttons_content}>
                <button type="button" className={classes.save_button} data-bs-dismiss="modal" onClick={handleSave}>
                  Save
                </button>

                <button
                  type="button"
                  className={classes.delete_button}
                  data-bs-dismiss="modal"
                  onClick={handleDeleteTransaction}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className={classes.buttons_content}>
                <button type="button" className={classes.save_button} data-bs-dismiss="modal" onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    // ______________________________________________________________________________________________________________________________

    // <div className={`${classes.modal_wrapper}`} id="RealBootstrapModal">
    //   <div className={` ${classes.container}`}>
    // <FontAwesomeIcon className={classes.close_button} onClick={handleOpen} icon={faTimesCircle} />
    //     <Tabs selectedTabClassName={classes.selected_tab} selectedIndex={ChooseCategory(transactionEvent.type)}>
    //       <TabList className="row w-100 justify-content-center">
    //         <Tab className={classes.tab} onClick={handleSetIncomeType}>
    //           Income
    //         </Tab>
    //         <Tab className={classes.tab} onClick={handleSetExpenseType}>
    //           Expense
    //         </Tab>
    //         <Tab className={classes.tab} onClick={handleSetTransferType}>
    //           Transfer
    //         </Tab>
    //       </TabList>

    //       <TabPanel>
    //         <Form transaction={transactionEvent} handleInputChange={handleInputChange} errors={errors} />
    //       </TabPanel>
    //       <TabPanel>
    //         <Form transaction={transactionEvent} handleInputChange={handleInputChange} errors={errors} />
    //       </TabPanel>
    //       <TabPanel>
    //         <Form transaction={transactionEvent} handleInputChange={handleInputChange} errors={errors} />
    //       </TabPanel>
    //     </Tabs>

    //     <textarea
    //       className={classes.input_description}
    //       name="description"
    //       value={transactionEvent.description}
    //       onChange={handleInputChange}
    //     >
    //       The cat was playing in the garden.
    //     </textarea>
    //     {isEditTransactionOpen ? (
    //       <div className={classes.buttons_content}>
    //         <button type="button" className={classes.save_button} onClick={handleSave}>
    //           Save
    //         </button>

    //         <button type="button" className={classes.delete_button} onClick={handleDeleteTransaction}>
    //           Delete
    //         </button>
    //       </div>
    //     ) : (
    //       <div className={classes.buttons_content}>
    //         <button type="button" className={classes.save_button} onClick={handleSave}>
    //           Save
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default AddTransactionModal;

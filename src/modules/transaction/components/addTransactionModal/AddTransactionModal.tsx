import React, { useCallback } from "react";
import styles from "./AddTransactionStyle.module.css";
import { TransactionEvent } from "../../../../models/Transaction";
import { Error } from "../../../../models/Error";
import { HandleInput } from "../../../../models/Function";
import { Income, Transfer, Expense } from "../../../../helpers/Variables";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import Form from "./form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";

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
  handleDelete,
}) => {
  const ChooseCategory = (event: string) => {
    switch (event) {
      case Income:
        return 0;
      case Expense:
        return 1;
      case Transfer:
        return 2;
    }
  };

  const handleOpen = useCallback(() => {
    isEditTransactionOpen
      ? handleOpenEdit(transactionEvent)
      : handleOpenTransaction(Moment().toDate());
  }, [isEditTransactionOpen, transactionEvent]);
  const handleSetIncomeType = useCallback(() => {
    handleInputChange({
      target: { value: Income, name: "type" },
    });
  }, []);
  const handleSetExpenseType = useCallback(() => {
    handleInputChange({
      target: { value: Expense, name: "type" },
    });
  }, []);
  const handleSetTransferType = useCallback(() => {
    handleInputChange({
      target: { value: Transfer, name: "type" },
    });
  }, []);
  const handleDeleteTransaction = useCallback(() => {
    handleDelete(transactionEvent._id);
  }, [transactionEvent._id]);
  return (
    <div>
      {isAddTransactionOpen || isEditTransactionOpen ? (
        <div className={styles.modal_wrapper}>
          <div className={styles.container}>
            <FontAwesomeIcon
              className={styles.close_button}
              onClick={handleOpen}
              icon={faTimesCircle}
            />
            <Tabs
              selectedTabClassName={styles.selected_tab}
              selectedIndex={ChooseCategory(transactionEvent.type)}
            >
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
                <Form
                  transaction={transactionEvent}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
              </TabPanel>
              <TabPanel>
                <Form
                  transaction={transactionEvent}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
              </TabPanel>
              <TabPanel>
                <Form
                  transaction={transactionEvent}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
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
                <button className={styles.save_button} onClick={handleSave}>
                  Save
                </button>

                <button
                  className={styles.delete_button}
                  onClick={handleDeleteTransaction}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className={styles.buttons_content}>
                <button className={styles.save_button} onClick={handleSave}>
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

import React from "react";
import AddTransactionStyle from "./AddTransactionStyle.module.css";
import {
  Errors,
  HandleInput,
  TransactionEvent,
} from "../../../../helpers/ITransactions";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import Form from "./form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  isAddTransactionOpen: boolean;
  transactionEvent: TransactionEvent;
  errors: Errors;
  isEditTransactionOpen: boolean;
  handleInputChange: (event: HandleInput) => void;
  handleSave: () => void;
  handleOpenTransaction: (date: Date) => void;
  handleOpenEdit: (evnt: TransactionEvent) => void;
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
      case "income":
        return 0;
      case "expense":
        return 1;
      case "transfer":
        return 2;
    }
  };
  return (
    <div>
      {isAddTransactionOpen || isEditTransactionOpen ? (
        <div className={AddTransactionStyle.modal_wrapper}>
          <div className={AddTransactionStyle.container}>
            <FontAwesomeIcon
              className={AddTransactionStyle.close_button}
              onClick={() =>
                isEditTransactionOpen
                  ? handleOpenEdit(transactionEvent)
                  : handleOpenTransaction(new Date())
              }
              icon={faTimesCircle}
            />
            <Tabs
              selectedTabClassName={AddTransactionStyle.selected_tab}
              selectedIndex={ChooseCategory(transactionEvent.type)}
            >
              <TabList className={AddTransactionStyle.tab_list}>
                <Tab
                  className={AddTransactionStyle.tab}
                  onClick={() => {
                    handleInputChange({
                      target: { value: "income", name: "type" },
                    });
                  }}
                >
                  <span>Income</span>
                </Tab>
                <Tab
                  key="expense"
                  className={AddTransactionStyle.tab}
                  onClick={() => {
                    handleInputChange({
                      target: { value: "expense", name: "type" },
                    });
                  }}
                >
                  <span>Expense</span>
                </Tab>
                <Tab
                  className={AddTransactionStyle.tab}
                  onClick={() =>
                    handleInputChange({
                      target: { value: "transfer", name: "type" },
                    })
                  }
                >
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
              className={AddTransactionStyle.input}
              name="description"
              value={transactionEvent.description}
              onChange={handleInputChange}
            />

            {isEditTransactionOpen ? (
              <div className={AddTransactionStyle.buttons_content}>
                <button
                  className={AddTransactionStyle.save_button}
                  onClick={() => handleSave()}
                >
                  Save
                </button>
                {console.log(transactionEvent._id)}
                <button
                  className={AddTransactionStyle.delete_button}
                  onClick={() => handleDelete(transactionEvent._id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className={AddTransactionStyle.buttons_content}>
                <button
                  className={AddTransactionStyle.save_button}
                  onClick={() => handleSave()}
                >
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

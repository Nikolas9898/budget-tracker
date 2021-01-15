import React from "react";
import AddTransactionStyl from "./AddTransactionStyle.module.css";
import { State } from "../../monthlyContainer/TransactionContainer";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import Form from "./form/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";


type Props = {
  isAddTransactionOpen: boolean;
  transaction: State["transaction"];
  errors: State["errors"];
  handleInputChange: (event: {
    target: {
      value: string;
      name: string;
    };
  }) => void;
  handleSave: () => void;
  isTransfer: boolean;
  handleOpenTransaction:(date:any)=>void;
};

const AddTransactionModal: React.FC<Props> = ({
  isAddTransactionOpen,
  transaction,
  handleInputChange,
  errors,
  handleSave,
  isTransfer,
  handleOpenTransaction,
}) => {
  return (
    <div>
      {isAddTransactionOpen ? (
        <div className={AddTransactionStyl.modal_wrapper}>
          <div className={AddTransactionStyl.container}>
            <FontAwesomeIcon
              className={AddTransactionStyl.close_button}
              onClick={()=>handleOpenTransaction("")}
              icon={faTimesCircle}
            />
            <Tabs selectedTabClassName={AddTransactionStyl.selected_tab}>
              <TabList className={AddTransactionStyl.tab_list}>
                <Tab
                  className={AddTransactionStyl.tab}
                  onClick={() =>
                    handleInputChange({
                      target: { value: "income", name: "type" },
                    })
                  }
                >
                  <span>Income</span>
                </Tab>
                <Tab
                  className={AddTransactionStyl.tab}
                  onClick={() =>
                    handleInputChange({
                      target: { value: "expense", name: "type" },
                    })
                  }
                >
                  <span>Expense</span>
                </Tab>
                <Tab
                  className={AddTransactionStyl.tab}
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
                  isTransfer={isTransfer}
                  transaction={transaction}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
              </TabPanel>
              <TabPanel>
                <Form
                  isTransfer={isTransfer}
                  transaction={transaction}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
              </TabPanel>
              <TabPanel>
                <Form
                  isTransfer={isTransfer}
                  transaction={transaction}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />
              </TabPanel>
            </Tabs>

            <input
                type="text"
                className={AddTransactionStyl.input}
                name="description"
                value={transaction.description}
                onChange={handleInputChange}
            />

            <div className={AddTransactionStyl.buttons_content}>
              <button
                className={AddTransactionStyl.save_button}
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddTransactionModal;

import React, { useState } from "react";
import { TransactionEvent } from "../../../../../../helpers/ITransactions";
import AddTransactionStyl from "../../AddTransactionStyle.module.css";
type Props = {
  transaction: TransactionEvent;
  feesIsOpen: boolean;
};

const InputTitles: React.FC<Props> = ({ transaction, feesIsOpen }) => {
  return (
    <div className={AddTransactionStyl.content_titles}>
      <div className={AddTransactionStyl.title}>Day</div>
      {transaction.type === "transfer" ? (
        <div className={AddTransactionStyl.title}>From</div>
      ) : (
        <div className={AddTransactionStyl.title}>Account</div>
      )}
      {transaction.type === "transfer" ? (
        <div className={AddTransactionStyl.title}>To</div>
      ) : (
        <div className={AddTransactionStyl.title}>Category</div>
      )}
      <div className={AddTransactionStyl.title}>Amount</div>
      {feesIsOpen ? <div className={AddTransactionStyl.title}>Fees</div> : null}
      <div className={AddTransactionStyl.title}>Note</div>
    </div>
  );
};
export default InputTitles;

import { Router } from "express";
import { tokenAuth } from "../../middleware/tokenAuthentication";
import * as transactionControler from "../../controlers/transactionControler/transaction.controler";

const router = Router();

router.post(
  "/transaction/create",
  tokenAuth,
  transactionControler.createTransaction
);

// router.post(
//   "/transaction/create/:type",
//   tokenAuth,
//   transactionControler.createTransaction
// );

router.get(
  "/transaction/specificDatePeriod/:from/:to",
  tokenAuth,
  transactionControler.getTransactionInSpecificDatePeriod
);

router.get(
  "/transaction/:id",
  tokenAuth,
  transactionControler.getTransactionById
);

router.put(
  "/transaction/edit/:id",
  tokenAuth,
  transactionControler.editTransaction
);

router.delete(
  "/transaction/delete/:id",
  tokenAuth,
  transactionControler.deleteTransactionById
);
router.post(
  "/transaction/getYearlyOrWeekly",
  tokenAuth,
  transactionControler.getYearlyAndWeekly
);

export default router;

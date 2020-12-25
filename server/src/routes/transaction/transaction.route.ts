import { Router } from "express";
import { tokenAuth } from "../../middleware/tokenAuthentication";
import * as transactionControler from "../../controlers/transactionControler/transaction.controler";

const router = Router();

router.post("/transfer/create", tokenAuth, transactionControler.createTransfer);

router.post(
  "/transaction/create/:type",
  tokenAuth,
  transactionControler.createTransaction
);
export default router;

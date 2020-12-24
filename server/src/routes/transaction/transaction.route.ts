import { Router } from "express";
import { tokenAuth } from "../../middleware/tokenAuthentication";
import * as transactionControler from "../../controlers/transactionControler/transaction.controler";

const router = Router();

router.post(
  "/transaction/create/transfer",
  tokenAuth,
  transactionControler.createTransfer
);

export default router;

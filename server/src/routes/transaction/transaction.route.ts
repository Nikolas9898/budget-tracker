import {Router} from 'express';
import {tokenAuth} from '../../middleware/tokenAuthentication';
import * as transactionControler from '../../controllers/transactionController/transaction.controller';

const router = Router();

router.post('/transaction/create', tokenAuth, transactionControler.createTransaction);

router.get(
  '/transaction/specificDatePeriod/:from/:to',
  tokenAuth,
  transactionControler.getTransactionInSpecificDatePeriod
);

router.get('/transaction/:id', tokenAuth, transactionControler.getTransactionById);

router.put('/transaction/event/edit/:transactionId/:event_id', tokenAuth, transactionControler.editTransactionEvent);
router.put(
  '/transaction/event/delete/:transactionId/:event_id',
  tokenAuth,
  transactionControler.deleteTransactionEvent
);

router.delete('/transaction/delete/:id', tokenAuth, transactionControler.deleteTransactionById);

router.post('/transaction/getYearlyOrWeekly', tokenAuth, transactionControler.getYearlyAndWeekly);

export default router;

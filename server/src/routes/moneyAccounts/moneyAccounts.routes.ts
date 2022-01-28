import {Router} from 'express';
import {tokenAuth} from '../../middleware/tokenAuthentication';
import * as moneyAccountsController from '../../controllers/moneyAccountsContoller/moneyAccounts.controller';

const router = Router();

router.get('/moneyAccounts', tokenAuth, moneyAccountsController.getMoneyAccountsByUserId);

export default router;

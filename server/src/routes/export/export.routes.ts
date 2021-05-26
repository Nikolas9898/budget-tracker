import {Router} from 'express';
import {tokenAuth} from '../../middleware/tokenAuthentication';
import * as exportController from '../../controllers/exportController/export.controller';

const router = Router();

router.post('/export/:from/:to/:type', tokenAuth, exportController.exportTransactionByFilters);

export default router;

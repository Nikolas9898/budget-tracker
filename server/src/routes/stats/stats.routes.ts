import {Router} from 'express';
import {tokenAuth} from '../../middleware/tokenAuthentication';
import * as statsContoller from '../../controllers/statsController/stats.controller';

const router = Router();

router.get('/stats/:from/:to', tokenAuth, statsContoller.getStats);

export default router;

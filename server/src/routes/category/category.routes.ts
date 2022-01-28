import {Router} from 'express';
import {tokenAuth} from '../../middleware/tokenAuthentication';
import * as categoryController from '../../controllers/categoryController/category.controller';

const router = Router();

router.get('/category', tokenAuth, categoryController.getUserCategories);

export default router;

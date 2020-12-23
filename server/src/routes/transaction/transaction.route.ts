import { Router } from "express";
const router = Router();

import * as userController from "../../controlers/userControler/user.controler";
import { tokenAuth } from "../../middleware/tokenAuthentication";

export default router;

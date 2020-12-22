import { Router } from "express";
const router = Router();

import * as userController from "../../controlers/userControler/user.controler";
import { tokenAuth } from "../../middleware/tokenAuthentication";

router.post("/signUp", userController.signUp);
router.get("/user/:id", tokenAuth, userController.getById);

export default router;

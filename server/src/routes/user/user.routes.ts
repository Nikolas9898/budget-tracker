import { Router } from "express";
const router = Router();

import * as userController from "../../controlers/userControler/user.controler";

router.post("/signUp", userController.signUp);

export default router;

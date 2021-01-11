import { Router } from "express";
import { tokenAuth } from "../../middleware/tokenAuthentication";
import * as userController from "../../controlers/userControler/user.controler";

const router = Router();

router.get("/user/:id", tokenAuth, userController.getById);

export default router;

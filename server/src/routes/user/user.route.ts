import { Router } from "express";
import { tokenAuth } from "../../middleware/tokenAuthentication";
import * as userController from "../../controllers/userControler/user.controller";

const router = Router();

router.get("/user/logged", tokenAuth, userController.getLoggedUser);

export default router;

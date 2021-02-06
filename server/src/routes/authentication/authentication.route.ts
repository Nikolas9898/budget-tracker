import { Router } from "express";
import * as authControler from "../../controllers/authContoler/auth.controller";

const router = Router();

router.post("/signUp", authControler.signUp);
router.post("/signIn", authControler.signIn);

export default router;

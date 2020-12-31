import { Router } from "express";
import * as authControler from "../../controlers/authContoler/auth.controler";

const router = Router();

router.post("/signUp", authControler.signUp);
router.post("/signIn", authControler.signIn);

export default router;

import { Router } from "express";
const router = Router();

import * as signInControler from "../../controlers/signInControler/signIn.controler";

router.post("/signIn", signInControler.signIn);

export default router;

// routes/signup.routes.js 
import signup_controller from "../controller/signup.controller.js";
import { Router } from "express";

const router = Router();

router.post('/', signup_controller);

export default router;
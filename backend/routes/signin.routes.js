import { Router } from "express";
import signin_controller from "../controller/signin.controller.js";

const router = Router();

router.post('/', signin_controller);

export default router;
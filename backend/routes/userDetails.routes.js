// UserDetails.routes.js 
import { Router } from "express";
import { UserDetails, subscriptionDetails } from "../controller/userDetails.controller.js";
import { subscriptions } from './../controller/userDetails.controller.js'

const router = Router();

router.get("/", UserDetails);
router.put("/subscriptions/:id", subscriptions);
router.get("/subscriptiondetails", subscriptionDetails);

export default router;
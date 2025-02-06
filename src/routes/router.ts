import express from "express";
import { getHomePage } from "../controllers/homeController";
import { postCheckoutPage } from "../controllers/checkoutControllers";
import { getCompletePage } from "../controllers/completeControllers";
import { getCancelPage } from "../controllers/cancelControllers";

const router = express.Router();
router.get("/", getHomePage);
router.post("/checkout", postCheckoutPage);
router.get("/complete", getCompletePage);
router.get("/cancel", getCancelPage);

export default router;

import express from "express";
import { changeProductQuantity } from "../controllers/cartControllers.js";
import { protect } from "../middlewares/authMws.js";

const router = express.Router();

router.route("/set-new-item").post(protect, changeProductQuantity);

export default router;

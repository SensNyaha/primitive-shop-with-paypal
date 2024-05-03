import express from "express";
import { setCartContent } from "../controllers/cartControllers.js";
import { protect } from "../middlewares/authMws.js";

const router = express.Router();

router.route("/set-cart").post(protect, setCartContent);

export default router;

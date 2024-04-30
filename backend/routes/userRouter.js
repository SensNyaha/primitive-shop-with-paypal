import express from "express";
import {
    authUser,
    getUserProfile,
    registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMws.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router.route("/profile").get(protect, getUserProfile);

export default router;

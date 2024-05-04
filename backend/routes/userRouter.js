import express from "express";
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMws.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;

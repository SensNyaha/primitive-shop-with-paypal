import express from "express";
import {
    getProductById,
    getProducts,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:_id").get(getProductById);

export default router;

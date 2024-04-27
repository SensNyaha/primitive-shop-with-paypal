import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        if (products) res.json(products.map((e) => e._id));
        else throw new Error("Couldn't get products list");
    } catch (e) {
        res.status(500).json({ success: false, code: 500, error: e.message });
    }
});

router.get("/:_id", async (req, res) => {
    try {
        const product = await Product.findById(req.params._id);

        if (product) res.json(product);
        else
            res.status(404).json({
                success: false,
                code: 404,
                error: "Not found",
            });
    } catch (e) {
        res.status(500).json({ success: false, code: 500, error: e.message });
    }
});

export default router;

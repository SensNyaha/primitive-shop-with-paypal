import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        if (products) res.json(products.map((e) => e._id));
        else throw new Error("Couldn't get products list");
    } catch (e) {
        return res.status(500).json({
            success: false,
            code: 500,
            error: e.message,
        });
    }
});
export const getProductById = asyncHandler(async (req, res) => {
    try {
        getProductById;
        const product = await Product.findById(req.params._id);

        if (!product)
            return res.status(404).json({
                success: false,
                code: 404,
                error: "The product with the same ID was not found in out store",
            });

        return res.json(product);
    } catch (e) {
        return res.status(500).json({
            success: false,
            code: 500,
            error: e.message,
        });
    }
});

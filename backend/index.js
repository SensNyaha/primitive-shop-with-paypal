import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";

import connectDB from "./config/connectDB.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
    res.send("");
});

app.get("/api/products/:_id?", async (req, res) => {
    try {
        const products = await Product.find({});
        if (req.params._id)
            res.json(products.filter((p) => p._id == req.params._id));
        else {
            res.json(products);
        }
    } catch (e) {
        res.status(500).json({ success: false, status: 500, error: e.message });
    }
});

connectDB().then(
    app.listen(process.env.PORT || 3001, () =>
        console.log(
            chalk.black.italic.bgCyanBright.bold(
                `${process.env.NODE_ENV} mode of server`
            )
        )
    )
);

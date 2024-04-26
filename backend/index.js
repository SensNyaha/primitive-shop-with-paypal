import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import chalk from "chalk";

import products from "./data/products.js";
import connectDB from "./config/connectDB.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
    await new User({
        name: "Pwe",
        email: "123123@asdasd.23",
        password: "1234",
    }).save();
    res.send("Hello");
});

app.get("/api/products/:_id?", (req, res) => {
    if (req.params._id)
        res.json(products.filter((p) => p._id == req.params._id));
    else res.json(products);
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

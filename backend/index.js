import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import chalk from "chalk";

import connectDB from "./config/connectDB.js";
import productRouter from "./routes/productRouter.js";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
    res.send("");
});

app.use("/api/products", productRouter);

connectDB().then(
    app.listen(process.env.PORT || 3001, () =>
        console.log(
            chalk.black.italic.bgCyanBright.bold(
                `${process.env.NODE_ENV} mode of server`
            )
        )
    )
);

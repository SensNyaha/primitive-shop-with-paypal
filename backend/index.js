import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import products from "./data/products.js";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => res.send("Hello"));

app.get("/api/products/:_id?", (req, res) => {
    if (req.params._id)
        res.json(products.filter((p) => p._id == req.params._id));
    else res.json(products);
});

app.listen(process.env.PORT || 3001, () =>
    console.log(`${process.env.NODE_ENV} mode of server`)
);

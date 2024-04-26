import mongoose, { SchemaTypes, Schema } from "mongoose";
import connectDB from "../config/connectDB.js";
import Category from "./Category.js";

const reviewSchema = Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const productSchema = Schema({
    author: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "/images/noimage.jpeg",
        validate: {
            validator: validateFileSystemPath,
            message: "Image Path is not valid",
        },
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "Others",
        validate: {
            validator: validateProductCategories,
            message: "Category must be one of the documented types",
        },
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        default: 0,
    },
});

function validateFileSystemPath(value) {
    return value.match(
        /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/
    )[2];
}

async function validateProductCategories(value) {
    let db = await connectDB();

    let cat = await Category.find({ type: value });

    db.disconnect();

    return !!cat;
}

export default mongoose.model("Product", productSchema, "products");

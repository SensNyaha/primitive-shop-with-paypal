import mongoose, { SchemaTypes, Schema } from "mongoose";

const categorySchema = Schema({
    type: {
        type: String,
        required: true,
    },
});
export default mongoose.model("Category", categorySchema, "productCategories");

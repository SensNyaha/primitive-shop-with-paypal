import mongoose, { SchemaTypes, Schema } from "mongoose";
import * as mongooseTypeUrl from "mongoose-type-url";

const productSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: SchemaTypes.Url,
    },
});

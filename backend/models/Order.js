import mongoose, { SchemaTypes, Schema } from "mongoose";

const orderSchema = Schema(
    {
        user: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: "User",
        },
        orderItems: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: SchemaTypes.ObjectId,
                    ref: "Product",
                    required: true,
                },
            },
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            default: false,
        },
        paymentResult: {
            if: { type: String },
            status: { type: String },
            updateTime: { type: Date },
            emailAddress: { type: String },
        },
        taxPrice: {
            type: Number,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: Date,
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema, "orders");

import mongoose, { SchemaTypes, Schema } from "mongoose";

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: validateUserEmail,
                message: "Email must be valid",
            },
        },
        password: {
            type: String,
            required: true,
            validate: [
                {
                    validator: validatePasswordLength,
                    message: "Password must contain 6 symbols at least",
                },
            ],
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

function validateUserEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePasswordLength(value) {
    return value.length > 5;
}

export default mongoose.model("User", userSchema, "users");

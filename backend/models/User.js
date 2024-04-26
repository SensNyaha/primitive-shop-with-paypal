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
                {
                    validator: validatePasswordStrength,
                    message:
                        "Password must contain at least one lower case & one upper case & one digit",
                },
            ],
        },
        isAdmin: {
            type: Boolean,
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
function validatePasswordStrength(value) {
    return (
        value.match(/.*[a-z].*/) &&
        value.match(/.*[A-Z].*/) &&
        value.match(/.*[0-9].*/)
    );
}
export default mongoose.model("User", userSchema, "users");

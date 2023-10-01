import mongoose, { STATES } from "mongoose";

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pwd: {
        type: String,
        required: true,
    },
});

export const UserModel = mongoose.model("users", UserSchema);
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    perkList: {
        type: [String],
        default: []
    }  
})

export const serviceModel = mongoose.model("services", serviceSchema);
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
    perks: [{
        details:{
            type: String
        }
    }]  
})

export const serviceModel = mongoose.model("services", serviceSchema);
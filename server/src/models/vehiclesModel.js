import mongoose, { Mongoose } from "mongoose";

const VehicleSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    name: {
        type: String
    },
    make: {
        type: String
    },
    model: {
        type: String
    },
    year: {
        type: Number
    },
    color: {
        type: String
    },
    details: {
        type: String
    },
})

export const vehicleModel = mongoose.model("vehicles", VehicleSchema);
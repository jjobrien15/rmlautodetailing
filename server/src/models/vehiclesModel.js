import mongoose, { Mongoose } from "mongoose";

const VehicleSchema = new mongoose.Schema({
    make: {
        type:String
    },
    model: {
        type:String
    },
    year: {
        type:Number
    },
    color: {
        type: String
    }
})

export const vehicleModel = mongoose.model("vehicles", VehicleSchema);
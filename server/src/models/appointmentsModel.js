import mongoose from "mongoose";


const AppointmentSchema = new mongoose.Schema({
    clientInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    serviceDate: {
        type: String,
        required: true,
    },
    serviceTime: {
        type: String
    },
});

export const appointmentModel = mongoose.model("appointments", AppointmentSchema);
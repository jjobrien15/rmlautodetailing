import express from "express";
import { appointmentModel } from "../models/appointmentsModel.js";
import { UserModel } from "../models/usersModel.js";
import { Types } from "mongoose";

const router = express.Router();

router.get("/viewAppointment", async (req, res) => {
    try {
        const response = await appointmentModel.find({})
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.post("/createAppointment", async (req, res) => {
    const appointment = await appointmentModel(req.body);
    try {
        const response = await appointment.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

router.put("/createAppointment", async (req, res) => {
    try {
        const appointment = await appointmentModel.findById(req.body.appointmentID);
        const user = await UserModel.findById(req.body.userID);
        user.appointments.push(appointment);
        await user.save();
        res.json({appointments: user.appointments});
    } catch (err) {
        console.log(err);
    }
});

router.get("/appointments/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({ savedAppointments: user?.appointments });
    } catch (err) {
        console.log(err);
   }
});

router.get("/appointments/:userID", async (req, res) => {
    try {
        const userAppointments = await appointmentModel.find({ "clientInfo": new Types.ObjectId(req.params.userID)}).sort("serviceDate");
        res.json(userAppointments);
    } catch (err) {
        console.log(err);
   }
});

router.delete("/deleteAppointment/:apptID", async (req, res) => {   
    try {
        const userAppointment = await appointmentModel.deleteOne({ "_id": req.params.apptID});
        res.json(userAppointment);
    } catch (err) {
        console.log(err);
   }
})

export { router as appointmentRouter };
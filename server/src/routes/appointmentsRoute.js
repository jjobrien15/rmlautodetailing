import express from "express";
import mongoose from "mongoose";
import { appointmentModel } from "../models/appointmentsModel.js";
import { UserModel } from "../models/usersModel.js";
import { ObjectId } from "mongodb";

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
        const userAppointments = await appointmentModel.find({ "clientInfo": new mongoose.Types.ObjectId(req.params.userID)});
        res.json(userAppointments);
    } catch (err) {
        console.log(err);
   }
});

export { router as appointmentRouter };
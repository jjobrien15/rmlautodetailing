import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/verifyToken.js";

import { appointmentModel } from "../models/appointmentsModel.js";
import { vehicleModel } from "../models/vehiclesModel.js";
import { UserModel } from "../models/usersModel.js";

import "dotenv/config"

const router = express.Router();

/************************************************* GETS *****************************************************/

//Get all client appointments for appointments page
router.get("/appointments/:userId", verifyToken, async (req, res) => {
    try {
        const userAppointments = await appointmentModel.find({ clientId: req.params.userId }).sort("serviceDate");
        res.json(userAppointments);
    } catch (err) {
        console.log(err);
    }
});

//Get all users vehicles
router.get("/vehicles/:userId", async (req, res) => {
    try {
        const userVehicles = await vehicleModel.find({ clientId: req.params.userId })
        res.json(userVehicles);
    } catch (err) {
        console.log(err);
    }
})

/********************************************* POSTS ********************************************/

//Creates a new Appointment
router.post("/createAppointment", async (req, res) => {
    const appointment = await appointmentModel(req.body);
    try {
        const response = await appointment.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//Creates a new Vehicle
router.post("/createVehicle", async (req, res) => {
    const vehicle = await vehicleModel(req.body);
    
    try {
        const response = await vehicle.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

/******************************************** PUTS *******************************************/

//Not used update path
/*router.put("/createAppointment", async (req, res) => {
    try {
        const appointment = await appointmentModel.findById(req.body.appointmentID);
        const user = await UserModel.findById(req.body.userID);
        user.appointments.push(appointment);
        await user.save();
        res.json({appointments: user.appointments});
    } catch (err) {
        console.log(err);
    }
});*/

//Updates user profile.
router.put("/updateUser", async (req, res) => {
    try {
        const { userId, email, fname, lname } = req.body;
        const user = await UserModel.findOne({ _id:userId });
        const emailExists = await UserModel.findOne({ email });

        //Checking if email is in use and not used by current user.
        if (emailExists && user.email !== email) {
            return res.json({ error: true, message: "Email is already in use." });
        } else {
            await UserModel.updateOne({ _id: userId }, {email, fname, lname});
        }

        res.json({error: false, message: "User updated successfully!"});
    } catch (err) {
        console.log(err);
    }
});

router.put("/editVehicle", async (req, res) => {
    try {
        const vehicle = req.body;
        await vehicleModel.updateOne({ _id: vehicle.vehicleId }, req.body);
        res.json({ error: false, message: "Vehicle updated successfully!" });
    } catch (err) {
        console.log(err);
    }
})

/******************************************** DELETES ******************************************************/
//Deletes Client Appointment
router.delete("/deleteAppointment/:apptId", async (req, res) => {   
    try {
        await appointmentModel.deleteOne({ "_id": req.params.apptId});
        res.json({ error: false, message:"Appointment Successfully Deleted!" });
    } catch (err) {
        console.log(err);
   }
})
//Delete Client Vehicle
router.delete("/deleteVehicle/:vehicleId", async (req, res) => {   
    try {
        await vehicleModel.deleteOne({ "_id": req.params.vehicleId });
        res.json({ error:false, message: "Vehicle Successfully Deleted!" });
    } catch (err) {
        console.log(err);
   }
})

export { router as profileRouter };
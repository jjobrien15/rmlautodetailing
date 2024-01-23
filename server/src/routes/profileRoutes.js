import express from "express";
import { appointmentModel } from "../models/appointmentsModel.js";
import { vehicleModel } from "../models/vehiclesModel.js";
import { UserModel } from "../models/usersModel.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/************************************************* GETS *****************************************************/

//view single appointment details. Not in use.
router.get("/viewAppointment", async (req, res) => {
    try {
        const response = await appointmentModel.find({})
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

//Not in use. Not sure what this wil be used for yet.
router.get("/appointments/ids", async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userID);
        res.json({ savedAppointments: user?.appointments });
    } catch (err) {
        console.log(err);
    }
});

//Get all client appointments for appointments page
router.get("/appointments/:userId", async (req, res) => {
    try {
        const userAppointments = await appointmentModel.find({ clientId: req.params.userId }).sort("serviceDate");
        res.json(userAppointments);
    } catch (err) {
        console.log(err);
    }
});

//Get all users vehicles
router.get("/vehicles/:userID", async (req, res) => {
    try {
        const userVehicles = await vehicleModel.find({})
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

        if (emailExists && user.email !== email) {
            return res.json({error: true, message: "Email is already in use."})
        } else {
            await UserModel.updateOne({ _id: userId }, {email, fname, lname});
        }

        res.json({error: false, message: "User updated successfully!"});
    } catch (err) {
        console.log(err);
    }
});

/******************************************** DELETES ******************************************************/
//Deletes client appointment
router.delete("/deleteAppointment/:apptID", async (req, res) => {   
    try {
        const userAppointment = await appointmentModel.deleteOne({ "_id": req.params.apptID});
        res.json(userAppointment);
    } catch (err) {
        console.log(err);
   }
})

export { router as profileRouter };
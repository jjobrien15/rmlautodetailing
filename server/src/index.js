import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/usersRoutes.js";
import { appointmentRouter } from "./routes/appointmentsRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/appointments", appointmentRouter);


mongoose.connect(process.env.CONN_STRING);

app.listen(3001, () => (
    console.log("Server is running... ")
));

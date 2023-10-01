import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/usersRoutes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);


mongoose.connect("mongodb+srv://" + process.env.MONGODB_NAME + ":" + process.env.MONGODB_PASSWORD + "@rml.1q1kyzz.mongodb.net/RMLUsers?retryWrites=true&w=majority");

app.listen(3001, () => (console.log("Server is running... ")));

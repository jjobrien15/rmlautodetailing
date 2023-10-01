import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/usersModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
        return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ email, password:hashedPassword });

    await newUser.save();

    res.json({message: "User registration successfull!"});
});

router.post("/login");

export {router as userRouter};
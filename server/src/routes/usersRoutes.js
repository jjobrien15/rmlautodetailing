import "dotenv/config"
import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/usersModel.js";

const router = express.Router();



export const verifyToken = (req, res, next) => {
    const token = req.headers.auth;
    if (!token) {
        res.json({message:"No token found plase login..."});
        //res.redirect("../"); /CANNOT REDIRECT TO CLIENT SIDE LOGIN TO PROTECT PAGES.
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN, (err) => {
            if (err){
                res.sendStatus(403);
            } 
            next();
        })
    }
}



//Register a new user and hash password
router.post("/register", async (req, res) => {
    const { fname, lname, email, pwd } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
        return res.json({ message: "User already exists!" });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    const newUser = new UserModel({ fname, lname, email, pwd:hashedPwd });

    await newUser.save();

    res.json({message: "User registration successfull!"});
});


//Login/authentication with JWT
router.post("/login", async (req, res) => {
    const { email, pwd } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.json({ message: "User does not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(pwd, user.pwd);

    if (!isPasswordValid) {
        return res.json({ message: "Username or password is incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN);
    res.json({ token, userID: user._id });

});

//Get user info for profile
router.get("/profile/:id", verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.json(user);
    } catch (err) {
        console.log(err);
   }
});

export { router as userRouter };
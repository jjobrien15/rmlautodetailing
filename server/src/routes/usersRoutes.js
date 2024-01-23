import "dotenv/config"
import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/usersModel.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

/********************************************* GETS ***********************************************/
//Get user info for profile
router.get("/profile/:id", verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.json(user);
    } catch (err) {
        console.log(err);
   }
});


/********************************************* POSTS ***********************************************/
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
        return res.json({ message: "Username or password is incorrect!" });
    }

    const isPasswordValid = await bcrypt.compare(pwd, user.pwd);

    if (!isPasswordValid || !user) {
        return res.json({ message: "Username or password is incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN);
    res.json({ token, userId: user._id });

});

/********************************************* PUTS ***********************************************/



/********************************************* DELETES ***********************************************/

export { router as userRouter };
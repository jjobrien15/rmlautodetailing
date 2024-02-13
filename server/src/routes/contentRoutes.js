import express from "express";

import { serviceModel } from "../models/serviceModel.js";

import "dotenv/config";

const router = express.Router();

/********************************************** GETS ****************************************************/
//Get all services
router.get("/services", async (req, res) => {
    try {
        const services = await serviceModel.find({});
        res.json(services);
    } catch (err) {
        console.log(err);
    }
});

/********************************************** POSTS ***************************************************/
router.post("/services", async (req, res) => {
    const service = await serviceModel(req.body);
    try {
        const response = await service.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});
/********************************************** PUTS ****************************************************/
/********************************************** DELETES *************************************************/

export { router as contentRouter };

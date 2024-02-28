import express from "express";

import { serviceModel } from "../models/serviceModel.js";

import "dotenv/config";

const router = express.Router();

/********************************************** GETS ****************************************************/
//Get all services
router.get("/services", async (req, res) => {
    try {
        const services = await serviceModel.find();
        res.json(services);
    } catch (err) {
        console.log(err);
    }
}); 

//Get single service
router.get("/services/:serviceId", async (req, res) => {
    try {
        const service = await serviceModel.findById(req.params.serviceId);
        res.json(service);
    } catch (err) {
        console.log(err);
    }
}); 

/********************************************** POSTS ***************************************************/
router.post("/addService", async (req, res) => {
    try {
        const service = new serviceModel(req.body);
        const response = await service.save();
        res.json(response);
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Handle validation errors (e.g., cast error)
            res.status(400).json({ error: 'Invalid data format for PerkList' });
        } else {
            // Handle other types of errors
            res.status(500).json({ error: err.message });ee
        }
    }
});
/********************************************** PUTS ****************************************************/
router.put("/updateService/:serviceId", async (req, res) => {
    try {
        //const { createdBy, title, description, price, perkList } = req.body;
        await serviceModel.updateOne({ _id: req.params.serviceId }, req.body);
        res.json({error: false, message: "Service updated successfully!"});
    } catch (err) {
        console.log(err);
    }
});

/********************************************** DELETES *************************************************/
router.delete("/deleteService/:serviceId", async (req, res) => {   
    try {
        await serviceModel.deleteOne({ "_id": req.params.serviceId });
        res.json({ error:false, message: "Service Successfully Deleted!" });
    } catch (err) { 
        console.log(err);
   }
})
export { router as contentRouter };

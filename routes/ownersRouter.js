const express = require("express");
const router = express.Router();
const ownerModel = require("../models/OwnerModel.js");

router.post("/create", async (req, res) => {
    try {
        const owners = await ownerModel.find();
        if(owners.length > 0) {
            return res.status(503).json({error: "You don't have a permission to create a new owner"});
        }

        const {fullname, email, password} = req.body;
        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })

        res.status(201).json({createdOwner});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
})

router.get("/", (req, res) => {
    res.send("Its working");
})

module.exports = router;
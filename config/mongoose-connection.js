const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.mongoURL;

mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on("connected", () => {
    console.log("Connected to MongoDB server");
})
db.on("error", (err) => {
    console.log("MongoDB connection error: ", err);
})
db.on("disconnect", () => {
    console.log("MongoDB disconnected")
})

module.exports = db;
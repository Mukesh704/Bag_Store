const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController.js")

router.get("/", (req, res) => {
    res.send("Its working");
})

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
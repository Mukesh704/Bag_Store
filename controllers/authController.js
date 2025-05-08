const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const { generateToken } = require("../utils/generateToken.js")
const userModel = require("../models/UserModel")

module.exports.registerUser = async function(req, res) {
    try {
        const {email, password, fullname} = req.body;

        const user = await userModel.findOne({email: email});

        if(user) return res.status(401).json({
            success: false,
            error: "You already have an account, Please login."
        })

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.send(err.message);
                else {
                    const user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })

                    const token = generateToken(user);
                    res.cookie("token", token);
                    res.send("User Created Successfully");
                    
                    // res.status(200).json({
                    //     success: true,
                    //     data: user
                    // })
                }
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.loginUser = async function(req, res) {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email: email});

        if(!user) return res.status(401).json({
            success: false,
            error: "Email or Password incorrect!"
        })

        const isMatch = bcrypt.compare(password, user.password);
        if(isMatch) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.send("Loggedin");
        }else {
            return res.status(401).json({
                success: false,
                error: "Email or Password incorrect!"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

require('../db/conn');
const User = require('../model/userSchema');
// router.get("/", (req, res) => {
//     res.send("hi! this is my router server");
// });

// By promises

router.post("/register", function (req, res, next) {

    const { name, email, phone, work, password, cpassword } = req.body;

    //validation :

if (!name || !email || !phone || !work || !password || !cpassword || password !==cpassword) {
        return res.status(422).json({ error: "fill data correctly" });
    }

    User.findOne({ email: email})

        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "user already registered" });
            }
            const user = new User({ name, email, phone, work, password, cpassword });

            user.save().then(() => {
                res.status(201).json({ message: "user registered successfully" });
            }).catch((err) => res.status(500).json({ error: "registration failed" }));
        }).catch((err) => { console.log(err) })

});

//Login route

router.post("/signin", async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "please fill the data" });
        }

        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);

        if (userLogin) {
            token = await userLogin.generateAuthToken();

            //store token in cookies

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (password===userLogin.password) {
                res.json({ message: "user signin successfully" })
            } else {
                res.status(401).json({ error: " invalid pass" })
            }
        } else {
            res.status(402).json({ message: "invalid email" });
        }
    } catch (err) {
        console.log(err);
    }
})

router.use(express.json());
module.exports = router;
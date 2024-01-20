const express = require('express')
const router = express.Router();
const User = require("../models/User")
const { body, validtaionResult, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const jwtSecret="MYNAMEISANTHONY";

router.post("/createuser", [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect password").isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const salt=await bcrypt.genSalt(10);
    let secPassword=await bcrypt.hash(req.body.password,salt)

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
            .then(res.json({ success: true }));
    } catch (err) {
        console.log(err)
        res.json({ success: false });
    }
})

router.post("/loginuser", [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let email = req.body.email;
    try {
        let userdata = await User.findOne({ email });
        if (!userdata) {
            return res.status(400).json({ errors: "Incorrect email or password" })
        }
        const pwdComapre=await bcrypt.compare(req.body.password,userdata.password)//encrypted pswd is same as user's input password
        if (!pwdComapre) {//req.body.password !== userdata.password
            return res.status(400).json({ errors: "Incorrect email or password" })
        }
        const data={
            user:{
                id:userdata.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({ success: true,authToken:authToken})
    } catch (err) {
        console.log(err)
        res.json({ success: false });
    }
})

module.exports = router;
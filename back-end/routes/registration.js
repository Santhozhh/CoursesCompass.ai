const express = require("express")
const registration = express.Router();
const User   = require('../schemas/user.js')
registration.post('/',async(req, res)=>{
    try{
        const {name , email , password} = req.body
        let user  =await User.findOne({email})
        if(user){
            res.send("user already exists")

        }
        else {
            user  =  new User({
            name,   
            email,
            password
        });
        await user.save();
        res.send("user Created")
        res.redirect("/dashboard")
        }
    }
    catch(err){
        console.error(err)
        res.status(500).send("server Error")
    }
})
module.exports = registration; 
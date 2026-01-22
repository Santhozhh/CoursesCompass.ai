const express = require("express")
const login  = express.Router()
const User   = require('../schemas/user.js')
login.post('/',async(req,res)=>{
    try{
    const {email ,password} = req.body;
    let user = await User.findOne({email});
    if(!user)
    {
        return res.send("User Not Found")

    }
    else {
        if(user.password != password && user.email == email)
        {
            res.send("Wrong Password")
        }
        else if(user.password == password)
        {
            res.send("Login Successfull")
            res.redirect("/dashboard")
        }
    }
}
catch(err)
{
    console.error(err)
    res.status(500).send("Server Error")
}
    

})
module.exports = login; 
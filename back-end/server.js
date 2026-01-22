const express = require("express");
const mongoose = require("mongoose");
// mongodb = 'mongodb+srv://Santhosh:hafQryfMbImy993V@coursescompass.gxgwxr3.mongodb.net/?appName=CoursesCompass'
const {mongodb,port } = require("./config.js");

const app = express()
const login = require('./routes/login.js')
const registration = require('./routes/registration.js')


app.use(express.json())

app.use(express.urlencoded({ extended: true }))

mongoose 
    .connect(mongodb)
    .then(()=>{
      console.log("Db Connected ")
      app.get('/',(res, req) =>{
        console.log(req)
        return res.statusCode(234).send("welcome")
      })
      
    })
    .catch(()=>{
      console.log("Error in Connection")
    })

app.listen(port,()=>{
    console.log(`app listening to port : ${port}`)
})

 app.use('/login',login)
 app.use('/registration',registration)


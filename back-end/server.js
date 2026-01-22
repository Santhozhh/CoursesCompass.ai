const express = require("express");
const mongoose = require("mongoose");
//const { MONGODB_URL } = require("./config.js");
MONGODB_URL = 'mongodb+srv://Santhosh:hafQryfMbImy993V@coursescompass.gxgwxr3.mongodb.net/?appName=CoursesCompass'

const app = express()

app.use(express.json())

mongoose 
    .connect(MONGODB_URL)
    .then(()=>{
      console.log("Db Connected ")
      app.get('/',(res, req) =>{
        console.log(req)
        return res.statusCode(234).send("welcome")
      })
      
    })
    .catch(()=>{
      console.log("error")
    })


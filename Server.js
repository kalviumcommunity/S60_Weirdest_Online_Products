const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

app.get("/ping",(req,res) =>{
    res.send("pong")
})

app.listen(3000,()=>{
    console.log("This is local host 3000")
})

const Database = async ()  => {
    try{
        await mongoose.connect(process.env.Database)
        console.log("Connected to Database")
    }
    catch (error){
        console.log(error.message)
    }
}

Database()

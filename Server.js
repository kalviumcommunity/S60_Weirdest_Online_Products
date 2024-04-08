const express = require("express")
const app = express()
const route = require("./Route")

app.use("/",route)

app.get("/ping",(req,res) =>{
    res.send("pong")
})

app.listen(3000,()=>{
    console.log("This is local host 3000")
})

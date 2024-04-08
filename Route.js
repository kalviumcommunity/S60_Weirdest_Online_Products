const express = require("express")
const app = express()

app.get("/get",(req,res)=>{
    res.send("Get is successful")
})

app.post("/post",(req,res)=>{
    res.send("Post is successful")
})

app.put("/put/:key",(req,res)=>{
    res.send("Update is successful")
})

app.delete("/delete/:key",(req,res)=>{
    res.send("Delete is successful")
})

module.exports = app
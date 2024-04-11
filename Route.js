const express = require("express")
const app = express()
const {model} = require("./App")
app.get("/get",(req,res)=>{
    model.find({})
    .then((ele)=>{
        res.json({ele})
    })
    .catch((err)=>{
        res.json({err})
    })
})

app.get("/get",(req,res)=>{
    res.send("Get is successful")
})

app.post("/post",(req,res)=>{
    model.create(req.body)
    .then((ele)=>{
        res.json(ele)
    })
    .catch((err)=>{
        res.json(err)
    })
})

app.put("/put/:key",(req,res)=>{
    res.send("Update is successful")
})

app.delete("/delete/:key",(req,res)=>{
    res.send("Delete is successful")
})

module.exports = app
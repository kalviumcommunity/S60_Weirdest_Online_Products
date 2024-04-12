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
    const key = req.params.key;
    model.findByIdAndUpdate(key,{
        Product: req.body.Product,
    Customer_Ratings: req.body.Customer_Ratings,
    Number_of_buyers_last_month: req.body.Number_of_buyers_last_month,
    Price: req.body.Price,
    Image_Link: req.body.Image_Link,
    Product_Details: req.body.Product_Details
    }).then(()=>{res.send("done")})
})

app.delete("/delete/:key",(req,res)=>{
    const key = req.params.key;
    model.findByIdAndDelete(key)
    .then(ele => res.json(ele))
    .catch(err => res.json(err))
})

module.exports = app
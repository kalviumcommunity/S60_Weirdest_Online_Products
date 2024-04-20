const express = require("express")
const app = express()
const {model, userModel} = require("./App")
const joiSchema = require("./joiSchema")

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
    const {error,value} = joiSchema.validate(req.body)
    if(error){
        res.json({message:"Invalid inputs entered",error:error.message})
    }
    else {
        res.json({ message: "Valid inputs", data: value });
    }

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

app.post("/signup",(req,res)=>{
    const {email} = req.body
    userModel.findOne({email})
    .then(user=>{
        if(user){
            if(user.email === email){
                res.json({message:"User with this email already exist"})
            }
        }
        else{
            userModel.create(req.body)
        }
    })
    .then(user => res.json(user))
    .catch(err => res.json({message: err}))
})

// Get email and password from user
// Check database 
// Return appropriate message

app.post("/login", (req, res) => {
    const {username, password} = req.body

    userModel.findOne({username})
    .then(user => {
        if(user){
            if(user.password === password){
                res.status(200).json({message: "Login successful"})
            }else{
                res.status(400).json({message: "Details given by the user did not match"})
                
            }
        }else{
            res.status(400).json({message: "User doesn't exist. Kindly register"})
       
        }
    })
})

module.exports = app
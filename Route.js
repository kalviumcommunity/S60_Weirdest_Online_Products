const express = require("express")
const app = express()
const {model, userModel} = require("./App")
const joiSchema = require("./joiSchema")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

//AuthenticateToken acts as a middleware
const AuthenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token)
    if(!token){
        return res.sendStatus(401)
    }

    jwt.verify(token,process.env.ACCESS_KEY,(err,user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

app.get("/get",AuthenticateToken,(req,res)=>{
    const {id} = req.query
    console.log(id)
    if(id){
        model.find({Created_By:id})
        .then((ele)=>{
            console.log(ele)
            res.json({ele})
        })
        .catch((err)=>{
            console.log(err)
            res.json({err})
        })
    }
    else{
        model.find({})
        .then((ele)=>{
            res.json({ele})
        })
        .catch((err)=>{
            res.json({err})
        })
    }
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
    Product_Details: req .body.Product_Details
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
                // res.status(200).json({message: "Login successful"})
                const user = {name : username}
                const accessToken =jwt.sign(user,process.env.ACCESS_KEY)
                res.json({accessToken})
            }
            else{
                res.status(400).json({message: "Details given by the user did not match"})
                
            }
        }
        else{
            res.status(400).json({message: "User doesn't exist. Kindly register"})
        }
    })
})

app.get("/user",AuthenticateToken,(req,res)=>{
    console.log("getuser")
    userModel.find({})
    .then((user)=>{
        console.log(user)
        res.send(user)
    })
    .catch((err)=>err.message)

})

module.exports = app
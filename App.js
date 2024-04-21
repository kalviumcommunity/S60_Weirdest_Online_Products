const mongoose = require("mongoose")
const Data = require("./Data")

function app(){
mongoose.connect("mongodb+srv://sahanashrev:Sahusasdi23@cluster0.agvrvhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("It is connected")
})
.catch((error)=>{
    console.log("Error is",error)
})
}

const mongooseSchema = mongoose.Schema({
    Product: String,
    Customer_Ratings: String,
    Number_of_buyers_last_month: Number,
    Price: String,
    Image_Link: String,
    Product_Details: String,
    Created_By: String
})

const model = mongoose.model("user",mongooseSchema)

const userSchema = mongoose.Schema({
    username :  String,
    email : String,
    password : String
})

const userModel = mongoose.model("userlogin",userSchema)
// model.insertMany(Data)

module.exports = {model:model, connection:app, userModel:userModel}
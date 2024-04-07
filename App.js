const mongoose = require("mongoose")
const Data = require("./Data")

mongoose.connect("mongodb+srv://sahanashrev:Sahusasdi23@cluster0.agvrvhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("It is connected")
})
.catch((error)=>{
    console.log("Error is",error)
})

const mongooseSchema = mongoose.Schema({
    Product: String,
    Customer_Ratings: String,
    Number_of_buyers_last_month: Number,
    Price: String,
    Image_Link: String,
    Product_Details: String
})

const model = mongoose.model("user",mongooseSchema)

module.exports = model
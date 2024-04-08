const express = require("express")
const app = express()
const route = require("./Route")

app.use("/",route)
const{connection,model}=require("./App")

function Data(){
    return model.db.readyState===1;
}
app.get("/ping",(req,res) =>{
    // res.send("pong")
    const DataCall = Data()
    let Check = DataCall? "Connected" : "Not connected"
    res.send(Check)
})

app.listen(3000,()=>{
    connection()
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

import axios from "axios";
import {useState,useEffect} from "react";

function FetchData(){

    const[state,setState]=useState([]);

    useEffect(()=>{
     const getdata= async()=>{
        try{
            const fetchData=await axios.get("http://localhost:3000/get");
            console.log(fetchData.data.ele)
            setState(fetchData.data.ele)
        }catch(error){
           console.error("Error is :",error)
        }
     }
    getdata()
    },[])

    return(
        <div>
         {
            state.map((ele,id)=>{
                return(
                <div key={id}>
                <b> Product: {ele.Product}</b>
    <p>Customer_Ratings: {ele.Customer_Ratings} </p>
    <p>Number_of_buyers_last_month: {ele.Number_of_buyers_last_month}  </p>
    <p>Price: {ele.Price}</p>
<img src={ele.Image_Link} alt="" height="400px" width="400px"/>
    <p>Product_Details: {ele.Product_Details}</p>
                </div>
                )
            })
         }
        </div>
    )
}

export default FetchData;
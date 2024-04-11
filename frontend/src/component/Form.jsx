import { useState } from "react";
import axios from "axios";

function Form(){

    const[Product,setProduct]=useState("")
    const[Customer_Ratings,setRating]=useState("")
    const[Number_of_buyers_last_month,setBuyers]=useState(0)
    const[Price,setPrice]=useState("")
    const[Product_Details,setDetails]=useState("")
    const[Image_Link,setImage]=useState("")

    function ProductsChange(event){
      setProduct(event.target.value)
    }

    function RatingsChange(event){
        setRating(event.target.value)
      }

      function BuyersChange(event){
        setBuyers(event.target.value)
      }

      function PriceChange(event){
        setPrice(event.target.value)
      }

      function DetailsChange(event){
        setDetails(event.target.value)
      }

      function ImageChange(event){
        setImage(event.target.value)
      }
     
      function Submit(event){
         event.preventDefault();
         axios.post("http://localhost:3000/post",{Product,Customer_Ratings,Number_of_buyers_last_month,Price,Product_Details,Image_Link})
         .then(ele =>console.log(ele))
         .catch(error =>console.log(error))
      }
    return(
       <div>
        <form onSubmit={Submit}>
            <div>
            <input type="text" placeholder="Product" onChange={ProductsChange} />
            </div>
            <div>
            <input type="text" placeholder="Customer Ratings" onChange={RatingsChange} />
            </div>
            <div>
            <input type="text" placeholder="Number of buyers last month" onChange={BuyersChange}/>
            </div>
            <div>
            <input type="text" placeholder="Price" onChange={PriceChange} />
            </div>
            <div>
            <input type="text" placeholder="Product details" onChange={DetailsChange} />
            </div>
            <div>
                <input type="text" placeholder="Image link" onChange={ImageChange} />
            </div>
            <div>
            <button>Add Data</button>
            </div>
        </form>
       </div>
    )
}

export default Form
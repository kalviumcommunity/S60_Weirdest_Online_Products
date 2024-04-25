import { useState } from "react";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Form() {
  const [Product, setProduct] = useState("");
  const [Customer_Ratings, setRating] = useState("");
  const [Number_of_buyers_last_month, setBuyers] = useState(0);
  const [Price, setPrice] = useState("");
  const [Product_Details, setDetails] = useState("");
  const [Image_Link, setImage] = useState("");

  const Navigate = useNavigate()

  function ProductsChange(event) {
    setProduct(event.target.value);
  }

  function RatingsChange(event) {
    setRating(event.target.value);
  }

  function BuyersChange(event) {
    setBuyers(event.target.value);
  }

  function PriceChange(event) {
    setPrice(event.target.value);
  }

  function DetailsChange(event) {
    setDetails(event.target.value);
  }

  function ImageChange(event) {
    setImage(event.target.value);
  }

  function Submit(event) {
    event.preventDefault();

    const getCookie = (name) => {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
          return cookie[1];
        }
      }
      return null;
    };

    const token = getCookie("access_token")

    axios
      .post(
        "http://localhost:3000/post",
        {
          Product,
          Customer_Ratings,
          Number_of_buyers_last_month,
          Price,
          Product_Details,
          Image_Link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => Navigate("/product"))
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <form onSubmit={Submit}>
        <div>
          <input
            type="text"
            placeholder="Product"
            onChange={ProductsChange}
            className="inpbox"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Customer Ratings"
            onChange={RatingsChange}
            className="inpbox"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Number of buyers last month"
            onChange={BuyersChange}
            className="inpbox"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Price"
            onChange={PriceChange}
            className="inpbox"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Product details"
            onChange={DetailsChange}
            className="inpbox"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Image link"
            onChange={ImageChange}
            className="inpbox"
          />
        </div>
        <div>
          <button className="add">Add Data</button>
        </div>
      </form>
    </div>
  );
}

export default Form;

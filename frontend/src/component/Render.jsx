import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function FetchData() {
  const [state, setState] = useState([]);

  const Navigate = useNavigate();

  const Logout = () => {
    document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    Navigate("/login");
  };

  const Delete = async (key) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${key}`);
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    const getdata = async () => {
      try {
        const token = getCookie("access_token")
        const fetchData = await axios.get("http://localhost:3000/get",{
            headers: {
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        console.log(fetchData.data.ele);
        setState(fetchData.data.ele);
      } catch (error) {
        console.error("Error is :", error);
      }
    };
    getdata();
  }, []);

  return (
    <div>
      <Link to="/addprod">
        <button>Add</button>
      </Link>

      <div>
        {state.map((ele, id) => {
          return (
            <div key={id}>
              <b> Product: {ele.Product}</b>
              <p>Customer_Ratings: {ele.Customer_Ratings} </p>
              <p>
                Number_of_buyers_last_month: {ele.Number_of_buyers_last_month}{" "}
              </p>
              <p>Price: {ele.Price}</p>
              <img src={ele.Image_Link} alt="" height="400px" width="400px" />
              <p>Product_Details: {ele.Product_Details}</p>
              <button
                onClick={() => {
                  Delete(ele._id);
                }}
              >
                Delete
              </button>
              <Link to={`/put/${ele._id}`}>
                <button>Update</button>
              </Link>
            </div>
          );
        })}
      </div>
      <button onClick={Logout}>Log Out</button>
    </div>
  );
}

export default FetchData;

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"

function FetchData() {
  const [state, setState] = useState([]);
  const [user,setUser] = useState([]);

  const Navigate = useNavigate();

  const handleClick = (event) => {
    const id = event.target.value;
    // console.log(id)
    if (id) {
      getdata(id)
    }
    else {
      getdata();
    }
  };
  
  const Logout = () => {
    document.cookie = `username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
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

  const getdata = async (id) => {
    try {
      const token = getCookie("access_token")
      const fetchData = await axios.get(`http://localhost:3000/get`,{
          headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type": "application/json"
          },
          params: {
            "id": id
          }
      })
      console.log(fetchData.data.ele);
      setState(fetchData.data.ele);
    } catch (error) {
      console.error("Error is :", error);
    }
  };

  const getUser = async () => {
    try {
      const token = getCookie("access_token")
      const fetchData = await axios.get("http://localhost:3000/user",{
          headers: {
              "Authorization" : `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      })
      console.log(fetchData.data)
      setUser(fetchData.data);
    } catch (error) {
      console.error("Error is :", error);
    }
  };

  useEffect(() => {
    getUser();
    getdata();
  }, []);

  return (
    <div>
      <div className="buttons">
        <div>
        <Link to="/addprod">
        <button>Add</button>
      </Link>
        </div>
      <div>
      <button onClick={Logout} className="logout">Log Out</button>
      </div>
      </div>

      <div>
      <select name="User Identification" onChange={handleClick} className="dropdown" style={{ width: '100px', height: '30px', fontSize: '15px' }}>
        <option value="" style={{fontSize: "15px", color:"black"}}>Select User</option>
        {
          user.map((ele,ind) => {
            return(
                <option value={ele._id} key={ind} className="optns" style={{fontSize: "15px"}}>{ele.username}</option>
            )
          })
        }
         </select>
<div className="flex">
        {state.map((ele, id) => {
          return (
            <div key={id} className="product">
              <b> Product: {ele.Product}</b>
              <p>Customer_Ratings: {ele.Customer_Ratings} </p>
              <p>
                Number_of_buyers_last_month: {ele.Number_of_buyers_last_month}{" "}
              </p>
              <p>Price: {ele.Price}</p>
              <img src={ele.Image_Link} alt="" height="400px" width="400px" />
              <p>Product_Details: {ele.Product_Details}</p>
              <div className="btns">
              <button
                onClick={() => {
                  Delete(ele._id);
                }}>
                Delete
              </button>
              <Link to={`/put/${ele._id}`}>
                <button className="update">Update</button>
              </Link>
                </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default FetchData;

import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

function Login(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const Navigate = useNavigate()

    const PasswordChange = (event) => {
        setPassword(event.target.value)
    }
    
    const usernameChange = (event) => {
        setUsername(event.target.value)
    }
    
    const Error = () => {
        setError("User detail is incorrect")
    }

    const Submit = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:3000/login",{username,password})
        .then(response =>{
            if(response.status === 200){
                Navigate("/product")
                document.cookie = `username=${username}`;
                document.cookie = `access_token=${response.data["accessToken"]}`
                console.log(response.data)
            }
            else{
                Error()
            }          
        })
    .catch(error=>{
        console.log("error is",error)
        Error()
    })
    }

  return(
    <div>
    <form onSubmit={Submit}>
            <div>
                <input type="text" placeholder="Enter username" onChange={usernameChange} required/>
            </div>
            <div>
                <input type="text" placeholder="Enter password" onChange={PasswordChange} required/>
            </div>
            <button>Login</button>
            <p>{error}</p>
    </form>
    </div>
  )}

export default Login
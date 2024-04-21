import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

function Signup(){
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [err,setErr] = useState("")

    const Navigate = useNavigate()

    const NameChange = (event) => {
        setUsername(event.target.value)
    }

    const EmailChange = (event) => {
        setEmail(event.target.value)
    }

    const PasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/signup", { username, email, password })
            .then((res) => {
                if (res.data.message === "User with this email already exist") {
                    setErr("User with this email already exists");
                } else {
                    Navigate("/login");
                }
            })
            .catch(err => console.log("Error:", err));
    };
    
    return(
        <div>
            <form onSubmit={Submit}>
            <div>
            <input type="text" placeholder="Enter username" onChange={NameChange} required />
            </div>
            <div>
                <input type="text" placeholder="Enter email" onChange={EmailChange} required/>
            </div>
            <div>
                <input type="text" placeholder="Enter password" onChange={PasswordChange} required/>
            </div>
            <button>Sign up</button>
            <p>If you already have an account kindly login</p>
            <Link to="/login">
            <button>Log in </button>
            </Link>
            </form>
            <p>{err}</p>
        </div>
    )
}

export default Signup
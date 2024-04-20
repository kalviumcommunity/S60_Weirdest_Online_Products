
import './App.css'
import FetchData from "./component/Render.jsx"
import Form from "./component/Form.jsx"
import UpdateForm from "./component/Update.jsx"
import { Routes,Route } from 'react-router-dom'
import Signup from './component/Signup.jsx'
import Login from './component/Login.jsx'

function App() {

  return (
<>
<Routes>
<Route path="/product" element={<FetchData/>}></Route>
<Route path="/addprod" element={<Form/>}></Route>
<Route path="/put/:key" element={<UpdateForm/>}></Route> 
<Route path="/" element={<Signup/>}></Route>
<Route path="/login" element={<Login/>}></Route>
</Routes>
    </>
  )
}

export default App

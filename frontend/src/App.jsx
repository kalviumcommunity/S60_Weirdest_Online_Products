
import './App.css'
import FetchData from "./component/Render.jsx"
import Form from "./component/Form.jsx"
import UpdateForm from "./component/Update.jsx"
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
<>
<Routes>
<Route path="/" element={<FetchData/>}></Route>
<Route path="/addprod" element={<Form/>}></Route>
<Route path="/put/:key" element={<UpdateForm/>}></Route> 
</Routes>
    </>
  )
}

export default App

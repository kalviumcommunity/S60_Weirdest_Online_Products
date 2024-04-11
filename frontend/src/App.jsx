
import './App.css'
import FetchData from "./component/Render.jsx"
import Form from "./component/Form.jsx"
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
<>
<Routes>
<Route path="/" element={<FetchData/>}></Route>
<Route path="/addprod" element={<Form/>}></Route>
</Routes>
    </>
  )
}

export default App

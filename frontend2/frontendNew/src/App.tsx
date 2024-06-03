import './App.css'
import { Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import Dashboard from "./Pages/Dashboard"

function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

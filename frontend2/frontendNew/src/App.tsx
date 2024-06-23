import './App.css'
import { Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import Dashboard from "./Pages/Dashboard"
import Application from './Pages/Application'
import AdminRoute from './Routes/AdminRoute'
import CreateTest from './Pages/AdminPages/CreateTest'
import EditTest from './Pages/AdminPages/EditTest'
import EditResponse from './Pages/UserPages/EditResponse'
import UserRoute from './Routes/UserRoute'
import Test from './Pages/UserPages/Test'
import { Toaster } from './components/ui/toaster'
import ViewApplicants from './Pages/AdminPages/ViewApplicants'
import ViewTests from './Pages/UserPages/ViewTests'

function App() {

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/application" element={<Application />} />
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="createTest" element={<CreateTest />} />
          <Route path="editTest/:id" element={<EditTest />} />
          <Route path="viewApplicants" element={<ViewApplicants />} />
        </Route>
        <Route path="/user" element={<UserRoute />}>
          <Route path="editResponse" element={<EditResponse />} />
          <Route path="myTests" element={<ViewTests />} />
          <Route path="test/:id" element={<Test />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App

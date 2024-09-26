import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// import Public_Routes from './Public_Routes'
// import Private_Routes from './Private_Routes'
import Dashboard from './Screens/Dashboard'
import Signup from './Screens/Signup'
import Private_Routes from './Private_Routes'
import Public_Routes from './Screens/Config/Public_Routes'
import Login from './Screens/Login'
import Home from './Screens/Home'
import About from './Screens/About'
import StafDasboard from './Screens/StafDasboard'
import CreateRoom from './Screens/CreateRoom'
import EditRoom from './Screens/EditRoom'
import DeleteRoom from './Screens/DeleteRoom'
import SingleCards from './Screens/components/SingleCards'
import CheckingHistory from './Screens/CheckingHistory'
// import Hotel from './Screens/Hotel'






const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Public_Routes />}>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        
        
     
        </Route>
        <Route element={<Private_Routes />}>
        <Route path="/about/:id" element={<About/>}/>

        <Route path='/staf' element={<StafDasboard/>}/>
        <Route path='/Dashboard' element={<Dashboard />}>
        <Route path='/Dashboard/CreateRoom' element={<CreateRoom/>}/>
        <Route path='/Dashboard/EditRoom' element={<EditRoom/>}/>
        {/* <Route pathe='/Dashboard/Delete' element={<DeleteRoom/>}/> */}
        <Route path='/Dashboard/deleteRoom' element={<DeleteRoom/>}/>
        <Route path='/Dashboard/CheckingHistory' element={<CheckingHistory/>}>





        </Route>
        </Route>
      </Route>
      </Route>
    )
  )


  const AppRouter = () => {
    return <RouterProvider router={router} />
  }
  
  export default AppRouter
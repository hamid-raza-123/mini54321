import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Public_Routes = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
  return !isLoggedIn ? <Outlet /> : <Navigate to={"/"} />
}

export default Public_Routes
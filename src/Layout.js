import React from 'react'
import Navbare from './components/Navbare'
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
    <Outlet />
    </div>
  )
}

export default Layout
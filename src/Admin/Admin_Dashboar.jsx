import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../Admin/style.css'
import GridExample from './Carddata'
function Admin_Dashboar() {
  return (
    <div className="container flex" id='vendor'>
      
    <div className="sidebar">
    <h2>Admin Panel</h2>
    <ul>
      <li>
        <Link to='vendor'>Add Vendor</Link>
      </li>
      <li>
       <Link to="custom">Add Custom Combo</Link>
      </li>
      <li>
      <Link to="data">Data</Link>
      </li>
      <li>
        <a href="#">Bookings</a>
      </li>
      <li>
        <a href="#">Settings</a>
      </li>
    </ul>
  </div>
  <Outlet/>
 
  </div>
  )
}

export default Admin_Dashboar
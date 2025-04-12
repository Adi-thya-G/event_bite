import React from 'react'
import { NavLink,Link, Outlet } from 'react-router-dom'
function Dashboard() {
  return (
    <>
    <div className="flex max-w-68 min-w-64 h-[700px]" >
    {/* Sidebar */}
    <aside className=" bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Foodie Dashboard</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <NavLink to="profile"    className={({isActive})=>` block p-4 text-gray-700 hover:bg-gray-200 ${isActive&&"bg-indigo-100 border-r-4 border-indigo-500"}`}>
              Profile 
            </NavLink>
          </li>
          <li>
           <NavLink to="favorites"  className={({isActive})=>`block p-4 text-gray-700 hover:bg-gray-200 ${isActive&&"bg-indigo-100 border-r-4 border-indigo-500"}`}>
           Favorite
           </NavLink>
          </li>
          <li>
          <NavLink to="cart"  className={ ( {isActive})=>`block p-4 text-gray-700 hover:bg-gray-200 ${isActive?"bg-indigo-100 border-r-4 border-indigo-500":""}`}>
           Cart
           </NavLink>
          </li>
          <li>
            <a href="#" className="block p-4 text-gray-700 hover:bg-gray-200">
              Settings
            </a>
          </li>
          <li>
           
          </li>
        </ul>
      </nav>
    </aside>
    {/* Main Content */}
<Outlet/>
    
  </div>
  
</>
  )
}

export default Dashboard
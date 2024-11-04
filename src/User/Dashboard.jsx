import React from 'react'
import { NavLink,Link, Outlet } from 'react-router-dom'
function Dashboard() {
  return (
    <>
    <div className="flex mb-80" >
    {/* Sidebar */}
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Foodie Dashboard</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link to="profile"    className="block p-4 text-gray-700 hover:bg-gray-200">
              Profile
            </Link>
          </li>
          <li>
           <Link to="favorites"  className="block p-4 text-gray-700 hover:bg-gray-200">
           Favorite
           </Link>
          </li>
          <li>
            <a href="#" className="block p-4 text-gray-700 hover:bg-gray-200">
              Favorites
            </a>
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
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="bg-white shadow-lg w-full lg:w-64 relative z-10">
          {/* Cross icon for small screens */}
          <div className="lg:hidden absolute top-4 right-4 cursor-pointer" onClick={() => setSidebarOpen(false)}>
            <RxCross2 size={24} />
          </div>

          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">Foodie Dashboard</h1>
          </div>
          <nav className="mt-4">
            <ul>
              <li>
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    `block p-4 text-gray-700 hover:bg-gray-200 ${
                      isActive && 'bg-indigo-100 border-r-4 border-indigo-500 lg:border-r-4'
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="favorites"
                  className={({ isActive }) =>
                    `block p-4 text-gray-700 hover:bg-gray-200 ${
                      isActive && 'bg-indigo-100 border-r-4 border-indigo-500 lg:border-r-4'
                    }`
                  }
                >
                  Favorite
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="cart"
                  className={({ isActive }) =>
                    `block p-4 text-gray-700 hover:bg-gray-200 ${
                      isActive ? 'bg-indigo-100 border-r-4 border-indigo-500 lg:border-r-4' : ''
                    }`
                  }
                >
                  Cart
                </NavLink>
              </li>
              <li>
              <NavLink 
              to="PendingOderList"
              className={({ isActive }) =>
                `block p-4 text-gray-700 hover:bg-gray-200 ${
                  isActive ? 'bg-indigo-100 border-r-4 border-indigo-500 lg:border-r-4' : ''}`}
                >PendingOrders
              </NavLink>
              </li>

              <li>
              <NavLink 
              to="CompletedOrderList"
              className={({ isActive }) =>
                `block p-4 text-gray-700 hover:bg-gray-200 ${
                  isActive ? 'bg-indigo-100 border-r-4 border-indigo-500 lg:border-r-4' : ''}`}
                >CompletedOrders
              </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
      )}

      {/* Toggle button for small screens */}
      {!sidebarOpen && (
        <button
          className="lg:hidden fixed top-20 left-4 bg-indigo-500 text-white px-3 py-2 rounded-md z-20"
          onClick={() => setSidebarOpen(true)}
        >
          Menu
        </button>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;

import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom'; // Importing necessary components from react-router-dom
import { FiHome, FiUsers, FiFolder, FiBarChart2, FiSettings, FiLogOut, FiBell } from "react-icons/fi";
import '../Admin/style.css'; // Assuming this file contains necessary styling
 import adithya from '../../public/adithya.jpg' 
function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState(3);
   

  const [isActive,setActive]=useState("")
  // Define the navigation items with 'to' set to actual routes
  const navItems = [
    { title: "CustomCombo", icon: FiHome, to: "custom-combo" },
    { title: "FAQ Management", icon: FiFolder, to: "Faq-Management" },
    { title: "User Management", icon:FiUsers , to: "user-management" },
    { title: "Analytics", icon: FiBarChart2, to: "/analytics" },
    { title: "Settings", icon: FiSettings, to: "/settings" },
  ];

  return (
    <div className='w-full h-screen flex'>
      {/* Sidebar */}
      <nav className='relative top-0 left-0 h-full bg-white p-5 shadow-xl z-30 transition-all duration-300 ease-in-out'>
        
        {/* Profile Section */}
        <div className='w-full mx-auto py-6 flex border-b-2 border-gray-300'>
          <img
            src={adithya}
            className="w-16 h-16 rounded-full"
          />
          <FiBell className="w-5 h-5 -ml-3 text-gray-600 cursor-pointer" />
          <div className='flex flex-col'>
            <h2 className=' mx-auto font-bold flex justify-center text-xl'>Adithya Karmarkar</h2>
            <h6 className='flex justify-center'>Admin</h6>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-4">
          {navItems.map((item) => (
            <Link to={item.to} onClick={()=>setActive(item.title)} className={`${isActive==item.title?"border-r-4 border-blue-500":""}`}>
              <div className={`flex items-center w-full p-3 ${isActive==item.title?"bg-indigo-50 border-r-4 border-indigo-500":""}`}>
                <item.icon
                  className={`w-6 h-6 ${isActive==item.title ? 'text-indigo-500' : 'text-gray-600'}`}
                />
                {isOpen && (
                  <span
                    className={`ml-4 ${isActive ==item.title? 'text-indigo-500 font-medium' : 'text-gray-600'}`}
                  >
                    {item.title}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow m-2  bg-white mx-2 border-2 border-white shadow-sm shadow-gray-100">
        <Outlet/>
      </div>
    </div>
  );
}

export default AdminDashboard;

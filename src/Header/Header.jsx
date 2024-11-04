import React from 'react'
import { useEffect } from 'react';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
function Header() {
  const navigate=useNavigate()
  const handlemenu=()=>{
    const menu = document.querySelector(".menu");
    const navMenu = document.querySelector(".nav-menu");
    menu.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        menu.classList.remove("active");
        navMenu.classList.remove("active");
    }))
;
   }

   // useselector
   var authstatus=useSelector((state)=>state.auth.status)
  return (
    <nav className="navbar max-sm:w-[335px]" >
  <div className="navbar-container ">
    <a className="logo">event-bite</a>
    <ul className="nav-menu">
      <li className="nav-item">
        <NavLink to="/" className={({isActive}) =>`nav-link ${isActive?"text-green-500":" text-orange-300"}`}>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <a href="#order" className="nav-link">
          Order
        </a>
      </li>
      {authstatus?
      <li className="nav-item">
         <NavLink to='' className="nav-link">
          Dashboard
        </NavLink>
      </li>
:null}
      <li className="nav-item">
        <a href="#contact" className="nav-link">
          Contact
        </a>
      </li>
      <li className="nav-item">
        <a href="#services" className="nav-link">
          Menu
        </a>
      </li>
      <li className=" special nav-item ">
        <NavLink to='/login'>Login</NavLink></li>
      <li className=" special nav-item ">
        {authstatus?(<button>Logout</button>):
  (<NavLink to='/signup'>Sign up</NavLink>)
}
</li>
    </ul>
    <div className="div_btn">
      {authstatus?(null):<button className="btn  " onClick={()=>navigate("login")}>Login</button>}
      {authstatus?<button className="btn" onClick={()=>{logoutuser()}}>Logout</button>:
      <button className="btn" onClick={()=>navigate("signup")}>Sign up</button>}
    </div>
    <div className="menu" onClick={(e)=>{handlemenu()
      
    }} >
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </div>
  </div>
</nav>
  )
}

export default Header
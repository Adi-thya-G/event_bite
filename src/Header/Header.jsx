import React from 'react'
import { useEffect } from 'react';
import { Link, NavLink,useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import authService, { AuthService } from '../Appwrite/auth';
import {  logout  as authLogout } from '../store/authSlice'

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
    var adminstatus=useSelector((state)=>state.auth. adminStatus)
    let dispatch=useDispatch()
    const logoutUser = async () => {
      try {
        const res = await authService.logout();
        dispatch(authLogout(res));
      } catch (err) {
        console.log(err.message);
      }
    };

  
  return (
    <nav className="navbar max-sm:w-[335px] " >
  <div className="navbar-container ">
    <a className="logo">event-bite</a>
    <ul className="nav-menu">
      <li className="nav-item ">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/order">Order</NavLink>
      </li>
      {authstatus?
      <li className="nav-item">
         <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
      </li>
     :null}
      <li className="nav-item">
        {adminstatus?
      <NavLink to="/admin" className='nav-link' >Admin </NavLink>
      :null
        }</li>
      <li className="nav-item">
        <a href="#services" className="nav-link">
          Menu
        </a>
      </li>
      <li className=" special nav-item ">
        <NavLink to='/login'>Login</NavLink></li>
      <li className=" special nav-item ">
        {authstatus?(<button onClick={()=>{logoutUser()}}>Logout</button>):
  (<NavLink to='/signup'>Sign up</NavLink>)
}
</li>
    </ul>
    <div className="div_btn">
      {authstatus?(null):<button className="btn " onClick={()=>navigate("login")}>Login</button>}
      {authstatus?<button className="btn" onClick={()=>{logoutUser()
        navigate("")
      }}>Logout</button>:
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
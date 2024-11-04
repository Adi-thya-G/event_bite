
import Footer from "./Footer/Footer.jsx";

import { Routes,Route, Outlet, useNavigate } from "react-router-dom";
import service from "./Appwrite/config.js";
import authService from './Appwrite/auth.js';
import { useDispatch } from "react-redux";
import Header from "./Header/Header.jsx";
import { useEffect } from "react";
import {login,logout} from './store/authSlice.js'

function App() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
useEffect(()=>{
   authService.getCurrentUser().then((userData)=>{
    if (userData) {
      service.getData(userData["$id"]).then((personalData)=>{
        dispatch(login({userData,personalData}))
      })
      
      
    } else {
      dispatch(logout());
    }
   })
},)


      
    
  

  return (
<>
<Header></Header>
<Outlet/>
<Footer></Footer>
</>
  );
}

export default App;

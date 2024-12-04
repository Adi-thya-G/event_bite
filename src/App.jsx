import Footer from "./Footer/Footer.jsx";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import service from "./Appwrite/config.js";
import authService from "./Appwrite/auth.js";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header/Header.jsx";
import { useEffect } from "react";
import { cartstore, login, logout, updateAdmin, wishstore } from "./store/authSlice.js";

function App() {
  const dispatch = useDispatch();
  const admin=useSelector((state)=>state.auth.adminStatus)
  useEffect(() => {
    console.log('app')
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          if (userData.labels.includes("admin")) {
            dispatch(updateAdmin())
          }
          service.getData(userData["$id"]).then((personalData) => {
            dispatch(login({ userData, personalData }));
            dispatch(wishstore(personalData.wishlist));
            dispatch(cartstore(personalData.cart))
          });
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("error")
        dispatch(logout())
      });
  }, [admin]);

  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default App;

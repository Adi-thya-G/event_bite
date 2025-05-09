import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxHeart, RxHeartFilled } from "react-icons/rx";
import { addwish, removewish } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import{toast} from'react-toastify'
function Wish({ ide }) {
  const dispatch = useDispatch();
  const wishdata = useSelector((state) => state.auth.wishData);
 const authstatus=useSelector((state) => state.auth.status);
  // Directly derive wish status from Redux state
  const wishstatus = wishdata.includes(ide);
 const navigate=useNavigate()
  const handleWishlistToggle = () => {
    if(!authstatus)
    {
      console.log(authstatus,"ifjsj")
      toast.error("⚠️ Please login to add items to your wishlist", {
        position: "top-center",
        autoClose: 2000, // 2 seconds
        style: {
          background: "#ffdddd",
          color: "#333",
          border: "1px solid #ff8888",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "16px",
          borderRadius: "10px",
        },
        onClose: () => navigate("/login"), // Redirect after toast closes
      });
  
    }
    else
    {
    if (wishstatus) {
      // If the item is already in wishlist, remove it
      dispatch(removewish(ide));
    } else {
      // If not in wishlist, add it
      dispatch(addwish(ide));
    }
  }
  };

  return (
    <>
      {wishstatus ? (
        <RxHeartFilled
          style={{ fontSize: "24px" }}
          className="text-red-700 cursor-pointer"
          onClick={handleWishlistToggle}
        />
      ) : (
        <RxHeart
          className="cursor-pointer"
          style={{ fontSize: "24px" }}
          onClick={handleWishlistToggle}
        />
      )}
    </>
  );
}

export default Wish;

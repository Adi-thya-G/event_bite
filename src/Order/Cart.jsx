import React from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { cartAdd, cartRemove } from "../store/authSlice";
import { toast } from 'react-toastify';
function Cart({id}) {
  const cartdata=useSelector((state)=>state.auth.cartData)
  const cartstatus = cartdata.includes(id);
  const data=useSelector((state)=>state.auth.cartData)
  const status=useSelector((state)=>state.auth.status)
  const dispatch=useDispatch()
  
  const handlecart=()=>{
    console.log(cartstatus,"cart",id)
    if(!status)
    {
      toast.error("⚠️ Please login to add items to your cart", {
        position: "top-center",
        style: {
          background: "#ffdddd",
          color: "#333",
          border: "1px solid #ff8888",
          fontWeight: "bold",
          fontSize: "16px",
          padding: "16px",
          borderRadius: "10px",
        },
      });
  
      
    }
    else{

      if(cartstatus)
        {
            dispatch(cartRemove(id))
            console.log(data,id)
        }
        else{
            dispatch(cartAdd(id))
            console.log(data,"add")
        }
       
    }
  }
  return (
    <>
    {
        cartstatus?
        <FaCartPlus size={24} onClick={()=>{handlecart()
          

        }}/>:
        <FaShoppingCart  size={24} onClick={()=>{
            handlecart()
          

        }}/>
      }</>
  )
}

export default Cart
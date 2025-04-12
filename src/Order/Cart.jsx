import React from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { cartAdd, cartRemove } from "../store/authSlice";
function Cart({id}) {
  const cartdata=useSelector((state)=>state.auth.cartData)
  const cartstatus = cartdata.includes(id);
  const data=useSelector((state)=>state.auth.cartData)
  const dispatch=useDispatch()
  
  const handlecart=()=>{
    console.log(cartstatus,"cart",id)
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
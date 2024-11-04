import React from 'react'
import { useState } from 'react';
import star from "/star.png";

function Card({name,price,rating,url}) {
  const [text, settext] = useState("Add to menu");
  

  const clickhandler = (item,value) => {
    if (text === "Add to menu") {
      console.log(item,value)
      settext("Remove from menu");
    } else {
      console.log(item)
      settext("Add to menu");
    }
  }
  return (
    <div className="flex max-sm:block space-x-3 max-sm:space-y-2 max-sm:align-middle">
    <div
      className="w-[280px]  bg-blue-100 rounded-3xl overflow-hidden 
  h-[350px] max-sm:h-[350px]  max-sm:rounded-lg border-2 border-blue-200"
    >
      {/* image*/}
      <div
        className="h-[150px] bg-cover bg-center  flow-root bg-yellow-400 "
        style={{
          backgroundImage:
           ` url()`
        }}
      >
        <span className="text-gray-800 bg-white font-semibold p-3 float-right flex ">
          {rating}
          <img src={star} alt="star"
        className="pr-1 w-[26px]" /></span>
      </div>
      {/* menu name */}
      <div className="p-4 ">
        <p className="text-xl leading-7 font-bold text-gray-700">{name}</p>
        <div className=" ">
          <p className=" block   text-lg text-green-600 font-semibold h-min ml-auto">
            {price} ₹        
            /Plates{" "}
          </p>
          <p>
            
            
          </p>
        </div>
        {/* button*/}
        <div className="mt-auto">
          <button
            className="block  bg-teal-800 text-white font-semibold px-3 py-2 mt-2 rounded-lg w-[240px] 
             active:text-indigo-300 active:animate-pulse 
        "
            onClick={()=>{clickhandler(name,price)}}
          >
            {text}
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Card
import React, { useDebugValue, useEffect } from "react";
import { useState } from "react";
import Wish from "./Wish";
import { FaRegHeart } from "react-icons/fa";
import Search from "./Search";
import Rating from "./Rating";
import { useSelector,useDispatch } from "react-redux";
import Cart from "./Cart";

function Card({ src, alt, description, name, rating,id }) {
   

  const [url,seturl]=useState(src)
  const [message, setmessage] = useState("");
  const dispatch=useDispatch()


  useEffect(()=>{
    let a=src.replace("preview","view").split("&")[0]+"&mode=admin"
     seturl(a)
     
  },[])
  
 
  return (
<>
<div
  className="mb-5 w-[490px] h-[200px] bg-zinc-50 border-2 border-zinc-100 pl-1 rounded-sm flex z-0
  max-md:flex-col max-md:w-[320px] max-md:h-auto max-sm:w-full
  motion-scale-in-[0.65] motion-translate-x-in-[0%] motion-translate-y-in-[6%] motion-rotate-in-[-27deg]"
  key={id}
>
  <div className="w-2/5 h-[200px] flex items-center max-md:w-full max-md:h-[180px]">
    <img
      className="w-full object-cover h-[90%] max-md:h-full"
      src={url}
      alt=""
    />
  </div>

  <div className="w-[280px] h-[160px] bg-stone-50 my-auto ml-2 max-md:w-full max-md:h-auto max-md:ml-0 max-md:mt-2 px-2 py-2">
    <div className="h-5/6 mt-1 max-md:h-auto">
      <div className="flex justify-end">
        <Rating rating={rating} />
      </div>
      <h2 className="flex justify-center text-[25px] text-orange-400 font-semibold font-mono py-2">
        {name}
      </h2>
      <p className="text-[15px]">{description}</p>
    </div>

    <div className="h-1/6 w-full flex mt-2">
      <Wish ide={id} />
      <button className="w-8 h-8 p-1 ml-auto rounded-md">
        <Cart id={id} />
      </button>
    </div>
  </div>
</div>

    </>
  );
}

export default Card;

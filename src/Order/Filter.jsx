import React, { useState } from 'react'
import { BsSliders } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiFilterOffFill } from "react-icons/ri"
import InputCheck from './InputCheck';
import { FaFilter } from 'react-icons/fa'

function Filter({setshow,document,setdocument,documentfilter,option,setoption,valuerange,setrange,valueprice,setprice,filterbutton,setbuttonfilter}) {
  
  const element=["veg","non veg"]
  const range=["Low to high","High to low"]
  const price=["1","2","3","4","5"]

  const handle=(e,ele,setele)=>{

    ele==e.target.value?setele(""):setele(e.target.value)
  }


  const filterhandle=()=>{
    
    console.log(option)
    if(filterbutton)
    {
     // category
      if(option!="")
      {
        console.log(option)
       setdocument( document.filter((ele)=>{
        return  ele.type==option
       }))

      }
      if(valueprice!="")
      {
        setdocument(document.filter((ele)=>{
          return ele.rating==valueprice

        }))
      }


    }
    else{
      setdocument(document)
      setoption("")
      setrange("")
      setprice("")
    }
      setbuttonfilter((pre)=>!pre)
  }

    
  return (
    <div className="motion-preset-focus-sm  w-80 h-[650px] bg-stone-100 border-2 border-stone-200 rounded-lg shadow-slate-100 inset-20 z-20 flex flex-row pt-1.5 ">
    
    <div className="w-72 pl-1.5  ">
    
      <h2 className="text-xl font-mono underline decoration-orange-200 ">Menu</h2>
      <ul className="flex flex-col gap-y-2 pl-2">
   {  element.map((ele)=>(
       <li className="flex" key={ele}>
       <InputCheck  onclick={handle} ele={ele} option={option} setoption={setoption}/>{ele}
       </li>
   ))}
      </ul>
    
    <div className="w-72 mx-auto pt-5">
      <h2 className="text-xl font-mono underline decoration-orange-200 ">Range</h2>
      <ul className="flex flex-col gap-y-2 pl-2">
   {  range.map((ele)=>(
       <li className="flex" key={ele}>
       <InputCheck  onclick={handle} ele={ele} option={valuerange} setoption={setrange}/>{ele}
       </li>
   ))}
      </ul>
    </div>
    <div className="w-72 mx-auto pt-5">
      <h2 className="text-xl font-mono underline decoration-orange-200 ">Price</h2>
      <ul className="flex flex-col gap-y-2 pl-2">
   {  price.map((ele)=>(
       <li className="flex" key={ele}>
       <InputCheck  onclick={handle} ele={ele} option={valueprice} setoption={setprice}/>{ele}
       </li>
   ))}
      </ul>
    </div>
 <div className='mt-20'>
 <button className=" mx-auto w-60 flex justify-center border-2 bg-orange-500 text-white border-orange-500  py-3 rounded-lg shadow-md shadow-orange-300 active:scale-[97.9999%]  "
  onClick={()=>{filterhandle()
  }}> <span>{filterbutton?"Add filter":"Remove filter"}</span>
    <div className="pl-1.5">
    {
      filterbutton?
      <div className='mt-1'>
        <FaFilter color="white"/>
      </div>
      :< RiFilterOffFill size={20}/>
    
    }
    </div>
  
  
  </button>
 </div>
 </div>
 <div className=''>
  <button className='pr-0.5' onClick={()=>{setshow(false)}}>
  <IoMdClose size={30} />
    </button></div>
  </div>
  )
}

export default Filter
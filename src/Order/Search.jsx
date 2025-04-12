import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
function Search({filter,setfilter,document}) {
const [search,setsearch]=useState("")
useEffect(()=>{
   setsearch(search.trimStart().toLocaleLowerCase())
   if(search=="")
    setfilter(document)
   else{
   
   
   
    setfilter(document.filter((ele)=>{ return ele.name.toLocaleLowerCase().startsWith(search)
    }),filter)
   
   
   
   
   }
  // console.log(setdocument(document.filter((ele)=>{
  //   return  String(ele.name).toLocaleLowerCase().search(search)>=0})))
  
  
},[search])


  return (
    <div className='w-[500px] h-20   mb-4 ml-10 max-md:w-80 max-md:ml-2 mt-4'>
        <input type="search" className='w-5/6 h-3/5 rounded-2xl p-2 text-[20px] border-2 border-slate-300
        focus:outline-none caret-slate-600 caret-animate-pulse placeholder:font-serif pr-10 peer
          focus:border-purple-500' placeholder='search' value={search} onChange={(e)=>setsearch(e.target.value)} />
      
      <button className="search-button" onClick={()=>{handlesubmit()}}>
      
      <FaSearch />
      </button>
   
    </div>
  )
}

export default Search
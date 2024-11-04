import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
function Search() {
const [search,setsearch]=useState("")
useEffect(()=>{
    console.log(search.trim())
},[search])

const handlesubmit=()=>{
   
}
  return (
    <div className='w-[500px] h-20   mb-4 ml-10 max-md:w-80 max-md:ml-2 mt-4'>
        <input type="text" className='w-5/6 h-3/5 rounded-2xl p-2 text-[20px] border-2 border-slate-300
        focus:outline-none caret-slate-600 caret-animate-pulse placeholder:font-serif  peer
          focus:border-purple-500' placeholder='search' value={search} onChange={(e)=>setsearch(e.target.value)} />
      
      <button className="search-button" onClick={()=>{handlesubmit()}}>
      <FaSearch />
      </button>
   
    </div>
  )
}

export default Search
import React, { useState,useRef, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import userimg from './Userimg'
import service from '../Appwrite/config'

function Profile() {
    // data fetch from redux
    var userdata=useSelector((state)=>state.auth.userData)
    var data=useSelector((state)=>state.auth.personalData)
  

//desiable
const [disabled,setdisable]=useState(true)
// use state for input
const nameRef = useRef(null);
const addressRef=useRef(null);
const pincodeRef=useRef(null);
const phoneRef=useRef(null);


const handlesubmit=async(e)=>{
  e.preventDefault()
 nameRef.current.value==" "?nameRef.current.defaultValue:nameRef.current.value
 addressRef.current.value==" "?addressRef.current.defaultValue:addressRef.current.value
 pincodeRef.current.value==" "?pincodeRef.current.defaultValue:pincodeRef.current.value
 phoneRef.current.value==" "?phoneRef.cureen.defaultValue:phoneRef.current.value
try{
  let response=await service.updataData(userdata.$id,{name:nameRef.current.value,
    phone: phoneRef.current.value,
    address:addressRef.current.value,
    pincode:pincodeRef.current.value
  })
  alert("Personal data is updated")
}
catch(error)
{
console.log(error)
}
finally{
  setdisable(true)
}

}

  return (
    <main className="flex-1 p-6 flex-col">
       <form >
  <h2 className="text-3xl font-bold mb-6"></h2>
  <div className="bg-white shadow-lg rounded-lg p-6">
    <div className="flex items-center mb-6">
      <div
        className="rounded-full  flex justify-center w-36 h-36 mr-10  uppercase bg-blue-500   "
      >
      <h2 className='mt-8 text-[60px] font-serif text-white '>{userimg(String(data?.name))
      }</h2>
        </div>
      <div>
       
      <input className={`w-[420px] outline-none  text-2xl bg-white
        ${disabled?"bg-white":"border-b-2 border-purple-400"}`} 
        type="text" disabled={disabled}  id='name'  defaultValue={data?.name} ref={nameRef}
       />
      
      </div>
    </div>
    <hr className="mb-4" />
    <h4 className="text-xl font-mono font-semibold mb-2">Address</h4>
    
    <input className={`w-full outline-none text-xl  ${disabled?"bg-white":"border-b-2 border-purple-400"}`}
     type="text" defaultValue={data?.address} disabled={disabled}  id='address'ref={addressRef}
     />
    <hr className="my-4" />


    <h4 className="text-xl font-mono font-semibold mb-2">Pincode</h4>
    <input  className={`w-20 outline-none text-xl  ${disabled?"bg-white":"border-b-2 border-purple-400"}`}
    type="text" maxLength={6} defaultValue={data?.pincode}  id='pincode' ref={pincodeRef}
   />


    <hr className="my-4" />
    <h4 className="text-xl font-mono font-semibold mb-2 gap-3 ">Contact Information</h4>
    <p className="text-gray-700 mb-2 font-mono text-[17px]">Email:{userdata?.email}</p>
    <p className="text-gray-700 font-mono text-[17px]">Phone: <input 
    className={`w-40 outline-none text-[17px]  ${disabled?"bg-white":"border-b-2 border-purple-400"}`}
    type="tel" defaultValue={data?.phone} maxLength={10}  id='phone' ref={phoneRef}
   
    /></p>
    <div className="mt-4">
      <button className={`  py-2 px-4 rounded  ${disabled?" bg-blue-500 hover:bg-blue-600 text-white":" bg-gray-300 text-black"}`}
       disabled={!disabled}
      onClick={()=>setdisable(false)}>
        Edit Profile
      </button>
      <button className={`ml-2 py-2 px-4 rounded ${disabled?" bg-gray-300 hover:bg-gray-400 ":"bg-blue-500 text-white"}`}
      onClick={(e)=>{ handlesubmit(e) }}
      disabled={disabled}>
        Save
      </button>
      
    </div>
    
  </div>
  </form>
</main>
  )
}

export default Profile
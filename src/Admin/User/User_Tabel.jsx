import React, { useEffect, useState } from 'react'
import faq_data from '../../Appwrite/faq_data'
import { FaSearch } from "react-icons/fa"
import { RiAdminLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import './Loader.css'
import { FaSortNumericDownAlt } from "react-icons/fa";

import { FaSortNumericUp } from "react-icons/fa";
function User_Tabel() {

  const [loading,setloading]=useState(true)
  const [data,setdata]=useState(
  //   {data:{
  //   total: 0,
  //   users: [
  //     {
  //       $id: "string",
  //       $createdAt: "2023-10-04T06:56:23.000Z",
  //       $updatedAt: "2023-10-04T06:56:23.000Z",
  //       email: "string",
  //       name: "string",
  //       phone: "string",
  //       labels: ["string"],
  //     },
  //   ],
  // }
    
   
  // }
  )
  const user_data=async()=>{
   try {
     let data1=await faq_data.Get_All_User_Data()
     setdata(data1)
     console.log(data)
      setloading(false)
    
   } catch (error) {
    console.log(error)
   }
  }

 const  handlesearch=()=>{

    let search=document.getElementById("search").value
    
 }
  // date format for created at
  const options = {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // query style

  const [query_style,setquery_style]=useState({
    email: true,
    name: true,
    phone: true,
    role: true,
    createdAt: true,
  
  })

 

  useEffect(()=>{
     user_data()
  },[])
    if(loading&&!data?.data?.users)  
      return <div className='flex justify-center items-center h-screen'>
        <div className='loader justify-center'></div>
      </div>

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
     
  <div className="px-6 py-5 flex">
    
    <h6 className="text-base font-medium text-gray-800 w-40  text-center">
      total user: {data?.data?.total}
    </h6>
    <h1 className="text-2xl font-mono  text-gray-800 w-full text-center font-bold">
      User Management
    </h1>
    <div className='ml-auto flex'>
    <FaSearch className=' text-gray-500 -mr-6 z-50  my-auto  border-gray-400  ' size={15} />
      <input type="search" name="" id="search" onChange={handlesearch} className='w-[400px] z-0 h-12 pl-7 text-[17px] rounded-lg pr-2 border-2 border-gray-500 focus:border-none'/>
    
    </div>
  </div>
  <div className="p-4 border-t border-gray-100 sm:p-6">
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="max-w-full overflow-x-auto">
          <table className="min-w-full undefined">
            <thead className="border-b-2  border-gray-200">
              <tr>
                <th className=" px-5 py-3 font-medium text-gray-600 text-start text-theme-xs">
                <button className={`flex items-center gap-2 hover:text-gray-800 ${query_style.email&&"text-gray-800"}`}
                onClick={()=>setquery_style({...query_style,email:!query_style.email})}>
                 Email Address
                 { query_style.email? <FaSortAlphaDown size={17}  />:
                 <FaSortAlphaUp  size={17} />}
                </button>
                </th>
                <th className=" px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                <button className={`flex items-center gap-2 hover:text-gray-800 ${query_style.name&&"text-gray-800"}`}
                onClick={()=>setquery_style({...query_style,name:!query_style.name})}>
                 User Name
                 { query_style.name? <FaSortAlphaDown size={17}  />:
                 <FaSortAlphaUp  size={17} />}
                </button>
                  
                </th>
                <th className=" px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                <button className={`flex items-center gap-2 hover:text-gray-800 ${query_style.phone&&"text-gray-800"}`}
                onClick={()=>setquery_style({...query_style,phone:!query_style.phone})}>
                 Phone Number
                 { query_style.phone? <FaSortNumericDownAlt size={17}  />:
                 <FaSortNumericUp size={17} />}
                </button>
                   
                </th>
                <th className=" px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                 Role
                </th>
                <th className=" px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                 Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-b-2 border-gray-200 ">
              {data?.data?.users?.map((item,index)=>(
                <tr className='' key={item.$id}>
                <td className=" px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                   
                    <div>
                      <p className="block font-medium text-gray-800 text-theme-sm">
                        {item.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className=" px-4 py-3 text-gray-800 text-start text-theme-sm">
                  {item.name. split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                </td>
                <td className=" px-4 py-3 text-gray-800 text-start text-theme-sm">
                  <div className="flex -space-x-2">
                       <p>{item.phone}</p>
                    
                  </div>
                </td>
                <td className=" px-4 py-3 text-gray-800 text-start text-theme-sm">
                    <div className="flex -space-x-2">
                        <p className='flex'>{item.labels.includes('admin')?<RiAdminLine size={20} className='mr-2'/>:<FaUser size={20} className='mr-2'/>}{item.labels==""?"user" :item.labels  }  </p>
                    </div>
                </td>
                <td className=" px-4 py-3 text-gray-800 text-theme-sm">
                 { new Date(item.$createdAt).toLocaleString("en-US", options).replace(',', ' -')
                 
                 }
                </td>
                
              </tr>

              ))}
              
             
              
             
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default User_Tabel
import React, { useEffect, useState } from 'react'
import { FiUsers } from "react-icons/fi";
import { GoPackage } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
import { PiChefHatBold } from "react-icons/pi";
import '../User/Loader.css'
import { BarChart } from '@mui/x-charts/BarChart';
// api object call
import rder_object from '../../Appwrite/Otp_Sender'
// vendor object
import vendor from '../../Appwrite/Add_vendor';
//get all user
import faq_data from '../../Appwrite/faq_data';
import Grap from './Grap';
function Admin_Home() {

    const [data,setdata]=useState({
        user:null,
        vendor:null,
        order:null,
        Revenue:null
    })

    const [order,setorder]=useState(null)
    const data_handler=async()=>{
        let response=await rder_object.List_Order()
        console.log(response.documents)
        if(response)
        {
            setdata((pre)=>({...pre,order:response.total}))
            setorder(response.documents)
            let sum=0
            response.documents.forEach((ele)=>{sum+=ele.amount})
            setdata((pre)=>({...pre,Revenue:sum}))
        }
        let res=await vendor.getVendor()
        if(res)
        {
            setdata((pre)=>({...pre,vendor:res.total}))
        }
        let res1=await faq_data.Get_All_User_Data()
        console.log(res1.data.total)
        if(res1)
        {   
            
            setdata((pre)=>({...pre,user:res1.data.total}))
        }
    }
    useEffect(()=>{
        data_handler()
    },[])
  return (
    <div className='w-full h-full grid grid-cols-2 gap-4 grid-flow-row aspect-ratio: 1 / 1'>

        <div className=' grid grid-cols-2 grid-rows-2 h-5/6 gap-4  items-center justify-center p-4'>
        <div className='bg-white h-4/5 rounded-lg shadow-lg shadow-gray-300 px-2 cursor-pointer'> 
            <div className='flex flex-col items-center justify-center h-full'>
                {data.Revenue==null?(
                    <div className='loader'></div>
                ):(
                    <>
                    <div className='p-3 '> <MdCurrencyRupee size={28}/></div>
                    <h1 className='text-sm text-gray-600'>Revenu</h1>
                     <h4 className='text-2xl font-bold flex justify-center'> {<MdCurrencyRupee size={20} className='mt-1'/>} <span>{Math.round(data.Revenue*100)/100}</span>  </h4>
                    </>
                )}
                </div>
            </div>
            <div className='bg-white h-4/5 rounded-lg shadow-lg shadow-gray-300 px-2 cursor-pointer'> 
            <div className='flex flex-col items-center justify-center h-full'>
                {data?.user==null?(<div className='loader'></div>):(
                    <>
                    <div className='p-3 '> <FiUsers size={28}/></div>
                    <h1 className='text-sm text-gray-600'>Total User </h1>
                     <h4 className='text-2xl font-bold'>{data.user} </h4>
                    </>
                )}
                </div>
            </div>
            <div className='bg-white h-4/5 rounded-lg shadow-lg shadow-gray-300 px-2 cursor-pointer'> 
            <div className='flex flex-col items-center justify-center h-full'>
                {
                    data?.order==null?(
                        <div className='loader'></div>
                    ):(
                        <>
                        <div className='p-3 '> <GoPackage size={28}/></div>
                    <h1 className='text-sm text-gray-600'>Orders </h1>
                     <h4 className='text-2xl font-bold'>{data?.order}  </h4>
                        </>
                    )
                }
                </div>
                
            </div>
            <div className='bg-white h-4/5 rounded-lg shadow-lg shadow-gray-300 px-2 cursor-pointer'> 
            <div className='flex flex-col items-center justify-center h-full'>
                
                {data?.vendor==null?(<div className='loader'></div>):
                (<>
                <div className='p-3 '> < PiChefHatBold size={28} /></div>
                <h1 className='text-sm text-gray-600'>Total Vendor </h1>
                 <h4 className='text-2xl font-bold'>{data?.vendor}  </h4>
                </>)
                }
                </div>
            </div>
        </div>
        <div className='bg-white h-3/4  shadow-md  shadow-slate-500 grid place-content-center justify-center my-2 mx-2 rounded-lg '>
        <h2 className='flex justify-center text-xl'>My Bar Chart</h2>
          {order==null?(<div className='loader'></div>):(<Grap order={order}/>)}
        </div>
        
    </div>
  )
}

export default Admin_Home
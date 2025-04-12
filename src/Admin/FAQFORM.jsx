import React, { useState } from 'react'
import faq_data from '../Appwrite/faq_data'
import { ToastContainer, toast } from 'react-toastify';
import clear_data from '../validation_class/ClearData'
function FAQFORM() {
  const [question,setquestion]=useState("")
  const[answer,setanswer]=useState("")
  const[type,settype]=useState("")
 const handlesubmit=async()=>{
   try{
    if(type&&question&&answer)
    {
     let res= await faq_data.CREATE_FAQ(question,answer,type)
     toast.success("data is saved successfully",)
     clear_data(setanswer,setquestion,settype)
    }
    else{
        toast.error("data not saved")
    }
   }
   catch(error)
   {
    console.log(error)
   }
 }

  return (
    <div className='main-content m-2 bg-white shadow-lg rounded-lg '>
        <div className='w-2/4 mx-auto '>
        <form action="">
          <label htmlFor="" className='m-0'>Question:</label>
          <textarea name="" id="" value={question} onChange={(e)=>setquestion(e.target.value)} className='border-2 border-red-600 w-80'></textarea>
        
          <label htmlFor="">Answer</label>
         <textarea name="" id="" value={answer} onChange={(e)=>setanswer(e.target.value)} className='border-2 border-red-600'></textarea>
         <label htmlFor="">type:</label>
         
         <input type="text" value={type} onChange={(e)=>settype(e.target.value)} className='border-2 border-red-600 h-10'/>

         <button className='w-20 h-10 rounded-md border-2 border-purple-300'
         onClick={(e)=>{e.preventDefault()
          handlesubmit()
         }}
         >submit</button>
        </form>
     
    </div>
    </div>
  )
}

export default FAQFORM
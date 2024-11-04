import React, { useState } from 'react'
import Label from './Createac/Label'
import Eye from './Login/Eye'
import {useForm} from 'react-hook-form'
import validation_obj from './validation_class/validation'
import authService from './Appwrite/auth'
function Forget() {
   const [password,setpassword]=useState(true)
   const[confirm,setconfirm]=useState(true)
//use form hooks
   const form=useForm();
  const {register,handleSubmit,formState,watch}=form
//error
  const {errors}=formState
   const value_password=watch("password",'')
  
// EYE CHANGER
  const eyechanger=(e,pas)=>{
    e.preventDefault()
  let input= document.getElementById(pas)
  let type=input.getAttribute("type")

  input.setAttribute("type",type=="password"?"text":"password")
}
// data handle
  const handlesubmit=async(data)=>{
    console.log(data)
   try{
   const response= await authService.updatepassword(data["password"])
   if(response)
     console.log(response)
   }
   catch(error)
   {
    console.log(error)
   }
  
  
  }
  
    return  (
    <div className=' w-max mx-2 p-4 
    pl-1 flex justify-center mt-10 
    max-lg:block border-2 bg-transparent
     border-gray-600 rounded-lg max-lg:w-[470px] max-md:w-[310px] max-md:mx-auto max-md:pr-0'>
  <form onSubmit={handleSubmit(handlesubmit)}>
{/* password*/}
<div className='box-content relative mt-10'>
        <input type="password" id='password'
        className="float-left rounded-md w-[400px] h-full  text-xl p-2
        border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer max-md:w-[96%]"
        maxLength={20}
         placeholder=' ' 
         {...register('password',{required :"password is required", 
            validate:(filed)=>{return validation_obj.password_validation(filed)}
          })}
         />
        <button className='relative w-3 h-3 right-8 top-1 scale-[0.996]'  onClick={(e)=>{eyechanger(e,"password") 
      setpassword((pre)=>!pre)
       }}><Eye condition={password}/></button>
        <Label text="Password" htmlfor="password"className=''/>
        <p className='text-red-400 text-sm'>{errors.password?.message}</p>
    </div>

    <div className='box-content relative my-16'>
        <input type="password" id='confirm'
        className="float-left rounded-md w-[400px] h-full  text-xl p-2
        border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer max-md:w-[96%]"
        maxLength={20}
         placeholder=' ' 
         {...register('confirm',{required :"password is required", 
          validate:(filed)=>{return validation_obj.confirm_password(value_password,filed,"confirm")}
        })}
         />
        <button className='relative  w-3 h-3 right-8 top-1 scale-[0.996]'onClick={(e)=>{
          eyechanger(e,"confirm")
        setconfirm((pre)=>!pre)
        
    }}><Eye condition={confirm}/></button>
        <Label text="Confirm" htmlfor="confirm"className=''/>
        <p className='text-red-300 text-sm'>{errors.confirm?.message}</p>
    </div>
    <div className='flex justify-center'>
        <button className='py-2 px-3 border-2 border-blue-400 rounded-lg text-white bg-blue-500
         font-serif text-xl active:scale-[0.996] shadow-sm shadow-blue-300 '>Submit</button>
    </div>
    </form>
   </div>
  )
}

export default Forget
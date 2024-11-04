import React, { useState } from 'react'
import Label from './Label'
import Eye from '../Login/Eye'
import {useForm} from 'react-hook-form'
import validation_obj from '../validation_class/validation'
import authService from '../Appwrite/auth'
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { login,logout } from '../store/authSlice'
import service from "../Appwrite/config.js";
function Create() {

  const form=useForm();
  const {register,handleSubmit,formState,watch}=form
  const passwordvalid=watch("Password",'')

  const {errors}=formState
  
  //reacr-redux
  const dispatch=useDispatch()
  //use navigate to home after login
  const navigate=useNavigate()
const selector=useSelector((state)=>state.auth.status)  


//eyechange variable
  const [password,setpassword]=useState(true)
  const [confirm,setconfirm]=useState(true)
  const eyechanger=(e,pas)=>{
    e.preventDefault()
  let input= document.getElementById(pas)
  let type=input.getAttribute("type")

  input.setAttribute("type",type=="password"?"text":"password")
   
  }
const handlesubmit=async(data)=>{
  try{
    const userData=await authService.createAccount({email:data['Email'],password:data['Password'],name:data["Name"]})
    if (userData) {
     
      try{
      const personalData=await service.createUserData(userData["userId"],{Name:data["Name"],Phone:data["Phone"],
        Address:data["Address"],Pincode:data["Pincode"]})
      console.log(personalData)
      dispatch(login({userData,personalData}));
      alert("Logged in");
      navigate("/");
    }
    catch(error)
    {
  console.log(error)
    }
    
  }
}
 catch(errors){
    console.log(errors)
 }

  }

  return (
    <div className='  w-max mx-2 flex justify-center 
     mt-10 max-lg:block border-2 bg-transparent border-gray-600 rounded-lg max-lg:w-[475px]'>
    <form 
    onSubmit={handleSubmit(handlesubmit)}  
    className='p-4 overflow-hidden'>
      {/*this heading style */}
        <div className='flex mb-20  justify-center'>
          <div className='font-serif text-5xl  w-[200px] flex font-medium'>
            <div className='text-pink-500 animate-colidx  font-serif mr-2'>Sign</div>
              <div
              className='text-purple-400 font-serif animate-colidy   pl-2 ml-1' >Up</div>
              </div>
        
        </div>
        {/*input and output */}
       <div className='flex w-max max-lg:block  '>
        <div className='w-max h-max pl-4 pr-10 relative flex flex-col space-y-10 '>
        
        <div className=' box-content relative z-0'>
         <input 
         className="float-left rounded-md w-[400px] h-full  text-xl p-2 
         border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer"
         id='Name'maxLength={30}
         type="text" placeholder=' '
        {...register('Name',{required :"Please fill out this field", 
          validate:(filed)=>{return  validation_obj.name_validation(filed)}
        
        })}
         
         />
         <Label text="Name" forhtml="Name"/>
         <p className='text-red-400 text-sm'>{errors.Name?.message}</p>

       </div>
     <div className=' box-content relative'>
      
     <input 
         className="float-left rounded-md w-[400px] h-full  text-xl p-2
         border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer"
         id='Phone'maxLength={10}
         type="tel" placeholder=' '
         {...register('Phone',{required:"Please fill out this field",
          validate:(filed)=>{return validation_obj.phone_validation(filed)}})}
         
         />
         <Label text="Phone" forhtml="Phone"/>
      <p className='text-red-400 text-sm'>{errors.Phone?.message}</p>
     </div>

     <div className='box-border relative'>
      
     <input 
         className="float-left rounded-md w-[400px] h-full  text-xl p-2
         border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer"
         id='Email'maxLength={30}
         type="Email" placeholder=' '
         {...register('Email',{
          required:"Please fill out this field",
         validate:(filed)=>{return validation_obj.email_validation(filed)}  
         })
        }
         />
         
         <Label text="E-mail" htmlfor="Email"/>
         <p className='text-red-400 text-sm'>{errors.Email?.message}</p>
     </div>
    
     <div className='box-border relative'>
      
     <textarea
         className="float-left rounded-md w-[400px] h-24 text-xl leading-8 p-2
         border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer"
         id='Address'
          
         rows={1} placeholder=' '
         {...register('Address',{required:"Please fill out this field",validate:(filed)=>{validation_obj.address_validation(filed)}})}
         
         />
         <Label text="Address" htmlfor="Address"/>
         <p className='text-red-400 text-sm'>{errors.Address?.message}</p>
     </div>
    
        </div>
       <div className='w-max h-max pl-10 pr-2 relative flex flex-col space-y-10  max-lg:mt-8 max-lg:p-4'>

   
     <div className='relative box-content'>

     <input 
         className="float-left rounded-md w-[400px] h-full  text-xl p-2
         border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer"
         id='Pincode'maxLength={30}
         type="text" placeholder=' '
         {...register('Pincode',{required:"Please fill out this field",validate:(filed)=>{return validation_obj.pincode_validation(filed)}})}
         />
         <Label text="Pincode" htmlfor="Pincode" />

         <p className='text-red-400 text-sm'>{errors.Pincode?.message}</p>
     </div>



     <div className='box-content relative'>
<input 
    className={`float-left rounded-md w-[400px] h-full  text-xl p-2
    border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer ${errors.Password?.message&& 'border-red-500'}`}
    id='Password'maxLength={30}
    type='password' placeholder=' '
    autoComplete='rr'
    {...register('Password',{required:"Please fill out this field",validate:(filed)=>{return validation_obj.password_validation(filed)}})}
    />
    <button className='relative right-8 top-2'onClick={(e)=>{eyechanger(e,"Password")
      setpassword((pre)=>!pre)
    }}><Eye condition={password}/></button>
    <Label text="Password" htmlfor="Password" className=''/>
    <p className='text-red-400 text-sm'>{errors.Password?.message}</p>
</div>

<div className='box-content relative'>

<input 
    className={`float-left rounded-md w-[400px] h-full  text-xl p-2
    border-2 border-gray-700 shadow-sm placeholder:text-gray-500 peer  `} 
    id='Co_password'maxLength={30}
    type='password'   placeholder=' ' autoComplete=''
    {...register('Co_password',{
      required:"confirm password is required",
      validate:(filed)=>{return validation_obj.confirm_password(passwordvalid,filed,"Co_password")}
    })}
    />
    <button className='relative right-8 top-2' onClick={(e)=>{eyechanger(e,"Co_password") 
      setconfirm((pre)=>!pre)}}>
        <Eye condition={confirm}/></button>
    <Label text="Confirm" htmlfor="Co_password" className=''/>
    <p className='text-red-400 text-sm'>{errors.Co_password?.message}</p>
   
</div>
<div className='box-content relative'>
<input type='checkbox' className='w-5 h-5 rounded-full' required />
</div>
 
<div className='box-content relative flex justify-center'>
<button className=' px-4 py-2 border-2
 hover:border-purple-500 rounded-md border-gray-500 font-semibold text-white text-lg font-serif bg-blue-400 active:scale-[.99] '>Submit</button>

</div>


       </div>

        </div>
        
    </form>

    </div>
  )
}

export default Create
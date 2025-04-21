import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { Eye } from "./Eye.jsx";
import Google from "./Google.png";
import {useForm} from 'react-hook-form'
import authService from '../Appwrite/auth'
import { login, updateAdmin, wishstore } from "../store/authSlice.js";
import { useDispatch ,useSelector} from "react-redux";
import service from '../Appwrite/config.js'
import { useNavigate } from "react-router-dom";
import  validation_obj from '../validation_class/validation.js'
function Login() {
  const [password, setpassword] = useState(true);
  const [error,seterror]=useState("")

const navigate=useNavigate()
const form=useForm();
const {register,handleSubmit,reset,formState,watch}=form
const email=watch("email")
const dispatch=useDispatch()
const {errors}=formState


const handlesubmit=async(data)=>{
try{
 
  let userData=await authService.login({email:data["email"],password:data["password"]})
  console.log(userData)
  let curentUser=await authService.getCurrentUser()
if (userData)
{ 
  if(curentUser.labels.includes("admin"))
    dispatch(updateAdmin())
  try{
    const personalData=await service.getData(userData["userId"])
    console.log(userData)
  dispatch(login({userData,personalData}))
  dispatch(wishstore(personalData.wishlist))
  reset()
  navigate("/")
  }
  catch(error){
    console.log(error)

  }

}
}
catch(er)
{
  seterror(er.message)
}

}

  return (
    
    <div className=" flex m-auto w-max h-max px-12 py-10 justify-center 
    border-2 border-gray-400 mt-3
     rounded-md max-lg:border-none 
     max-lg:w-[300px] max-lg:h-[700px] max-lg:text-xl max-lg:ml-2">
      <div className="max-lg:h-[700px] max-lg:w-[300px]">
      
        <div className="font-serif text-2xl mb-4 ">
          <h2 className="flex justify-center text-3xl">Login</h2>
        </div>
        <br />
        <div className="flow-root w-[400px] max-lg:w-[300px]">
          <p className='text-red-400 text-sm'>{error!=""?error:null}</p>
          <label
            htmlFor="email"
            className=" float-left text-gray-600 
        font-semibold  text-xl 
        mb-1
        "
          >
           E-mail
          </label>
          <input
            className="float-left rounded-md w-full h-full 
        text-xl p-2
        border-2 border-gray-700 shadow-sm placeholder:text-gray-500 
        focus:ring-1 focus:ring-inset focus:ring-indigo-600 "
            type="text"
            placeholder="Enter email"
            maxLength={28}
            name="email"
            id="email"
           {...register("email",{required:"email is required"})}
          />
          <br />
             <p className='text-red-400 text-sm'>{errors.email?.message}</p>
          <label
            htmlFor="password"
            className="float-left text-gray-600 
        font-semibold  text-xl 
        mb-1  mt-5 "
          >
            Password
          </label>
          <button
            className="w-max h-max float-end  translate-y-14 pr-1 pt-2 rotate-1  
        "
            onClick={() => {
              let password = document
                .getElementById("password")
                .getAttribute("type");
              document
                .getElementById("password")
                .setAttribute(
                  "type",
                  password == "password" ? "text" : "password"
                );
              setpassword((pre) => !pre);
            }}
          >
          
          <Eye condition={password} />
         
          </button>
          <input
            id="password"
            className="float-left rounded-md w-full h-full 
        text-xl p-2
        border-2 border-gray-700  shadow-sm placeholder:text-gray-500
         
        focus:ring-1 focus:ring-inset focus:ring-indigo-600  "
            type="password"
            placeholder="Enter password"
            maxLength={18}
            {...register("password",{required:"password is required"})}
          />
          <br />
          <br />
          <p className='text-red-400 text-sm'>{errors.password?.message}</p>
          
          
          <NavLink className="font-serif float-end text-blue-400 active:scale-[0.996] active:underline" 
            to="/reset-password"
           >
            forget password
          </NavLink>
        </div>
        <div className="mt-4">
          <button onClick={handleSubmit(handlesubmit)}
            className="px-12 py-2  border-2 w-full
         font-semibold
         text-white
         bg-blue-600
         rounded-md
         active:border-violet-500
         mb-4 
        text-2xl"
          >
            Login
          </button>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        
          <button
            className="box-border w-full  select-none py-2 px-4 border-2 border-blue-400 rounded-md flex justify-center
        active:bg-blue-400 active:text-white"
         onClick={async()=>{
       
        let res=await authService.login_with_google()
        console.log(res)
        if(res)
        {
           let response =await authService.getCurrentUser()
        }
         
        }}
         >
            <img src={Google} alt="" className="w-[30px] h-[30px] " />
            <span className=" pl-5 font-semibold text-2xl ">
              Login with Google
            </span>
          </button>
        </div>
        <div>
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <p className="text-xl max-lg:text-[15px] font-serif select-none">
            Don't have any account yet ?
            <Link  to ="/signup"className="text-blue-300 active:underline cursor-pointer">
              Create account
            </Link>
          </p>
         
        </div>
        
      </div>
    </div>
  );
}

export default Login;

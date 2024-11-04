import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { Eye } from "./Eye.jsx";
import Google from "./Google.png";


function Login() {
  const [password, setpassword] = useState(true);
  const [email,setemail]=useState()
  const [pass,setpass]=useState()

const handlesubmit=async(e)=>{
  e.preventDefault()
  
}
  return (
    
    <div className=" flex m-auto w-max h-max px-12 py-10 justify-center 
    border-2 border-gray-400 mt-3
     rounded-md max-lg:border-none 
     max-lg:w-[300px] max-lg:h-[700px] max-lg:text-xl max-lg:ml-2">
      <div className="max-lg:h-[700px] max-lg:w-[300px]">
      
        <div className="font-serif text-2xl mb-4 ">
          <h2>Sign up</h2>
        </div>
        <div className="flow-root w-[400px] max-lg:w-[300px]">
          
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
            maxLength={19}
            name="email"
            id="email"
          />
          <label
            htmlFor="password"
            className="float-left text-gray-600 
        font-semibold  text-xl 
        mb-1  mt-5 "
          >
            Password
          </label>
          <button
            className="w-max h-max float-end  translate-y-14 pr-1 pt-2 -rotate-1 -z-50
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
          />
          <Link to="/login/recovery" className="font-serif float-end text-blue-400 active:scale-[0.996] active:underline">
            {" "}
            Forget password
          </Link>
        </div>
        <div className="mt-4">
          <button
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

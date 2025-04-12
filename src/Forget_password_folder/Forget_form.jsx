import React from 'react'
import { useState } from 'react'
import authService from '../Appwrite/auth'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Forget_form() {
  // this two variable used for password and confirm-password 
  const [password,setpassword]=useState("")
  const [confirm_password,set_confirm_passowrd]=useState("")

  // fetch userid secret form url
  const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');
    
    const navigate=useNavigate()
    //  this function used for change password
    const handlesubmit=async(e)=>{
      e.preventDefault()
     try {
      const res=await authService.Updatepassword(userId,secret,password); 
      if(res)
      {
        navigate("/login")
      }
       
     } catch (error) {
      console.log(error);
      
     }
     
  }
  return (
    <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
    <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md sm:p-8">
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Change Password
      </h2>
      <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" >
        
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder=""
            value={confirm_password}
            onChange={(e)=>set_confirm_passowrd(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            required=""
          />
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="newsletter"
              aria-describedby="newsletter"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
              required=""
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="newsletter"
              className="font-light text-gray-500 "
            >
              I accept the{" "}
              <a
                className="font-medium text-primary-600 hover:underline "
                href="#"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-gray-700 bg-primary-600 hover:bg-blue-600 border-2 border-blue-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
         onClick={handlesubmit}
        >
          Reset passwod
        </button>
      </form>
    </div>
  </div>
</section>
  )
}

export default Forget_form
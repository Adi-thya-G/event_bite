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
  const form = useForm();
  const {register, handleSubmit, formState, watch} = form
  const passwordvalid = watch("Password", '')
  const {errors} = formState
  const [error,seterror]=useState("")
  // react-redux
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selector = useSelector((state) => state.auth.status)  

  // eye change variable
  const [password, setpassword] = useState(true)
  const [confirm, setconfirm] = useState(true)
  
  const eyechanger = (e, pas) => {
    e.preventDefault()
    let input = document.getElementById(pas)
    let type = input.getAttribute("type")
    input.setAttribute("type", type == "password" ? "text" : "password")
  }

  const handlesubmit = async(data) => {
    try {
      const userData = await authService.createAccount({
        email: data['Email'],
        password: data['Password'],
        name: data["Name"],
        phone: data["Phone"]
      })
      
      if (userData) {
        try {
          const personalData = await service.createUserData(userData["userId"], {
            Name: data["Name"],
            Phone: data["Phone"],
            Address: data["Address"],
            Pincode: data["Pincode"]
          })
          console.log(personalData)
          dispatch(login({userData, personalData}));
          alert("Logged in");
          navigate("/");
        } catch(error) {
          console.log(error)
        }
      }
    } catch(errors) {
      console.log(errors)
      seterror(errors.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit(handlesubmit)} className="p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold">
              <span className="text-pink-500">Sign</span>
              <span className="text-purple-500">Up</span>
            </h1>
            <p className="text-gray-500 mt-2">Create your account to get started</p>
          </div>
           <div className='mb-8'>
            <span className='text-red-500'>

            {error}
            </span>
           </div>
          {/* Form Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
            {/* Left Column */}
            <div className="space-y-6">
              <div className="relative z-0">
                <input 
                  className={`peer w-full p-4 text-lg border-2 rounded-lg focus:border-purple-500 focus:outline-none transition-colors ${
                    errors.Name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="Name"
                  maxLength={30}
                  type="text" 
                  placeholder=" "
                  {...register('Name', {
                    required: "Please fill out this field", 
                    validate: (filed) => validation_obj.name_validation(filed)
                  })}
                />
                <Label text="Name" forhtml="Name" />
                <p className="text-red-500 text-sm mt-1">{errors.Name?.message}</p>
              </div>

              <div className="relative z-0">
                <input 
                  className={`peer w-full p-4 text-lg border-2 rounded-lg focus:border-purple-500 focus:outline-none transition-colors ${
                    errors.Phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="Phone"
                  maxLength={10}
                  type="tel" 
                  placeholder=" "
                  {...register('Phone', {
                    required: "Please fill out this field",
                    validate: (filed) => validation_obj.phone_validation(filed)
                  })}
                />
                <Label text="Phone" forhtml="Phone" />
                <p className="text-red-500 text-sm mt-1">{errors.Phone?.message}</p>
              </div>

              <div className="relative z-0">
                <input 
                  className={`peer w-full p-4 text-lg border-2 rounded-lg focus:border-purple-500 focus:outline-none transition-colors ${
                    errors.Email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="Email"
                  maxLength={30}
                  type="email" 
                  placeholder=" "
                  {...register('Email', {
                    required: "Please fill out this field",
                    validate: (filed) => validation_obj.email_validation(filed)
                  })}
                />
                <Label text="E-mail" forhtml="Email" />
                <p className="text-red-500 text-sm mt-1">{errors.Email?.message}</p>
              </div>

              <div className="relative z-0">
                <textarea
                  className={`peer w-full p-4 text-lg border-2 rounded-lg focus:border-purple-500 focus:outline-none transition-colors min-h-[100px] ${
                    errors.Address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="Address"
                  rows={1} 
                  placeholder=" "
                  {...register('Address', {
                    required: "Please fill out this field",
                    validate: (filed) => validation_obj.address_validation(filed)
                  })}
                />
                <Label text="Address" forhtml="Address" />
                <p className="text-red-500 text-sm mt-1">{errors.Address?.message}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="relative z-0">
                <input 
                  className={`peer w-full p-4 text-lg border-2 rounded-lg focus:border-purple-500 focus:outline-none transition-colors ${
                    errors.Pincode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  id="Pincode"
                  maxLength={30}
                  type="text" 
                  placeholder=" "
                  {...register('Pincode', {
                    required: "Please fill out this field",
                    validate: (filed) => validation_obj.pincode_validation(filed)
                  })}
                />
                <Label text="Pincode" forhtml="Pincode" />
                <p className="text-red-500 text-sm mt-1">{errors.Pincode?.message}</p>
              </div>

              <div className="relative z-0">
                <div className="relative">
                  <input 
                    className={`peer w-full p-4 text-lg border-2 rounded-lg focus:border-purple-500 focus:outline-none transition-colors ${
                      errors.Password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    id="Password"
                    maxLength={30}
                    type="password" 
                    placeholder=" "
                    autoComplete="new-password"
                    {...register('Password', {
                      required: "Please fill out this field",
                      validate: (filed) => validation_obj.password_validation(filed)
                    })}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                    onClick={(e) => {
                      eyechanger(e, "Password")
                      setpassword((pre) => !pre)
                    }}
                  >
                    <Eye condition={password} />
                  </button>
                  <Label text="Password" forhtml="Password" />
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.Password?.message}</p>
              </div>

              <div className="relative z-0">
                <div className="relative">
                  <input 
                    className={`peer w-full p-4 text-lg border-2 rounded-lg focus:border-purple-500 focus:outline-none transition-colors ${
                      errors.Co_password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    id="Co_password"
                    maxLength={30}
                    type="password" 
                    placeholder=" " 
                    autoComplete="new-password"
                    {...register('Co_password', {
                      required: "Confirm password is required",
                      validate: (filed) => validation_obj.confirm_password(passwordvalid, filed, "Co_password")
                    })}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                    onClick={(e) => {
                      eyechanger(e, "Co_password") 
                      setconfirm((pre) => !pre)
                    }}
                  >
                    <Eye condition={confirm} />
                  </button>
                  <Label text="Confirm Password" forhtml="Co_password" />
                </div>
                <p className="text-red-500 text-sm mt-1">{errors.Co_password?.message}</p>
              </div>

              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms"
                  className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500"
                  required 
                />
                <label htmlFor="terms" className="ml-2 text-gray-700">
                  I agree to the terms and conditions
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create
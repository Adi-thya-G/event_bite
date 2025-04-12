import React, { useEffect } from 'react'
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { useParams,useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OTP_OBJECT from '../Appwrite/Otp_Sender';
import OTPVerification from './OTPVerification';
import Order_object from '../Appwrite/Otp_Sender';
import axios from 'axios'
import PayPal_Payment from '../Payment/PayPal_Payment';


function Delivery_Information() {
  // validation 

  
  const location = useLocation();
  const { state } = location;  // state contains url_param and data
  const { url_param, data } = state ||{}

  const [item,setitem]=useState([])
   const navigate=useNavigate()
  // Accessing the query parameters
   const par=useParams()
  
    // to reduce request after implemetion we use
  
    useEffect(()=>{par.order==url_param||navigate("not found page")
      let element1=[]
     data.forEach(element => {
      element1.push(element.name)
      
     });
     setitem(element1)
    },[url_param])

   
   
  
   const [Otp_Document_Id,SetOtpDocumentId]=useState('')
   
    
  const userdata =useSelector((state)=>state.auth.userData)
  const personalData =useSelector((state)=>state.auth.personalData)

  console.log(personalData)

    const [formData, setFormData] = useState({
      fullName: "",
      primaryPhone: "",
      alternativePhone: "",
      address: "",
      deliveryDate: "",
      deliveryTime: "",
      plates: 1
    });
  
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const validateField = ((name, value) => {
      const newErrors = { ...errors };
  
      switch (name) {
        case "fullName":
          if (!value) newErrors.fullName = "Full name is required";
          else if (value.length > 50) newErrors.fullName = "Name cannot exceed 50 characters";
          else delete newErrors.fullName;
          break;
  
        case "primaryPhone":
          if (!value) newErrors.primaryPhone = "Phone number is required";
          else if (!/^\d{10}$/.test(value)) newErrors.primaryPhone = "Enter valid 10-digit number";
          else delete newErrors.primaryPhone;
          break;
  
        case "alternativePhone":
          if (value && !/^\d{10}$/.test(value)) newErrors.alternativePhone = "Enter valid 10-digit number";
          else delete newErrors.alternativePhone;
          break;
  
        case "address":
          if (!value) newErrors.address = "Address is required";
          else if (value.length > 200) newErrors.address = "Address cannot exceed 200 characters";
          else delete newErrors.address;
          break;
  
        case "deliveryDate":
          const today = new Date().toISOString().split("T")[0];
          if (!value) newErrors.deliveryDate = "Delivery date is required";
          else if (value < today) newErrors.deliveryDate = "Cannot select past date";
          else delete newErrors.deliveryDate;
          break;
  
        case "deliveryTime":
          const time = value.split(":")
          const hours = parseInt(time[0]);
          if (!value) newErrors.deliveryTime = "Delivery time is required";
          else if (hours < 10 || hours >= 20) newErrors.deliveryTime = "Select time between 10 AM - 8 PM";
          else delete newErrors.deliveryTime;
          break;
  
        default:
          break;
      }
  
      setErrors(newErrors);
    }, 300);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    
    };
  
    const handleSubmit = async(e) => {
      console.log(formData,userdata.$id,userdata)
      e.preventDefault();
      try {
        // this await used to store order data in order_table
      let res=await Order_object.Create_Order({
        delivery_date:formData.deliveryDate,
        status:"confirmed",
        address:formData.address,
        contact:formData.primaryPhone,
        user:userdata.$id,
        Number_of_Plates:parseInt(formData.plates),
        Item_name:item,
        Alternative_Phone:formData.alternativePhone,
        delivery_time:formData.deliveryTime})
        console.log(userdata)
      if(res)
      { 
        let response = await OTP_OBJECT.create_otp({user_id:userdata.email,order_id:res.$id})
        let a=JSON.parse(response.responseBody)
        if (a.success) {
          SetOtpDocumentId(a)
        setIsModalOpen(true);
        }
        // await to send otp to user email
      }
    
     
      } catch (error) {
        console.log(error)
      }
    };
  
    const handleReset = () => {
      setFormData({
        fullName: "",
        primaryPhone: "",
        alternativePhone: "",
        address: "",
        deliveryDate: "",
        deliveryTime: "",
        plates: 1
      });
      setErrors({});
    };
  
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Food Delivery Order</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  maxLength="50"
                  placeholder="Enter your full name"
                  className={`mt-1 block w-full h-10 p-1 rounded-md shadow-sm ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                  aria-invalid={errors.fullName ? "true" : "false"}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>
  
              <div>
                <label htmlFor="primaryPhone" className="block text-sm font-medium text-gray-700">Primary Phone *</label>
                <input
                  type="tel"
                  id="primaryPhone"
                  name="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  className={`mt-1 block w-full h-10 p-1 rounded-md shadow-sm ${errors.primaryPhone ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                  aria-invalid={errors.primaryPhone ? "true" : "false"}
                />
                {errors.primaryPhone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" />
                    {errors.primaryPhone}
                  </p>
                )}
              </div>
  
              <div>
                <label htmlFor="alternativePhone" className="block text-sm font-medium text-gray-700">Alternative Phone</label>
                <input
                  type="tel"
                  id="alternativePhone"
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleChange}
                  placeholder="10-digit phone number (optional)"
                  className={`mt-1 block w-full h-10 p-1 rounded-md shadow-sm ${errors.alternativePhone ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                  aria-invalid={errors.alternativePhone ? "true" : "false"}
                />
                {errors.alternativePhone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" />
                    {errors.alternativePhone}
                  </p>
                )}
              </div>
            </div>
  
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Delivery Details</h3>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  maxLength="200"
                  placeholder="Complete delivery address"
                  className={`mt-1 block w-full p-1 rounded-md shadow-sm ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FaExclamationCircle className="mr-1" />
                    {errors.address}
                  </p>
                )}
              </div>
  
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">Delivery Date *</label>
                  <input
                    type="date"
                    id="deliveryDate"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className={`mt-1  block w-full h-10 p-1 rounded-md shadow-sm ${errors.deliveryDate ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                    aria-invalid={errors.deliveryDate ? "true" : "false"}
                  />
                  {errors.deliveryDate && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      {errors.deliveryDate}
                    </p>
                  )}
                </div>
  
                <div>
                  <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700">Delivery Time *</label>
                  <input
                    type="time"
                    id="deliveryTime"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    className={`mt-1 block w-full h-10 p-1 rounded-md shadow-sm ${errors.deliveryTime ? 'border-red-500' : 'border-gray-300'} focus:ring-indigo-500 focus:border-indigo-500`}
                    aria-invalid={errors.deliveryTime ? "true" : "false"}
                  />
                  {errors.deliveryTime && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      {errors.deliveryTime}
                    </p>
                  )}
                </div>
              </div>
            </div>
  
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Order Quantity</h3>
              
              <div>
                <label htmlFor="plates" className="block text-sm font-medium text-gray-700">Number of Plates *</label>
                <input
                  type="number"
                  id="plates"
                  name="plates"
                  value={formData.plates}
                  onChange={handleChange}
                  min="10"
                  max="2000"
                  className="mt-1 block w-full h-10 p-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
  
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={Object.keys(errors).length > 0}
                className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-200 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Clear Form
              </button>
            </div>
          </form>
  
          {/* {isModalOpen1 &&( 
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Confirmed!</h3>
                <p className="text-gray-500">Your order has been successfully placed.</p>
                <button
                  onClick={() => {setIsModalOpen1(false) 
                    navigate("/dashboard/cart")
                  }}
                  className="mt-4 w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
    )
            
          } */}
          
          {isModalOpen && (<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <OTPVerification setis={setIsModalOpen} setis1={setIsModalOpen1}  otp_table_id={Otp_Document_Id} SetOtpDocumentId={SetOtpDocumentId} item={item} />
            </div>)}
        </div>
      </div>
    );
  };
  

export default Delivery_Information
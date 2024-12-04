import React, { useState } from 'react'
import '../Admin/style.css'
import  vendor from '../Appwrite/Add_vendor'
import CustomCombo from './CustomCombo'
import { Link ,Outlet} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { UpdateVendorStatus } from '../store/authSlice'
function FormVendor() {

  const [name,setname]=useState('')
  const [oragnisation,setorganisation]=useState('')
  const [email,setemail]=useState('')
  const [phone,setphone]=useState('')
  const [pan,setpan]=useState('')
  const [experience,setexperience]=useState(0)
  const [service,setservice]=useState('')
  const [hours,sethours]=useState('')
  const [address,setaddress]=useState('')
  const [payment,setpayment]=useState('')
  const [emergency,setemergency]=useState('')
 const [upload,setupload]=useState("")
 const [category,setcateogry]=useState("veg")

const dispath=useDispatch()

 const reset=()=>{
  setname('')
  setorganisation('')
  setphone('')
  setservice('')
  setupload('')
  setaddress('')
  setcateogry('veg')
  setemail('')
  setemergency('')
  setpan('')
  setexperience(0)
  sethours('')
  setpayment('')

 }
  const handlesubmit=async(e)=>{
    e.target.value
try{
   const filed=await vendor.uploadFile(upload)
   const logoid=filed.$id
 try{
  const res=  await vendor.Addvendor({name,pancard:pan,area:address,phone,payment,hours, organisation:oragnisation,email,logoid,emergencynumber:emergency ,category})
   dispath(UpdateVendorStatus(res.$id))
   reset()
   
}
catch(error)
{
  console.log(error,"error")
}
    }
    catch(error)
    {
      console.log(error.message)
    }
  

}
  return (
    
  
    <div className="main-content m-2 w-full ">
      
      <form className='w-full'>
        {/* Vendor Name/ID */}
        <div className="form-group">
          <label htmlFor="vendorId">Vendor Name</label>
          <input
            type="text"
            id="vendorId"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            placeholder="Enter vendor name or ID"
          />
        </div>
        {/* Organization Name */}
        <div className="form-group">
          <label htmlFor="organizationName">Vendor Organization Name</label>
          <input
            type="text"
            value={oragnisation}
            onChange={(e)=>setorganisation(e.target.value)}
            id="organizationName"
            placeholder="Enter vendor organization name"
          />
        </div>
        {/* Contact Information */}
        <div className="form-group">
          <label htmlFor="contactPhone">Phone Number</label>
          <input
            type="tel"
            id="contactPhone"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail">Email Address</label>
          <input
            type="email"
            id="contactEmail"
            placeholder="Enter email address"
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          />
        </div>
        {/* Vendor Logo */}
        <div className="form-group">
          <label htmlFor="vendorLogo">Vendor Logo</label>
          <input type="file" id="image" onChange={(e)=>setupload(e.target.files[0])} accept="image/*" required="" />
        </div>
        {/* PAN Card Proof */}
        <div className="form-group">
          <label htmlFor="panCard">PAN Card Number</label>
          <input
            type="text"
            id="panCard"
           placeholder='Enter Pan card number'
           value={pan}
           onChange={(e)=>setpan(e.target.value)}
            required=""
          />
        </div>
        <div className="grid">
          <label htmlFor="category">Category</label>
         <select name="category" id="category"
          value={category} onChange={(e)=>setcateogry(e.target.value)}
          className=' pl-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-sm focus:ring-gray-500 focus:border-gray-500 block w-full  '>
          <option value="veg">veg</option>
          <option value="non veg">non veg</option>
           <option value="both">both</option>
         </select>
        </div>
        {/* Experience */}
        <div className="form-group">
          <label htmlFor="experience">Experience in Catering Industry</label>
          <input
            type="number"
            min={1}
            max={20}
            id="experience"
            value={experience}
            onChange={(e)=>setexperience(e.target.value)}
            placeholder="Enter years of experience"
          />
        </div>
        {/* Service Areas */}
        <div className="form-group">
          <label htmlFor="serviceAreas">Service Areas</label>
          <input
            type="text"
            id="serviceAreas"
            value={service}
            onChange={(e)=>setservice(e.target.value)}
            placeholder="Enter service areas (e.g., cities or regions)"
          />
        </div>
        {/* Physical Address */}
        <div className="form-group">
          <label htmlFor="address">Physical Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e)=>setaddress(e.target.value)}
            placeholder="Enter physical address"
          />
        </div>
        {/* Payment Method Preference */}
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method Preference</label>
          <input
            type="text"
            id="paymentMethod"
            value={payment}
            onChange={(e)=>setpayment(e.target.value)}
            placeholder="Enter preferred payment method (e.g., PayPal, Bank Transfer)"
          />
        </div>
        {/* Emergency Contact */}
        <div className="form-group">
          <label htmlFor="emergencyContactName">Emergency Contact Number</label>
          <input
            type="text"
            id="emergencyContactName"
            value={emergency}
            onChange={(e)=>setemergency(e.target.value)}
            placeholder="Enter emergency contact name"
            required=""
          />
        </div>
        {/* Working Hours */}
        <div className="form-group">
          <label htmlFor="workingHours">Working Hours/Availability</label>
          <input
            type="text"
            id="workingHours"
            value={hours}
            onChange={(e)=>sethours(e.target.value)}
            placeholder="e.g., 9 AM - 6 PM"
            required=""
          />
        </div>
       
        {/* Vendor Description */}
       
        {/* Buttons */}
        <div className="button-group">
          <button type="submit" className="btn btn-primary p-2" onClick={(e)=>{
            e.preventDefault()
            handlesubmit(e)
          }}>
            Save 
          </button>
          <button type="reset"  onClick={reset} className="btn pr-5 btn-secondary ">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormVendor
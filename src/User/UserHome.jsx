import React, { useEffect, useState } from 'react'
import Order_object from '../Appwrite/Otp_Sender'
import {useSelector} from'react-redux'

import { BarChart } from '@mui/x-charts/BarChart';
function UserHome() {
  const date = [
    '2023-11-01',
    '2023-11-02',
    '2023-11-03',
    '2023-11-04',
    '2023-11-05',
    '2023-11-06',
    '2023-11-07'
  ];

  const value = [4500, 5200, 7800, 6200, 8900, 9300, 10200];
    const [data,setdata]=useState([])
    const userData=useSelector((state)=>state.auth.userData)
    useEffect(()=>{
    Order_object.ListOrderForUser({user_id:userData?.$id}).then((res)=>{
      let sum=0;
      let pending_order=0
      let completed_order=0
      res.documents.forEach((ele)=>{
         sum+=ele.amount
         ele.status=="confirmed"?pending_order+=1:completed_order+=1
      })
      const formattedINR = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0 // Remove decimal places
      }).format(sum);
      
      setdata([{
        title:"Total Order",value:res.total,
      },{
        title:"Total Spent",value: formattedINR
      },{
        title:"Pending Order",value:pending_order},
        {title:"Completed Order",value:completed_order
      }])
    })
    },[userData?.$id])
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* Stats Cards Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {data?.map((stat, index) => (
      <div 
        key={index} 
        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-indigo-500"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 truncate">{stat.title}</h3>
          {stat.icon && (
            <div className={`p-2 rounded-full ${stat.iconBgColor || 'bg-indigo-100'}`}>
              <stat.icon className={`w-4 h-4 ${stat.iconColor || 'text-indigo-600'}`} />
            </div>
          )}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-2xl font-semibold text-gray-900">
            
             { stat.value}
          </p>
          {stat.change && (
            <span className={`ml-2 text-sm font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </span>
          )}
        </div>
        {stat.description && (
          <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
        )}
      </div>
    ))}
  </div>

  {/* Main Content Area */}
  <div className="bg-white rounded-lg shadow p-6 h-full">
    {/* Your main content goes here */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-medium text-gray-900">Overview</h2>
      <div className="flex space-x-3">
        
       
      </div>
    </div>
    
    {/* Placeholder for charts or other content */}
    <div className="border-2 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
    
        <BarChart
          xAxis={[{ scaleType: 'band', data: date  ,}]}
          
          series={[{ data: value }]}
          
          width={500}
          height={350}
          margin={0}
          colors={['#6B21A8']}
        />
      
    
    </div>
  </div>
</main>
  )
}

export default UserHome
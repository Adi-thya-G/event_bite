import React, { useEffect, useState } from "react";
import { FaTruck, FaCalendarAlt, FaClock, FaTag, FaChevronDown, FaChevronUp, FaList, FaCheckCircle } from "react-icons/fa";
import service from "../Appwrite/config";
import { useSelector } from "react-redux";
import conf from "../conf/conf.js";

const CompletedOrdersList = () => {
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const data = useSelector((state) => state.auth.personalData);
  const [mockOrders,setmockOrder] = useState([])
   

  useEffect(()=>{
    service.Completed_Order_Data({document_id:data.$id}).then((res)=>{
        if(res)
        {
         setmockOrder(res.documents)
        }
    }).catch((error)=>console.log(error))
  },[data?.newvendor])
  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  useEffect(()=>{
    const chanel = `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteOrderCollectionId}.documents`;
    service.client.subscribe(chanel,(res)=>{
      if(res.payload.user.$id==data.$id&&res.payload.status=="completed"&&res.events[0].includes("update"))
      { const newOrder = res.payload;
        // Prevent adding the same order multiple times
        setmockOrder((prev) => {
          // Check if the order already exists in the state
          const isOrderExist = prev.some((order) => order.$id === newOrder.$id);
          if (isOrderExist) return prev; // Return the previous state if order already exists
          return [newOrder, ...prev]; // Add the new order to the beginning of the array
        });
      }
    })

  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!mockOrders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Completed Orders</h2>
          <p className="text-gray-500">There are no completed orders to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Completed Orders</h1>
        
        <div className="grid gap-6 mb-8">
          {mockOrders.map((order) => (
            <div key={order.$id} 
                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                 onClick={() => toggleExpand(order.$id)}
                 role="button"
                 tabIndex={0}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{order?.newvendor?.Business_name}</h2>
                    <p className="text-gray-600">{order.newvendor?.name}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 flex items-center">
                    <FaCheckCircle className="mr-1" /> Completed
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaTag className="text-gray-400 mr-2" />
                    <span className="text-gray-700">{order?.Number_of_Plates} Plates</span>
                  </div>
                  <div className="flex items-center">
                    <FaTruck className="text-gray-400 mr-2" />
                    <span className="text-gray-700">₹{order.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-400 mr-2" />
                    <span className="text-gray-700">{order.delivery_date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-2" />
                    <span className="text-gray-700">{order.delivery_time}</span>
                  </div>
                </div>

                {expandedOrder === order.$id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                    <p className="text-gray-600">Order ID: {order.$id}</p>
                    
                    <div className="mt-4">
                      <div className="flex items-center mb-2">
                        <FaList className="text-gray-400 mr-2" />
                        <p className="text-gray-600 font-medium">Items Delivered:</p>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                        {order.Item_name.map((item, index) => (
                          <li key={index} className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-gray-600 mt-4">Delivery Timeline:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Order received and confirmed</li>
                      <li>Payment processed successfully</li>
                      <li>Order prepared and quality checked</li>
                      <li>Delivered on time</li>
                      <li>Delivery confirmed by customer</li>
                    </ul>
                  </div>
                )}

                <button 
                  className="mt-4 flex items-center text-gray-500 hover:text-gray-700"
                  aria-label={expandedOrder === order.$id ? "Show less" : "Show more"}
                >
                  {expandedOrder === order.$id ? (
                    <FaChevronUp className="ml-2" />
                  ) : (
                    <FaChevronDown className="ml-2" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedOrdersList;
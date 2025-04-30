import React, { useEffect, useState } from "react";
import { FaTruck, FaCalendarAlt, FaClock, FaTag, FaChevronDown, FaChevronUp, FaList } from "react-icons/fa";
import service from "../Appwrite/config";
import { useSelector } from "react-redux";
import conf from "../conf/conf";
const PendingOrdersList = () => {
  const [loading, setLoading] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const data = useSelector((state) => state.auth.personalData);
  const [mockOrders ,setmockOrder]= useState([])
   

  useEffect(()=>{
    console.log(data)
    service.Pending_Order_Data({document_id:data?.$id}).then((res)=>{
      if(res)
      {
        setmockOrder(res.documents)
        console.log(res.documents)
      }
    }).catch((error)=>console.log(error))
  },[data?.$id])

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(()=>{
    const chanel = `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteOrderCollectionId}.documents`;
    service.client.subscribe(chanel,(res)=>{
      if(res.payload.user.$id==data.$id&&res.payload.status=="completed")
      {const updatedata=res.payload.$id
        setmockOrder(mockOrders.filter((ele)=>ele.$id!=updatedata))
      }
    })

  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!mockOrders.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Pending Orders</h2>
          <p className="text-gray-500">There are currently no pending orders to display.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pending Orders</h1>
        
        <div className="grid gap-6 mb-8">
          {mockOrders.map((order) => (
            <div key={order.id} 
                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                 onClick={() => toggleExpand(order.$id)}
                 role="button"
                 tabIndex={0}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{order?.newvendor?.Business_name}</h2>
                    <p className="text-gray-600">{order?.newvendor?.name}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaTag className="text-gray-400 mr-2" />
                    <span className="text-gray-700">{order.Number_of_Plates} Plates</span>
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
                    <h3 className="text-lg font-semibold mb-2">Additional Details</h3>
                    <p className="text-gray-600">Order ID: {order.$id}</p>
                    
                    <div className="mt-4">
                      <div className="flex items-center mb-2">
                        <FaList className="text-gray-400 mr-2" />
                        <p className="text-gray-600 font-medium">Items Ordered:</p>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                        {order.Item_name.map((item, index) => (
                          <li key={index} className="text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-gray-600 mt-4">Status Updates:</p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      <li>Order received and confirmed</li>
                      <li>Payment processed successfully</li>
                      <li>Awaiting preparation schedule</li>
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

export default PendingOrdersList;
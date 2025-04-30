import React, { useEffect } from "react";
import Feedback_OBJ from "../../Appwrite/Feedback";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function FeedbackTable() {
  const [fetchdata, setfetch] = useState([]);
  const [ShowInfo ,setShowInfo]=useState(false)
  const [ShowOrderData,SetShowOrderData]=useState({})
  const handlefetch = async () => {
    try {
      let res = await Feedback_OBJ.list_feedback();
      if (res) {
        setfetch(res.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handlefetch();
    console.log(fetchdata);
  }, []);

  return (
    <div className="w-full h-screen bg-white shadow-lg shadow-gray-200 p-5">
      {/* Optional header or space */}
      <div className="w-full h-20 ">
        <h2 className="text-xl text-indigo-400 flex justify-center">FeedBack Management</h2>
        
      </div>

      <table className={`w-full  border-2 rounded-lg border-slate-300 ${ShowInfo&&"hidden"}`}>
        <thead className="border-b-2 border-gray-300 ">
          <tr className="">
            <th className="p-3 text-center">User Name</th>
            <th className="p-3 text-center">Message</th>
            <th className="p-3 text-center">Rating</th>
            <th className="p-3 text-center">Order-id</th>
            <th className="p-3 text-center">Vendor -Email</th>
          </tr>
        </thead>
        <tbody>
          {fetchdata?.map((ele) => (
            <tr className="border-b border-slate-300">
              <td className="p-4 text-center">
                <span className="mx-auto">{ele?.ordersTable?.user?.name}</span>
              </td>
              <td className="p-4  text-center"><div className="w-[400px] text-left">
              {ele.message.slice(0,416 )}
                </div></td>
              <td className="p-4 text-center">{ele?.rating} Stars</td>
              <td
  className="p-4 text-center text-sky-600 hover:text-sky-800 underline cursor-pointer transition"
  onClick={() =>{ 
    SetShowOrderData(ele?.ordersTable)
    setShowInfo(true)}}
>
  {ele?.ordersTable?.$id}
</td>

              <td className="p-4 text-center">{ele?.ordersTable?.newvendor?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={` flex justify-center h-[70%] gap-2 p-2 ${!ShowInfo&&"hidden"}`}>
      
       {
        <div className="bg-white shadow-lg shadow-slate-200 grid grid-cols-2 w-[60%]">
        
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Status:</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">{ShowOrderData.status}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Address:</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">{ShowOrderData.address}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Contact Number:</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">{ShowOrderData.contact}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Alternative Phone:</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">{ShowOrderData.Alternative_Phone}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Item Name:</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">   {Array.isArray(ShowOrderData?.Item_name)
    ? ShowOrderData.Item_name.join(", ")
    : "Loading..."}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Number Of Plates:</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">{ShowOrderData.Number_of_Plates}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Delivery Date:</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">{ShowOrderData.delivery_date}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Delivery Time:</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">{ShowOrderData.delivery_time}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">User Email :</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">{ShowOrderData.user?.name}</h2>
        </div>
        <div className="flex p-8">
          <h2 className="text-gray-700  font-semibold">Total Amount :</h2>
          <h2 className="text-[15px]  px-2 text-purple-700">₹{ShowOrderData.amount}</h2>
        </div>
             
       </div>
       }
       <div className="flex justify-end">
        <div className="" onClick={()=>setShowInfo(false)}><AiOutlineCloseCircle size={32} color="#6366F1" className="hover:scale-110 cursor-pointer"/></div>
       </div>
      </div>
    </div>
  );
}

export default FeedbackTable;

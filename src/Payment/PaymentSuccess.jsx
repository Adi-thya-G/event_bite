import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { FaCheckCircle, FaPhoneAlt, FaEnvelope, FaPrint, FaHome } from "react-icons/fa";
import { useSelector ,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {UpdateCache,Update_Order_Table_id, Update_Discount, Payment_Successful} from '../store/authSlice'
const PaymentSuccess = () => {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
   
    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };
   
    const confettiAnimation = () => {
      const timeLeft = animationEnd - Date.now();
      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#4CAF50", "#FFF", "#FFD700"]
      });
    
      if (timeLeft > 0) {
        requestAnimationFrame(confettiAnimation);
      }
    };

    confettiAnimation();
  }, []);
  const orderDetails=useSelector((state)=>state.auth.PaymentSuccessful)
  const cache=useSelector((state)=>state.auth.cache)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const Return_Home=()=>{
    dispatch(UpdateCache(null))
    dispatch(Update_Discount(null))
    dispatch(Update_Order_Table_id(null))
    dispatch( Payment_Successful(null))
    navigate("/")

  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center animate-fade-in">
          <FaCheckCircle className="mx-auto h-20 w-20 text-green-500 animate-bounce" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900 tracking-tight">
            Payment Successful!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for choosing our catering services
          </p>
        </div>

        <div className="mt-10 bg-white rounded-lg shadow-lg p-6 animate-slide-up">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Order Confirmation
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">{orderDetails.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600">Event Date:</span>
              <span className="font-medium">{orderDetails.eventDate}</span>
            </div>
            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-medium text-green-600">₹{orderDetails.amount}</span>
            </div>
            <div className="pt-2">
              <span className="text-gray-600">Order Description:</span>
              <p className="mt-1 font-medium">Catering Service Payment - Event: Wedding Reception,- {cache?.Plates
},Plates</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-green-50 rounded-lg p-6 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <FaEnvelope className="text-green-600 mr-2" />
            <p className="text-gray-700">
              Confirmation email sent to   <a href="mailto:eventbite.official@gmail.com" className="hover:underline">eventbite.official@gmail.com</a>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <FaPhoneAlt className="text-green-600 mr-2" />
            <p className="text-gray-700">
              Need help? Contact us at: <span className="font-medium">1-800-CATERING</span>
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
         
          <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200 transform hover:scale-105"
          onClick={ Return_Home
           
       }>
            <FaHome className="mr-2"  />
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
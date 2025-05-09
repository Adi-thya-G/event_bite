import React from "react";
import { FaPercent, FaDollarSign, FaBuilding, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { BiInfoCircle } from "react-icons/bi";
import { PiChefHatThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Update_Discount } from "../store/authSlice";
const VendorInfoCard = ({
  key,
  id,
  logo = "https://as2.ftcdn.net/v2/jpg/02/72/65/95/1000_F_272659528_4BeXAVkr69LHfeTMEaEaVEFBco5ooFYj.jpg",
  businessName = "Kiran Caterers.",
  perpetualValue = 5000,
  totalAmount = 4500,
  discountPercentage = 15,
  discountValue = 750,
  finalValue = 3750
}) => {
  const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
};
console.log(id)
const dispatch=useDispatch()
const navigate=useNavigate()
const onclickHandle=()=>{
dispatch( Update_Discount({

  newvendor:id,
  totalAmount:totalAmount,
  perpetualValue:perpetualValue,
  finalValue:finalValue,
  discountPercentage:discountPercentage,
  discountValue:discountValue
}))
navigate("/pay-pal")
}

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden 
    hover:border-2 hover:border-blue-600 cursor-pointer hover:shadow-lg transition-shadow duration-300 p-6 m-4"
    onClick={onclickHandle} key={key}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
          <img
            src={logo}
            alt={`${businessName} logo`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1572177191856-3cde618dee1f";
            }}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            {businessName}
            <PiChefHatThin className="ml-2 text-gray-500" />
          </h2>
          <p className="text-sm text-gray-600 mt-1">With 15 years of excellence, we specialize in providing innovative and reliable catering solutions tailored to every occasion</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="text-yellow-400 w-4 h-4" />
            ))}
            <span className="ml-2 text-sm text-gray-600">(4.9/5)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">PerPlates Value</span>
            <div className="flex items-center">
             
              <span className="text-xl font-semibold text-green-600">
                {formatCurrency(perpetualValue)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount</span>
            <div className="flex items-center">
              
              <span className="text-xl font-semibold text-blue-600">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-gray-600">Discount</span>
              <div className="ml-2 group relative">
                <BiInfoCircle className="text-gray-400 cursor-help" />
                <div className="invisible group-hover:visible absolute z-10 w-48 p-2 mt-1 text-sm text-white bg-gray-800 rounded-md -left-20">
                  Applied discount on total amount
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-purple-600">
                {discountPercentage}<FaPercent className="text-sm" />
              </span>
              <span className="text-xl font-semibold text-purple-600">
                ({formatCurrency(discountValue)})
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Final Value</span>
            <div className="flex items-center">
            
              <span className="text-2xl font-bold text-green-700">
                {formatCurrency(finalValue)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorInfoCard;
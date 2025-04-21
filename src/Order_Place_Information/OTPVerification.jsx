import { useState, useRef, useEffect } from "react";
import { BiTime } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";
import OTP_OBJECT from '../Appwrite/Otp_Sender';
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const OTPVerification = ({setis,setis1,otp_table_id,SetOtpDocumentId,item}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [isResendActive, setIsResendActive] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const inputRefs = useRef([]);

  const navigate=useNavigate()
  const data=useSelector((state)=>state.auth.personalData)

  useEffect(() => {
    let interval;
    if (timer > 0 && !isResendActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendActive(true);
    }
    return () => clearInterval(interval);
  }, [timer, isResendActive]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const pastedArray = pastedData.split("");
      setOtp(pastedArray.concat(new Array(6 - pastedArray.length).fill("")));
      inputRefs.current[pastedArray.length - 1]?.focus();
    }
  };

  const resetOTP = () => {
    setOtp(new Array(6).fill(""));
    inputRefs.current[0].focus();
    setVerificationStatus("");
  };

  const handleResendOTP = async() => {
  
   try {
    let res= await OTP_OBJECT.Resend_otp({document_id:otp_table_id.data.$id,resend_counter:parseInt(otp_table_id.data.resend_counter)})
   let res1=JSON.parse(res.responseBody)
   console.log(res1)
   console.log()
   if(res1.success)
  {
    SetOtpDocumentId(res1)
  }
  else{
    console.log(res1,"resend otp error")
    toast.error("OTP resend failed",{
    })
  }
   } catch (error) {
    console.log(error)
   }
  };

  const verifyOTP = async () => {
    if (otp.join("").length !== 6) {
      
        
      return;
    }
    console.log(otp,"this otp",/*JSON.parse(otp_table_id.responseBody).id.$id */)
    setLoading(true);
   let res= await OTP_OBJECT.verify_otp({id:otp_table_id.data.$id ,otp:parseInt(otp.join(''))})
    
      try{
        res=JSON.parse(res.responseBody)
        console.log(res)
        if(res.success)
          {
          setis(false)
          setis1(true)
          navigate("/pay-pal",{
            state:{
              data:item
            }
          })
          }
          
      }

     
     catch(error)
     {
      setVerificationStatus("error")
      console.log(error)
      
     }
     
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Verify Your Account</h1>
        <p className="mt-2 text-gray-600">
          We've sent a verification code to your registered email
        </p>
      </div>
  
      <div className="space-y-4">
        <div className="flex justify-center space-x-2 sm:space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={`w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-lg text-center text-lg sm:text-xl font-semibold
                ${verificationStatus === "error" ? "border-red-500" : "border-gray-300"}
                focus:border-blue-500 focus:outline-none transition-all
                ${loading ? "opacity-50" : ""}`}
              aria-label={`Digit ${index + 1} of OTP`}
            />
          ))}
        </div>
  
        {verificationStatus === "error" && (
          <p className="text-red-500 text-center text-sm flex items-center justify-center">
            <AiOutlineClose className="mr-1" />
            Invalid. Please try again.
          </p>
        )}
  
        {verificationStatus === "success" && (
          <p className="text-green-500 text-center text-sm flex items-center justify-center">
            <AiOutlineCheckCircle className="mr-1" />
            OTP verified successfully!
          </p>
        )}
  
        <div className="flex justify-center space-x-4">
          <button
            onClick={resetOTP}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            disabled={loading}
          >
            Clear
          </button>
          <button
            onClick={verifyOTP}
            disabled={otp.join("").length !== 6 || verificationStatus === "success"}
            className={`px-6 py-2 rounded-lg text-white font-medium
              ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}
              transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
  
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <BiTime className="text-gray-500" />
            <span className="text-gray-500">
              {timer > 0 ? `Resend OTP in ${timer}s` : ""}
            </span>
          </div>
          <button
            onClick={handleResendOTP}
            className={`mt-2 text-sm flex items-center justify-center mx-auto
              ${isResendActive ? "text-blue-600 hover:text-blue-700" : "text-gray-400"}
              transition-colors disabled:cursor-not-allowed`}
          >
            <FiRefreshCw className={`mr-1 ${isResendActive ? "animate-spin" : ""}`} />
            Resend OTP
          </button>
        </div>
      </div>
  
      <div className="text-center">
        <a
          href="#"
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Need help? Contact Support
        </a>
      </div>
    </div>
  </div>
  
  );
};

export default OTPVerification;

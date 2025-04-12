import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
function PayPal() {
  const paypal = useRef(null);
  const location = useLocation();
    const { state } = location;  // state contains url_param and data
    const {  data } = state ||{}
  useEffect(() => {
    if (paypal.current) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Catering Service",
                amount: {
                  currency_code: "USD",
                  value: "100.00",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      }).render(paypal.current);
    }
  }, []); // Empty dependency array ensures this only runs once

  return (
    <>
    <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
  <div className='w-2/4 h-3/4 bg-white p-6 rounded-lg shadow-md space-y-6'>

    {/* Section for displaying data */}
    <div className='flex flex-col items-center space-y-2 p-5' >
     {data.map((element)=>(
       <h4 className='text-lg font-semibold text-gray-800'>{element}</h4>
     ))}
      
    </div>

    {/* PayPal Button Section */}
    <div className='flex justify-center'>
      <div className='w-40' ref={paypal}></div>
    </div>

  </div>
</div>

      
    </>
  );
}

export default PayPal;

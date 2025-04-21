import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function PayPal() {
  const paypal = useRef(null);
  const location = useLocation();
  const { state } = location;
  const { data } = state || {};

  useEffect(() => {
    if (paypal.current) {
      window.paypal
        .Buttons({
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
            console.error(err);
          },
        })
        .render(paypal.current);
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-6">
        {/* Order Summary */}
        <div className="text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Order Summary
          </h2>
          <div className="space-y-2">
            {data?.map((element, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-gray-700 border-b border-gray-200 pb-2"
              >
                {element}
              </p>
            ))}
          </div>
        </div>

        {/* PayPal Button */}
        <div className="flex justify-center pt-4">
          <div className="w-full max-w-xs" ref={paypal}></div>
        </div>
      </div>
    </div>
  );
}

export default PayPal;

import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Order_object from "../Appwrite/Otp_Sender";
import { useSelector,useDispatch } from "react-redux";
import {Payment_Successful} from '../store/authSlice'
function PayPal() {
  const cache = useSelector((state) => state.auth.cache);
  const order_table_id = useSelector((state) => state.auth.Order_table_id);
  //
  const dispatch=useDispatch()
  const Discount = useSelector((state) => state.auth.Vendor_Discount);
  const paypal = useRef(null);
  const navigate = useNavigate();

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
                    value: Discount?.finalValue,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log("Order captured successfully", order);

            if (order.status === "COMPLETED") {
              try {
                let res = await Order_object.Update_Oder_table({
                  id: order_table_id,
                  amount: Discount.finalValue,
                  newvendor: Discount.newvendor,
                });
                if(res)
                { 
                  dispatch(Payment_Successful({
                    orderNumber:order.id,
                    eventDate:res?.
                    delivery_date
                    ,
                    amount:order.purchase_units[0]. amount?.value
                    ,
                  }))
                  console.log("Order table updated", res);
                  navigate("/payment-success");
                }
                
              } catch (err) {
                console.error("Failed to update order table", err);
              }
            }
          },
          onError: (err) => {
            console.error(err);
          },
        })
        .render(paypal.current);
    }
  }, [Discount, order_table_id, navigate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-2xl space-y-8">
        
        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            🛒 Order Summary
          </h2>
          <p className="text-gray-500">Please review your order before proceeding to payment</p>
        </div>

        {/* Items List */}
        <div className="space-y-3 border-b pb-6">
          {cache?.Item_Name?.map((item, index) => (
            <div key={index} className="flex justify-between text-gray-700">
              <span>🍽 {item}</span>
            </div>
          ))}
        </div>

        {/* Price Details */}
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Total Price Per Plate:</span>
            <span className="font-semibold">${Discount?.perpetualValue}</span>
          </div>
          <div className="flex justify-between">
            <span>Number of Plates:</span>
            <span className="font-semibold">{cache?.Plates }</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">${Discount?.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount ({Discount?.discountPercentage}%):</span>
            <span className="font-semibold text-green-600">- ${Discount?.discountValue}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <span>Total Amount to Pay:</span>
            <span className="text-blue-600">${Discount?.finalValue}</span>
          </div>
        </div>

        {/* PayPal Button */}
        <div className="flex justify-center pt-6">
          <div className="w-full max-w-xs" ref={paypal}></div>
        </div>

      </div>
    </div>
  );
}

export default PayPal;

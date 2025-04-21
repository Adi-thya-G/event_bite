import React, { useState } from "react";

const OrderTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(false);
  const [viewType, setViewType] = useState(" ");

  const orders = [
    {
      OrderID: 101,
      UserName: "Adithya",
      Vendor: "FoodExpress",
      Company: "Delish Catering",
      TotalAmount: 9000,
      EventDate: "2024-04-20",
      Status: "VEG",
      details: {
        userId: "U123",
        email: "adithya@example.com",
        address: "123 Main St",
        phone: "9876543210",
        pincode: "560001",
        venue: "City Hall",
        plates: 100,
        type: "Veg",
        rating: 4.5,
      },
      items: [
        { name: "Paneer Tikka", category: "Starter", recipe: "Spicy", type: "Veg" },
        { name: "Gulab Jamun", category: "Dessert", recipe: "Sweet", type: "Veg" },
      ],
      payment: {
        method: "UPI",
        paid: 6000,
        remaining: 3000,
        status: "Partial",
      },
      delivery: {
        address: "123 Main St",
        name: "Adithya",
        phone: "9876543210",
        alt: "9988776655",
        venue: "City Hall",
        event: "Wedding",
        time: "6:00 PM",
      },
    },
    // You can add more orders here
  ];

  const handleViewDetails = (orderId, type) => {
    const order = orders.find((o) => o.OrderID === orderId);
    setSelectedOrder(order);
    setViewType(type);
  };

  const renderDetails = () => {
   

    switch (viewType) {
      case "orderDetails":
        const d = selectedOrder.details;
        return (
          <table className="detail-table my-4 border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>Order ID</th><th>Total</th><th>Status</th><th>User ID</th><th>Email</th>
                <th>Address</th><th>Phone</th><th>Pincode</th><th>Venue</th><th>Plates</th><th>Type</th><th>Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedOrder.OrderID}</td><td>{selectedOrder.TotalAmount}</td><td>{selectedOrder.Status}</td>
                <td>{d.userId}</td><td>{d.email}</td><td>{d.address}</td><td>{d.phone}</td><td>{d.pincode}</td>
                <td>{d.venue}</td><td>{d.plates}</td><td>{d.type}</td><td>{d.rating}</td>
              </tr>
            </tbody>
          </table>
        );

      case "itemDetails":
        return (
          <table className="detail-table my-4 border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100"><th>Name</th><th>Category</th><th>Recipe</th><th>Type</th></tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td><td>{item.category}</td><td>{item.recipe}</td><td>{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "paymentDetails":
        const p = selectedOrder.payment;
        return (
          <table className="detail-table my-4 border border-gray-300 w-full">
            <thead className="bg-gray-100">
              <tr><th>Method</th><th>Paid</th><th>Remaining</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>{p.method}</td><td>{p.paid}</td><td>{p.remaining}</td><td>{p.status}</td></tr>
            </tbody>
          </table>
        );

      case "deliveryDetails":
        const del = selectedOrder.delivery;
        return (
          <table className="detail-table my-4 border border-gray-300 w-full">
            <thead className="bg-gray-100">
              <tr><th>Address</th><th>Name</th><th>Phone</th><th>Alt</th><th>Venue</th><th>Event</th><th>Time</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>{del.address}</td><td>{del.name}</td><td>{del.phone}</td><td>{del.alt}</td>
                <td>{del.venue}</td><td>{del.event}</td><td>{del.time}</td>
              </tr>
            </tbody>
          </table>
        );

      case " ":
        return (
         < div className="container p-4">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Order ID</th>
            <th>User Name</th>
            <th>Vendor Company</th>
            <th>Total Amount</th>
            <th>Event Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.OrderID} className="text-center">
              <td>{order.OrderID}</td>
              <td>{order.UserName}</td>
              <td>{order.Vendor}</td>
              <td>{order.TotalAmount}</td>
              <td>{order.EventDate}</td>
              <td>{order.Status}</td>
              <td className="space-x-1">
                <button className="px-2.5 py-1.5 bg-sky-600 text-white rounded hover:bg-sky-700 mx-1" onClick={() => handleViewDetails(order.OrderID, 'orderDetails')}>Order</button>
                <button className="px-2.5 py-1.5 bg-sky-600 text-white rounded hover:bg-sky-700 mx-1" onClick={() => handleViewDetails(order.OrderID, 'itemDetails')}>Items</button>
                <button className="px-2.5 py-1.5 bg-sky-600 text-white rounded hover:bg-sky-700 mx-1" onClick={() => handleViewDetails(order.OrderID, 'paymentDetails')}>Payment</button>
                <button className="px-2.5 py-1.5 bg-sky-600 text-white rounded hover:bg-sky-700 mx-1" onClick={() => handleViewDetails(order.OrderID, 'deliveryDetails')}>Delivery</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render dynamic details below */}
      <div className="details-section mt-6">
        {renderDetails()}
      </div>
    </div>
        )
    }
  };

  return (
    <></>
  );
};

export default OrderTable;

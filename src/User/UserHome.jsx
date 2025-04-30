import React from 'react'

function UserHome() {
    const quickStats = [
        { title: "Orders Placed", value: "5", change: "2 Active" },
        { title: "Total Spent", value: "$840", change: "This Month" },
        { title: "Upcoming Events", value: "2", change: "Next Week" },
        { title: "Saved Items", value: "12", change: "Menus" }
      ];
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {quickStats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <span className="text-sm font-medium text-green-600">{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
    </main>
  )
}

export default UserHome
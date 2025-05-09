import React, { useEffect, useState } from "react";
import { Carousel } from 'antd';
import "swiper/css"; // Make sure swiper is installed if using it as well
import Feedback_OBJ from "../Appwrite/Feedback";
import "aos/dist/aos.css"; // Make sure AOS is included for animations if needed

const contentStyle = {
  height: 'auto', // Ensure that height auto adapts to content size
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
};

function Trend({ data }) {
  console.log(data)
  return (
    <div className="pt-20 max-sm:pt-10">
      <div className="lg:flex lg:justify-center">
        <span className="pl-3 flex mt-5 lg:">
          Testimonial
          <div className="w-2 h-2 mt-2 bg-yellow-400 border-2 rounded-full"></div>
        </span>
      </div>
      <h2 className="text-[40px] lg:text-center mb-20 max-lg:mb-10">
        What People Say About Us?
      </h2>

      {/* Add a responsive flex layout */}
      <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
        {/* Iterate over data */}
        {data?.map((ele) => (
          <div key={ele.$id} className="w-full sm:w-80 md:w-[300px] lg:w-[320px]">
            {/* Carousel for responsiveness */}
            <Carousel effect="fade" className="w-full">
              <div style={contentStyle} className="p-4">
                {/* Card Layout */}
                <div className="w-full py-3 border-2 rounded-lg shadow-sm bg-white shadow-gray-200">
                  {/* Image */}
                  <div className="flex justify-center mx-auto mt-3">
                    <img
                      className="object-cover h-24 w-24 rounded-full"
                      src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg"
                      alt=""
                    />
                  </div>
                  <div className="p-4">
                    {/* User Name */}
                    <h2 className="text-center text-2xl">{ele?.
ordersTable?.user?.name||"Priya & Anil Sharma"}</h2>
                    {/* Testimonial Message */}
                    <p className="text-justify font-2xl p-3">{ele?.message}</p>
                  </div>
                </div>
              </div>
            </Carousel>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trend;

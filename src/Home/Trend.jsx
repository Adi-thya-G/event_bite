import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import AOS from "aos";
import 'swiper/css';
function Trend() {
  const [fetch_data,setdata]=useState("")

  const data_function=async()=>{

    
  }
  useEffect(()=>{
    
  })

  return (
    <div className='pt-20 max-sm:pt-10 '>
   <div className='lg:flex lg:justify-center'> <span className='pl-3 flex mt-5 lg:'>Testimonial 
   <div className='w-2 h-2 mt-2 bg-yellow-400 border-2 rounded-full'></div></span></div>
    <h2 className='text-[40px] lg:text-center mb-20 max-lg:mb-10'>What People's Say
    About us?</h2>
    <div className='flex gap-2'>
    <div className=' m-3 p-4 px- h-max  mb-20  '>
      {/* this is card  */}
    <div className='w-[300px] py-3 border-2 rounded-lg shadow-sm  bg-white shadow-gray-200' data-aos="fade-up">
     <div className=' flex justify-center mx-auto mt-3' >
  <img className='object-cover h-24 w-24 rounded-full'src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg" alt="" />
 </div>
        <div className='p-4 '>
            <h2 className='text-center text-3xl'>lorem is good</h2>
            <p className='text-justify font-2xl p-3'>Working with [Catering Company Name]
                 was a fantastic experience! The food was exquisite, beautifully presented,
                  and tailored to our needs. Our guests couldn't stop complimenting the flavors. 
                  The staff was professional and attentive, making our event unforgettable. 
                  Highly recommend for anyone looking to elevate their occasion!.
                  
                  </p>
                  
       
        </div>
    </div>

    </div>
    

    <div className=' m-3 p-4 px-5 h-max  mb-20 '  >
      {/* this is card  */}
    <div className='w-[300px] py-3 border-2 rounded-lg shadow-sm  bg-white shadow-gray-200 ' data-aos="fade-up">
     <div className=' flex justify-center mx-auto mt-3'
 >
  <img className='object-cover h-24 w-24 rounded-full'src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg" alt="" />
 </div>
        <div className='p-4 '>
            <h2 className='text-center text-3xl'>lorem is good</h2>
            <p className='text-justify font-2xl p-3'>Working with [Catering Company Name]
                 was a fantastic experience! The food was exquisite, beautifully presented,
                  and tailored to our needs. Our guests couldn't stop complimenting the flavors. 
                  The staff was professional and attentive, making our event unforgettable. 
                  Highly recommend for anyone looking to elevate their occasion!.
                  
                  </p>
                  
       
        </div>
    </div>

    </div>

    <div className=' m-3 p-4 px-5 h-max  mb-20  '>
      {/* this is card  */}
    <div className='w-[300px] py-3 border-2 rounded-lg shadow-sm  bg-white shadow-gray-200' data-aos="fade-up">
     <div className=' flex justify-center mx-auto mt-3'
 >
  <img className='object-cover h-24 w-24 rounded-full'src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg" alt="" />
 </div>
        <div className='p-4 '>
            <h2 className='text-center text-3xl'>lorem is good</h2>
            <p className='text-justify font-2xl p-3'>Working with [Catering Company Name]
                 was a fantastic experience! The food was exquisite, beautifully presented,
                  and tailored to our needs. Our guests couldn't stop complimenting the flavors. 
                  The staff was professional and attentive, making our event unforgettable. 
                  Highly recommend for anyone looking to elevate their occasion!.
                  
                  </p>
                  
       
        </div>
    </div>

    </div>

    <div className=' m-3 p-4 px-5 h-max  mb-20  '>
      {/* this is card  */}
    <div className='w-[300px] py-3 border-2 rounded-lg shadow-sm  bg-white shadow-gray-200' data-aos="fade-up">
     <div className=' flex justify-center mx-auto mt-3'
 >
  <img className='object-cover h-24 w-24 rounded-full'src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg" alt="" />
 </div>
        <div className='p-4 '>
            <h2 className='text-center text-3xl'>lorem is good</h2>
            <p className='text-justify font-2xl p-3'>Working with [Catering Company Name]
                 was a fantastic experience! The food was exquisite, beautifully presented,
                  and tailored to our needs. Our guests couldn't stop complimenting the flavors. 
                  The staff was professional and attentive, making our event unforgettable. 
                  Highly recommend for anyone looking to elevate their occasion!.
                  
                  </p>
                  
       
        </div>
    </div>

    </div>
    </div>
    </div>
  )
}

export default Trend
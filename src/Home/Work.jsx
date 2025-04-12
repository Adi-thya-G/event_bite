import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
function Work() {
  useEffect(()=>{
    AOS.init({
        duration: 1000, // Animation duration (1 second)
        easing: "ease-in-out", // Easing function for the animation
        offset: 200, // Trigger animation when the element is 200px into the viewport
        once: true,
    })
  })
  return (

    <div className='max-md:mt-5 mt-16'  data-aos="fade-up">
      <h2 className='text-xl flex justify-center font-semibold font-serif md:mb-4'>What We Do <div className='w-2 h-2 mt-3 ml-1 bg-yellow-400 border-2 rounded-full'></div></h2>
       <h1 className='text-6xl font-serif flex justify-center max-md:text-3xl max-md:pl-10 md:mb-5'>Premium catering services</h1>
      <div className='  flex  rounded-2xl  m-4 max-md:flex-col review_col p-1 ml-10 mr-10 max-md:[320px]'>
        <div className='w-3/5 max-md:w-full md:p-10'>
          <img className='w-[100%] h-84 object-cover rounded-2xl ' src="https://venuscateringservice.com/myimages/wedding.jpg" alt="" />
        </div>
        <div className='w-2/5 max-md:w-full max-md:ml-0 md:p-4 md:mt-4 md:mr-4 '>
          <h1 className='text-3xl p-2 flex justify-center font-serif'><span className='underline decoration-orange-300 mr-2'>Wedding</span> Event</h1>
          <p className='text-justify pl-4 md:mt-8 text-xl  max-md:text-sm max-md:p-1'><span className='text-3xl  font-serif -mr-1 max-md:-mr-1.2 max-md:text-xl'>W</span>edding. Why we have the concept of inviting all our relatives,
              friends and known ones?
              <br /> Its because, when a family celebrates an
             event means, its an occasion, when lot of people celebrates an event means, it turns as a feast.</p>
          <p className='mt-4 text-xl pl-4 text-justify max-md:text-sm max-md:px-1 pb-2'>If there any feast occurs without food?? 
                We are here to make a memorable experience for your guests by pampering their taste buds.</p>
        </div>
      </div>
      {/* second card*/}
      <div className='  flex  rounded-2xl mt-9  m-4 max-md:flex-col review_col p-1 ml-10 mr-10 mt-5' data-aos="fade-up">
      <div className='w-1/2 max-md:w-full  md:hidden'>
          <img className='w-[100%] h-88 object-cover rounded-2xl ' src="https://venuscateringservice.com/myimages/corporate.jpg" alt="" />
        </div>
        <div className='w-2/5 max-md:w-full max-md:ml-0 md:p-4 md:mt-4 md:mr-4 '>
          <h1 className='text-3xl p-2 flex justify-center font-serif'><span className='underline decoration-orange-300 mr-2'>Corporate</span> Event</h1>
          <p className='text-justify pl-4 md:mt-8 text-xl  max-md:text-sm max-md:p-1'>From corporate events to business occasions or milestone celebrations
          <br />
             our event catering team captures the heart of their audiences on their special occasions.
              </p>
          <p className='mt-4 text-xl pl-4 text-justify max-md:text-sm max-md:px-1 pb-2'>If there any feast occurs without food?? 
          We are here to make a memorable experience for your guests by pampering their taste buds.</p>
        </div>

        <div className='w-3/5 max-md:w-full max-md:hidden p-10'>
          <img className='w-[100%] h-88 object-cover rounded-2xl ' src="https://venuscateringservice.com/myimages/corporate.jpg" alt="" />
        </div>
      </div>

      <div className='  flex  rounded-2xl mt-9 m-4 max-md:flex-col review_col p-1 ml-10 mr-10 ' data-aos="fade-up">
        <div className='w-3/5 max-md:w-full md:p-10'>
          <img className='w-[100%] h-88 object-cover rounded-2xl ' src="https://venuscateringservice.com/myimages/birthday.jpg" alt="" />
        </div>
       
        <div className='w-2/5 max-md:w-full max-md:ml-0 md:p-4 md:mt-4 md:mr-4 '>
          <h1 className='text-3xl p-2 flex justify-center font-serif'><span className='underline decoration-orange-300 mr-2'>Birthday </span> Party</h1>
          <p className='text-justify pl-4 md:mt-8 text-xl  max-md:text-sm max-md:p-1'>Make every birthday a memorable one with our birthday photography.
            <br />
             Whether it’s a child's first birthday or a milestone celebration, we capture the joy, excitement, and love of the day and preserve it forever.
             At Venus Catering Service, we take care of the happiness of your guests by offering them amazing food on behalf of you.
              </p>
          <p className='mt-4 text-xl pl-4 text-justify max-md:text-sm max-md:px-1 pb-2'> At Venus Catering Service, we take care of the happiness of your guests by offering them amazing food on behalf of you.</p>
        </div>



       
       
  
      </div>
      
    </div>
    
  )
}

export default Work
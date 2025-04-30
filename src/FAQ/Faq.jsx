import React, { useEffect, useState } from 'react';
import { Flex, Spin } from 'antd';
import faq_data from '../Appwrite/faq_data.js';

function Faq() {
  // handling FAQ from server
  const [data, setData] = useState(null);

  // Fetch FAQ DATA FROM SERVER the data only once fetched
  useEffect(() => {
    data_fetch();
  }, []);

  // Data handle function
  const data_fetch = async () => {
    try {
      let res = await faq_data.GetFaq();
      //set response document
      setData(res.documents)
    } catch (error) {
      console.log("Error in data", error);
      setData([]); // Set an empty array in case of error
    }
  };

  // Style for FAQ slide down functionality
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Render loading state or no data message
  if (data === null) {
    return <div className='h-screen w-full grid place-items-center'>
     <Flex align="center" gap="middle" >
  
    <Spin size="large" />
    <p className='font-serif text-2xl'>Loading FAQs...</p>
  </Flex>
      
      </div>;
  }

  if (data.length === 0) {
    return <div className='min-h-[600px] grid justify-center items-center'><p className='text-3xl  font-serif'>Looks like you're not connected to the internet</p></div>
  }

  return (
    <div className='min-h-[700px] max-h-[1000px]'>
      <main className="p-5 bg-light-blue">
        <div className="flex justify-center items-start my-2">
          <div className="w-full sm:w-10/12 md:w-1/2 my-1">
            <h2 className="text-xl font-semibold text-vnet-blue mb-2">
              FAQ - Order, Shipping, Etc.
            </h2>
            <ul className="flex flex-col">
              {data.map((item, index) => (
                <li key={index} className="bg-white my-2 shadow-lg p-5">
                  <h2
                    onClick={() => handleToggle(index)}
                    className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer text-xl"
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`fill-current text-purple-700 h-6 w-6 transform transition-transform duration-500 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10" />
                    </svg>
                  </h2>
                  {activeIndex === index && (
                    <div className="border-l-2 border-purple-600 overflow-hidden duration-500 transition-all">
                      <p className="p-3 text-gray-900">{item.answer}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Faq;

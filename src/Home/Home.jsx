import React, { useEffect, useState } from 'react'
import Trend from './Trend'
import Footer from '../Footer/Footer'
import Popular from './Popular'
import Counter from './Counter'
import Work from './Work'
import Feedback_OBJ from "../Appwrite/Feedback";

function Home() {
  const [fetch, setfetch] = useState([]);
  useEffect(() => {
    Feedback_OBJ.list_feedback()
      .then((res) => setfetch(res.documents))
      .catch((error) => console.log(error))
    console.log(fetch)
  }, [])

  const numbercount = [
    {
      'title': 'Menu option',
      'url': 'https://venuscateringservice.com/images/info-bar-1.jpg',
      'follow': 200,
      "id": "first"
    },
    {}, {}, {
      'title': 'Happy foodies',
      'url': 'https://venuscateringservice.com/images/info-bar-3.jpg',
      'follow': '',
      "id": "four"
    }
  ]

  return (
    <>
      <div
        className='start_page img_counter relative bg-no-repeat bg-cover overflow-hidden max-sm:bg-cover max-sm:h-[90vh] max-sm:w-[335px]'
        style={{
          backgroundImage: 'url(https://as1.ftcdn.net/v2/jpg/02/28/28/16/1000_F_228281605_zX4rGhhAX6fNkBgx7dp1IXu8XMnhCl01.jpg)'
        }}
      >
        <h1 className='text-white font-serif block text-center motion-preset-shrink text-[15vh] max-sm:text-[10vh] pt-14'>
          Namaste
        </h1>

        <div className='w-full h-[60vh] max-sm:h-[20vh] mt-10 pt-10 grid grid-rows-1 grid-flow-col gap-10 items-center'>
          
        </div>
      </div>

      <section id='' className='pt-10 pb-10'>
        <Popular />
        <Work />
      </section>

      <section className='ml-5'>
        <div className='w-full h-max pt-20 pl-0'>
          <div className='w-full h-max pl-2'>
            <div className='w-full h-max flex justify-center'>
              <span className='font-serif text-xl'>
                Why Choose Us
              </span>
            </div>
            <div className='w-full h-max flex justify-center'>
              <h2 className='text-4xl font-serif p-1 max-sm:text-[29px] text-center'>
                Leave Your Guests Speechless With Our Fabulous Food!
              </h2>
            </div>
          </div>

          <div className='w-full h-max mt-10 p-2 pl-0 grid grid-rows-1 grid-flow-col max-sm:grid-rows-4 max-sm:gap-y-2'>
            <div className='w-[45vh] h-[300px] rounded-lg flex bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 justify-center'>
              <div className='w-[93%] h-[93%] bg-white m-auto'>
                <div className='w-[70px] h-[80px] bg-no-repeat bg-cover overflow-hidden mx-auto my-10'
                  style={{ backgroundImage: `url(https://venuscateringservice.com/myimages/n1.png)` }}></div>
                <div className='flex justify-center -mt-3'>
                  <h3 className='font-serif text-2xl font-medium'>Authentic Taste</h3>
                </div>
                <p className='pl-3 mt-2 text-center text-xl'>
                  Enjoy our traditional recipes, inspired by rich culinary heritage.
                </p>
              </div>
            </div>
            <div className='w-[45vh] h-[300px] rounded-lg flex bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 justify-center'>
              <div className='w-[93%] h-[93%] bg-white m-auto'>
                <div className='w-[80px] h-[80px] bg-no-repeat bg-cover overflow-hidden mx-auto my-10'
                  style={{ backgroundImage: `url(https://venuscateringservice.com/myimages/n2.png)` }}></div>
                <div className='flex justify-center -mt-3'>
                  <h3 className='font-serif text-2xl font-medium'>Service Excellence</h3>
                </div>
                <p className='pl-3 mt-2 text-center text-xl'>
                
                Outstanding service and unforgettable experiences.
                </p>
              </div>
            </div>
            <div className='w-[45vh] h-[300px] rounded-lg flex bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 justify-center'>
              <div className='w-[93%] h-[93%] bg-white m-auto'>
                <div className='w-[80px] h-[80px] bg-no-repeat bg-cover overflow-hidden mx-auto my-10'
                  style={{ backgroundImage: `url(https://venuscateringservice.com/myimages/n3.png)` }}></div>
                <div className='flex justify-center -mt-3'>
                  <h3 className='font-serif text-2xl font-medium'>Best Quality</h3>
                </div>
                <p className='pl-3 mt-2 text-center text-xl'>
                Top quality standards, excellence in every bite.
                </p>
              </div>
            </div>
            <div className='w-[45vh] h-[300px] rounded-lg flex bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 justify-center'>
              <div className='w-[93%] h-[93%] bg-white m-auto'>
                <div className='w-[70px] h-[80px] bg-no-repeat bg-cover overflow-hidden mx-auto my-10'
                  style={{ backgroundImage: `url(https://venuscateringservice.com/myimages/n4.png)` }}></div>
                <div className='flex justify-center -mt-3'>
                  <h3 className='font-serif text-2xl font-medium'>Heritage</h3>
                </div>
                <p className='pl-3 mt-2 text-center text-xl'>
                Event-bite caterings blends food and heart, rooted in family traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='pl-2 mb-10 mt-10'>
        <Trend data={fetch} />
        <div className='w-full py-10 mt-10'>
        <Counter />
        </div>
      </section>
    </>
  )
}

export default Home;

import React, { useEffect, useState } from 'react';
import Wish from './Wish';
import { FaRegHeart } from 'react-icons/fa';
import Search from './Search';
import Rating from './Rating';
import Card from './Card';
import menu from '../Appwrite/menu';
import Loading from '../Loading/Loading';
import Skeleton from './Skeleton';
import { FaFilter } from 'react-icons/fa'
import Filter from './Filter';
import { BsSliders } from "react-icons/bs";
import FoodComboCard from './FoodComboCard';
function Custom() {
  const [documents, setDocuments] = useState([]); 
  const [loading, setLoading] = useState(true); // Proper loading state
  const [error, setError] = useState(null); // To handle errors
  const [filter,setfilter]=useState([])
  const [show,setshow]=useState(false)
  const [option,setoption]=useState("")
  const [valuerange,setrange]=useState("")
  const [valueprice,setprice]=useState("")
  const [filterbutton,setbuttonfilter]=useState(true)
  const [showCustomCombo, setShowCustomCombo] = useState(true);
 const skeletonCards = Array.from({ length: 12 }).map((_, index) => (
  <Skeleton key:index />))

  // to reduce request we used it  
  //********************************************************************************************************


  useEffect(() => {
    // Fetch menu items
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await menu.getmenu();
        setDocuments(response.documents); // Update documents
        setfilter(response.documents)  
      } catch (err) {
        setError('Failed to load menu items');
      } finally {
        setLoading(false); 
        // Set loading to false after fetching
      }
    };

    fetchMenu();
    console.log(documents) // Call the async function to fetch menu data
  }, []);  
  // ********************************************************************************************************************

  
  //        // Empty dependency array to run this effect only once on mount

  // Show loading state if data is still being fetched

  // Show error if fetching fails
// when the serach input filter input should be clear

 
  return (
    <div className="min-h-[600px]">
    {/* Top Bar */}
    <div className="flex flex-wrap md:flex-nowrap h-auto md:h-28 items-center justify-between px-4 gap-4">
      {/* Filter Button & Panel */}
      <div className="py-3 md:py-5 md:px-5 z-30">
        <button
          className="z-0 flex items-center px-6 py-2 md:px-7 md:py-3 rounded-lg text-base md:text-xl bg-blue-400 text-white"
          onClick={() => setshow((pre) => !pre)}
        >
          Filter
          <div className="p-1">
            <BsSliders />
          </div>
        </button>
        <div className="mt-2">
          {show ? (
            <Filter
              setshow={setshow}
              document={documents}
              setdocument={setfilter}
              documentfilter={filter}
              option={option}
              setoption={setoption}
              valuerange={valuerange}
              setrange={setrange}
              valueprice={valueprice}
              setprice={setprice}
              filterbutton={filterbutton}
              setbuttonfilter={setbuttonfilter}
            />
          ) : (
            ""
          )}
        </div>
      </div>
  
      {/* Combo Toggle Button */}
      <div className="flex justify-center md:justify-end md:mr-10 my-auto">
        <button
          className="px-4 md:px-5 py-2 md:py-3 cursor-pointer bg-orange-400 rounded-md font-serif text-white text-base md:text-[18px] focus:ring-4 focus:ring-orange-200 focus:outline-none"
          onClick={(e) => setShowCustomCombo((pre) => !pre)}
        >
          {showCustomCombo ? "Predefined Combo" : "Custom Combo"}
        </button>
      </div>
  
      {/* Search Component */}
      <div className="ml-auto w-full md:w-auto mt-2 md:mt-0">
        <Search filter={filter} setfilter={setfilter} document={documents} />
      </div>
    </div>
  
    {/* Cards Section */}
    {showCustomCombo ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {loading ? (
          skeletonCards
        ) : filter.length === 0 ? (
          <div className="min-h-[300px] col-span-full flex justify-center items-center text-center">
            <p className="text-2xl sm:text-3xl">
              Looks like you're not connected to the internet
            </p>
          </div>
        ) : (
          filter.map((ele) => (
            <div key={ele.$id} className="z-0">
              <Card
                src={menu.getFilePreiview(ele.imgid)}
                name={ele.name}
                description={ele.description}
                rating={ele.rating}
                id={ele.$id}
              />
            </div>
          ))
        )}
      </div>
    ) : (
      <div className="grid gap-4 p-4 sm:grid-cols-1 md:grid-cols-2">
        <FoodComboCard />
        <FoodComboCard />
      </div>
    )}
  </div>
  
  );
}

export default Custom;

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
    <div className='min-h-[600px]'>
     
     <div className='flex h-28' >
     <div className='py-5 px-5 z-30'>
     <button
     className='z-0 flex px-7 py-3 rounded-lg text-xl bg-blue-400 text-white' onClick={()=>setshow((pre)=>!pre)}>Filter
     <div className='p-1'>
     <BsSliders />
     </div>
     </button>
     <div className=''>
       {  show? <Filter setshow={setshow} document={documents} setdocument={setfilter} documentfilter={filter}
       
       option={option}setoption={setoption} valuerange={valuerange} setrange={setrange }valueprice={valueprice}setprice={setprice}
       filterbutton={filterbutton} setbuttonfilter={setbuttonfilter} />:""}
       
     </div>
        
     </div>
      <div className='mx-auto mr-10 my-auto py-3 px-5 mt-2 '>
      <button className='mx-auto px-5 py-3 cursor-pointer bg-orange-400  my-auto rounded-md font-serif text-white text-[18px] focus:ring-4 focus:ring-orange-200 focus:outline-none ' onClick={(e)=>setShowCustomCombo((pre)=>!pre)} >{showCustomCombo?"Predefined Combo":"Custom Combo"}</button>
      </div>
    <div className='ml-auto'>
    <Search filter={filter} setfilter={setfilter} document={documents}  />
    </div>

     </div>
     {showCustomCombo?( <div className='h-max grid grid-row-2 grid-cols-3 ml-1 gap-2 z-0 '>
        { loading?
       skeletonCards:
        filter.length === 0 ? (
          <div className= ' min-h-[500px] min-w-[1400px] grid justify-center items-center'><p className='text-3xl'>Looks like you're not connected to the internet

          </p></div>
        ) :filter.map((ele) => (
            <div key={ele.$id} className='z-0'>
              <Card
                src={menu.getFilePreiview(ele.imgid)} // Assuming getFilePreview is a valid method to get image preview
                name={ele.name}
                description={ele.description}
                rating={ele.rating}
                id={ele.$id}
              />
            </div>
          ))
}
          
      </div>):(
        <div className='grid lg:grid-flow-row'><FoodComboCard/> <FoodComboCard/></div>
        )}
      
      </div>
  );
}

export default Custom;

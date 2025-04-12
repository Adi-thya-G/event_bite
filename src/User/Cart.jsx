import React, { useEffect, useRef, useState } from 'react';
import Card from '../Order/Card';
import menu from '../Appwrite/menu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import service from '../Appwrite/config';
import Loading from '../Loading/Loading';
import Cardcart from './Cardcart';
import { useNavigate } from 'react-router-dom';
import { FaSmile, FaLaughBeam, FaGrinBeam } from 'react-icons/fa'
import { toast } from 'react-toastify';
function Cart() {
  const cartlist = useSelector((state) => state.auth.cartData);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
 const navigate=useNavigate()
  useEffect(() => {
    if (cartlist.length === 0) {
      setLoading(false);
      return;
    }

  

    setLoading(true);
    menu.getWishlists(cartlist)
      .then((res) => {
        setDocuments(res.documents);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
        setError('Failed to load wishlist');
        setLoading(false);
        console.log(cartlist,"ppio")
      });
  }, [cartlist]);  // Effect depends on `wishlist` changing


  const order_submit=()=>{
    if (cartlist.length==0)
         toast.error("No cart item to order"
        ,{
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
        })
    else {
      const url_param = documents.slice(0, 4)
        .map((ele) => `${ele.$id}${ele.name}`)
        .join('&');
      
      navigate(`/order-information/${url_param}`, {
        state: {
          url_param:url_param,
          data: documents
        }
      });
    }
    
  
}
 
  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div className="flex justify-center text-3xl text-red-500">{error}</div>;
  }
 

  return (
    <div className="gap-2 py-4 bg-white shadow-lg rounded-lg p-6 m-5 w-[1200px] h-[700px] overflow-auto">
      <div className='ml-auto flex justify-end'><button className='ml-auto px-5 py-2  rounded-md border-2 border-gray-200  text-white bg-sky-500 text-xl active:opacity-90 active:text-opacity-85' 
      onClick={order_submit}
      >order</button></div>
    <div className='grid grid-flow-row grid-cols-2 gap-y-4 overflow-hidden overflow-y-scroll'>

      {cartlist[0]==undefined?( <div className="grid  items-center justify-between  text-3xl font-serif ">No cart item</div>): (
       
        documents?.map((ele) => (
                            
          <div className="m-2" key={ele.$id}>
                       
          <Card 
                src={menu.getFilePreiview(ele.imgid)} // Assuming getFilePreview is a valid method to get image preview
                name={ele.name}
                description={ele.description}
                rating={ele.rating}
                id={ele.$id}
           />
          </div>
        )))
       
       
      }
     </div>
     
    </div>
  );
}

export default Cart
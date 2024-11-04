import React, { useEffect } from 'react'
import { useState } from 'react';
import service from '../Appwrite/config'
import { useSelector ,useDispatch} from 'react-redux';
import { RxHeart, RxHeartFilled, RxArrowTopRight } from "react-icons/rx";

function Wish({id}) {
  const [wishstatus, setWishlist] = useState(false);

  return (
 <>
  {wishstatus ?   (
                <RxHeartFilled style={{fontSize:'24px'}}
                  className="text-red-700"
                onClick={() => {setWishlist((pre)=>!pre)
                 
                 
                }
                  }
                />
              ):(
                <RxHeart onClick={async() => {
                  setWishlist((pre)=>!pre)
                 

                }} style={{fontSize:'24px'}} />
              )}</>

   
  )
}

export default Wish
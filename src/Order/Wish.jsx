import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxHeart, RxHeartFilled } from 'react-icons/rx';
import { addwish, removewish } from '../store/authSlice';

function Wish({ ide }) {
  const dispatch = useDispatch();
  const wishdata = useSelector((state) => state.auth.wishData);

  // Directly derive wish status from Redux state
  const wishstatus = wishdata.includes(ide);


  const handleWishlistToggle = () => {
    if (wishstatus) {
      // If the item is already in wishlist, remove it
      dispatch(removewish(ide));
    } else {
      // If not in wishlist, add it
      dispatch(addwish(ide));
    }
  };

  return (
    <>
      {wishstatus ? (
        <RxHeartFilled
          style={{ fontSize: '24px' }}
          className="text-red-700 cursor-pointer"
          onClick={handleWishlistToggle}
        />
      ) : (
        <RxHeart 
        className='cursor-pointer'
          style={{ fontSize: '24px' }}
          onClick={handleWishlistToggle}
        />
      )}
    </>
  );
}

export default Wish;
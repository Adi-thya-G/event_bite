import React, { useEffect, useState } from 'react'
import Wish from './Wish';
import { FaRegHeart } from 'react-icons/fa';
import Search from './Search';
import Rating from './Rating';
import Card from './Card';
import custom from '../Appwrite/custom'
function Custom() {
  

   
  return (
     <>
     <Search/>
      <div
      className='w-[1240px] h-max grid grid-row-2  grid-col-2 ml-1 '
      >
<Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" 
name="south indian" rating={4}/>
<Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" name="north india" rating={5}/>
<Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"/>
<Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" 
name="south indian" rating={4.5}/>
<Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" 
name="south indian" rating={3}/>
      </div>
     </>
  )
}

export default Custom
import React from 'react'
import Card from '../Order/Card'
function Wishlist() {
  return (
    <div className='flex flex-row py-4 bg-white shadow-lg rounded-lg p-6 m-5'>
      <div>
      <Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" 
     name="south indian" rating={4}/>
      </div>
      <div>
      <Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" 
     name="south indian" rating={4}/>
      </div>
      <div>
      <Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" 
     name="south indian" rating={4}/>
      </div>
      <div>
      <Card src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" 
     name="south indian" rating={4}/>
      </div>
     
    </div>
  )
}

export default Wishlist
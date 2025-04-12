import React from 'react'
import Cart from '../Order/Cart'
import star from './../../public/star.png'

function Cardcart({src,name,id}) {
  return (
   <div className='w-[750px]  h-20 bg-stone-100 shadow-md flex rounded-md select-none'>
    <div className='pl-4'>
    <img src={src} alt={name} className='h-20 rounded-md w-[100px] ' />
    </div>
    <div className='flex-grow grid grid-rows-1 grid-flow-col place-content-evenly '>
      <h2  className='font-serif text-2xl my-auto'>{name}</h2>
       <h2 className='font-serif text-2xl my-auto'>50-60 <span>₹</span></h2>
       <div className='my-auto'><Cart id={id}/></div>
    </div>

   </div>
  )
}

export default Cardcart
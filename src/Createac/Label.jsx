import React from 'react'

function Label({text,htmlfor,className=''}) {
  return (
    <label htmlFor={htmlfor} className={ `max-lg:text-sm      absolute py-0  left-5   top-3 text-[18px] pl-1 select-none
     peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-7
     peer-focus:bg-white peer-focus:text-purple-600 transition-all duration-300 peer-focus:text-[15px]
     
      
    -translate-y-7 -translate-x-1 bg-white ${className}`}>{text}</label>
  )
}

export default Label
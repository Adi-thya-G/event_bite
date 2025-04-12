import React from 'react'
import Animation from './animation.webm'
function Loading() {
  return (
    <div className="grid place-items-center h-screen justify-center mx-auto">
    <video src={Animation} autoPlay loop className="max-w-full max-h-full justify-center" />
  </div>
  
  )
}

export default Loading
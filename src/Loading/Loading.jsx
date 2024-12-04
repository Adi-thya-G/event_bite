import React from 'react'
import Animation from './animation.webm'
function Loading() {
  return (
    <div className="flex justify-center items-center text-3xl w-full h-[900px]"><video src={Animation} autoPlay></video></div>
  )
}

export default Loading
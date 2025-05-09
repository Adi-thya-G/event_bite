import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
function Skeleton({ key1 }) {
  return (
    <div
      className="mb-5 w-[490px] h-[200px] bg-zinc-50 border-2 border-zinc-100 pl-1 rounded-sm   flex max-md:w-[320px] animate-pulse
"
      key={key1}
    >
      <div className="w-2/5 h-[190px] grid place-items-center  bg-gray-300 my-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-12 h-12 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          ></path>
        </svg>
      </div>
      <div className="w-[280px] h-[160px] bg-stone-50 my-auto ml-2">
        <div className="h-5/6 mt-1">
          <div className="block w-4/5 h-3 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
            &nbsp;
          </div>
          <div className="flex justify-end">
            <div className="block h-2 w-full mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit ">
              &nbsp;
            </div>
          </div>

          <div className="flex justify-end ">
            <div className="block h-2 w-full mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit ">
              &nbsp;
            </div>
          </div>
          <div className="flex justify-end">
            <div className="block h-2 w-full mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit ">
              &nbsp;
            </div>
          </div>
          <div className="flex justify-end">
            <div className="block h-2 w-full mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit ">
              &nbsp;
            </div>
          </div>
          <div className="flex justify-end">
            <div className="block h-2 w-full mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit ">
              &nbsp;
            </div>
          </div>
          <div className="flex justify-end">
            <div className="block h-2 w-full mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit ">
              &nbsp;
            </div>
          </div>
        </div>
        <div className="h-1/6 w-[100%] flex ">
          <FaHeart color="#D1D5DB" size={27} />
          <div className="ml-auto mr-2">
            <FaShoppingCart color="#D1D5DB" size={27} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;

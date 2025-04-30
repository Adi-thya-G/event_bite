import React from "react";

function Counter() {
  var count = document.getElementsByClassName("num");
  var inc = [];
  const intervalfun = () => {
    for (let i = 0; i < count.length; i++) {
      inc.push(1);
      if (inc[i] != count[i].getAttribute("data-max")) {
        inc[i]++;
      }
      else
      { 
       clearInterval(intervalfun)
      }
      count[i].textContent = inc[i];
    }
  };
  setInterval(intervalfun,50)
  return (
    <div className="p-2 grid grid-rows-2 grid-flow-col gap-2 sm:flex w-full sm:pl-5 " id="main">
      <div
        className=" w-36 h-24 bg-slate-400 rounded-lg shadow-sm  shadow-orange-400 img_counter border-1
    border-gray-400 sm:w-[23%] "
        style={{
          backgroundImage:
            "url(https://venuscateringservice.com/images/info-bar-1.jpg)",
        }}
      >
        <div className="w-full h-full">
          <h2
            className="text-white text-[40px]  flex justify-center mt-2 num "
            data-max="200"
          >
            00
          </h2>

          <h1 className="text-white text-xl flex justify-center font-semibold ">
            Menu option
          </h1>
        </div>
      </div>

      <div
        className="w-36 h-24 bg-slate-400 rounded-lg shadow-sm  shadow-orange-400 img_counter border-1
    border-gray-400 sm:w-[23%]"
      >
        <div className="w-full h-full">
          <h2
            className="text-white text-[40px] flex justify-center mt-2 num "
            data-max="400"
          >
            00
          </h2>

          <h1 className="text-white text-xl flex justify-center font-semibold ">
            Menu option
          </h1>
        </div>
      </div>
      <div
        className="w-36 h-24 bg-slate-400 rounded-lg shadow-sm  shadow-orange-400 img_counter border-1
    border-gray-400 sm:w-[25%]"
      >
<div className="w-full h-full">
          <h2
            className="text-white text-[40px] flex justify-center mt-2 num "
            data-max="300"
          >
            00
          </h2>

          <h1 className="text-white text-xl flex justify-center font-semibold  ">
            Vendors
          </h1>
        </div>

      </div>
      <div
        className="w-36 h-24 bg-slate-400 rounded-lg shadow-sm  shadow-orange-400 img_counter border-1
    border-gray-400 sm:w-[25%]"
    style={{backgroundImage:'url(https://venuscateringservice.com/images/info-bar-3.jpg)'}}
      >
<div className="w-full h-full">
          <h2
            className="text-white text-[40px] flex justify-center mt-2 num "
            data-max="250"
          >
            00
          </h2>

          <h1 className="text-white text-xl flex justify-center  font-semibold  ">
            Happy Foodies
          </h1>
        </div>

      </div>
      
    </div>
  );
}

export default Counter;

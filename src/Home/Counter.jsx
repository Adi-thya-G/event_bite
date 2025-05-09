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
        className=" w-32 h-32 bg-slate-400 rounded-lg shadow-sm  shadow-orange-400 img_counter border-1
    border-gray-400 sm:w-[23%] "
        style={{
          backgroundImage:
            "url(https://t4.ftcdn.net/jpg/06/03/64/07/360_F_603640779_QNVbk3tSd5nEU1uAO7RifpHUjLZCsjDJ.jpg)",
        }}
      >
        <div className="w-full h-full">
          <h2
            className="text-white text-[40px]  flex justify-center mt-2 num "
            data-max="28"
          >
            00
          </h2>

          <h1 className="text-white text-xl flex justify-center font-semibold ">
            Menu option
          </h1>
        </div>
      </div>

      <div
        className="w-32 h-32 bg-slate-400 rounded-lg shadow-sm  shadow-orange-400 img_counter border-1
    border-gray-400 sm:w-[23%]"style={{
      backgroundImage:
        "url(https://img.freepik.com/free-photo/side-view-people-celebrating-tamil-new-year_23-2151210764.jpg?t=st=1746078002~exp=1746081602~hmac=ef9d8959efa4b45c3348e2ae9432da0bd61af86aba850ab92fa0b232bc7808ae&w=1380)",
    }}
      >
        <div className="w-full h-full">
          <h2
            className="text-white text-[40px] flex justify-center mt-2 num "
            data-max="40"
          >
            00
          </h2>

          <h1 className="text-white text-xl flex justify-center font-semibold ">
            Customers
          </h1>
        </div>
      </div>
      <div
        className="w-32 h-32 bg-slate-400 rounded-lg shadow-sm  shadow-orange-400 img_counter border-1
    border-gray-400 sm:w-[25%]"
    style={{
      backgroundImage:
        "url(https://imgmediagumlet.lbb.in/media/2024/10/66fbe3b842f6a91b09f07d26_1727783864520.jpg)",
    }}
      >
<div className="w-full h-full">
          <h2
            className="text-white text-[40px] flex justify-center mt-2 num "
            data-max="30"
          >
            00
          </h2>

          <h1 className="text-white text-xl flex justify-center font-semibold  ">
            Vendors
          </h1>
        </div>

      </div>
      <div
        className="w-32 h-32 bg-slate-400 rounded-lg shadow-sm  shadow-orange-400 img_counter border-1
    border-gray-400 sm:w-[25%]"
    style={{backgroundImage:'url(https://venuscateringservice.com/images/info-bar-3.jpg)'}}
      >
<div className="w-full h-full">
          <h2
            className="text-white text-[40px] flex justify-center mt-2 num "
            data-max="20"
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

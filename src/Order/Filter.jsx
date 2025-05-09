import React from 'react';
import { BsSliders } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiFilterOffFill } from "react-icons/ri";
import { FaFilter } from 'react-icons/fa';
import InputCheck from './InputCheck';

function Filter({
  setshow,
  document,
  setdocument,
  documentfilter,
  option,
  setoption,
  valuerange,
  setrange,
  valueprice,
  setprice,
  filterbutton,
  setbuttonfilter
}) {
  const element = ["veg", "non veg"];
  const range = ["Low to high", "High to low"];
  const price = ["1", "2", "3", "4", "5"];

  const handle = (e, ele, setele) => {
    ele === e.target.value ? setele("") : setele(e.target.value);
  };

  const filterhandle = () => {
    if (filterbutton) {
      // category
      if (option !== "") {
        setdocument(document.filter((ele) => ele.type === option));
      }
      if (valueprice !== "") {
        setdocument(document.filter((ele) => ele.rating === valueprice));
      }
    } else {
      setdocument(document);
      setoption("");
      setrange("");
      setprice("");
    }
    setbuttonfilter((pre) => !pre);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b">
          <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          <button 
            onClick={() => setshow(false)}
            className="p-1 text-gray-500 rounded-full hover:bg-gray-100"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="p-4 space-y-6">
          {/* Menu Type */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-800">Menu Type</h3>
            <ul className="space-y-2">
              {element.map((ele) => (
                <li key={ele} className="flex items-center">
                  <InputCheck
                    onclick={handle}
                    ele={ele}
                    option={option}
                    setoption={setoption}
                  />
                  <span className="ml-2 capitalize">{ele}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Range */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-800">Price Range</h3>
            <ul className="space-y-2">
              {range.map((ele) => (
                <li key={ele} className="flex items-center">
                  <InputCheck
                    onclick={handle}
                    ele={ele}
                    option={valuerange}
                    setoption={setrange}
                  />
                  <span className="ml-2">{ele}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rating */}
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-800">Rating</h3>
            <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {price.map((ele) => (
                <li key={ele} className="flex items-center">
                  <InputCheck
                    onclick={handle}
                    ele={ele}
                    option={valueprice}
                    setoption={setprice}
                  />
                  <span className="ml-2 flex items-center">
                    {ele} <span className="ml-1 text-yellow-500">★</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer with Apply Button */}
        <div className="sticky bottom-0 p-4 bg-white border-t">
          <button
            className={`flex items-center justify-center w-full py-3 px-4 rounded-lg ${
              filterbutton
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            } font-medium transition-colors`}
            onClick={filterhandle}
          >
            {filterbutton ? (
              <>
                <span>Apply Filters</span>
                <FaFilter className="ml-2" />
              </>
            ) : (
              <>
                <span>Clear Filters</span>
                <RiFilterOffFill className="ml-2" size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
import React, { useState, useMemo, useEffect } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight, FiDownload, FiColumns, FiTrash2, FiEdit, } from "react-icons/fi";
import { FaRegSave } from 'react-icons/fa'; // Import the FaRegSave icon
import menu from "../Appwrite/menu";
import { IoLeaf } from 'react-icons/io5'
import { FiAlertCircle } from 'react-icons/fi';  
import { useNavigate, useNavigation } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details= () => {

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    description:true,
    rating: true,
    type: true,
    ImageId: true
  });
  const [edit,setedit]=useState("")
  
  const navigate=useNavigate()

  const DeleteListItem=()=>{
    if(selectedRows.length!=0)
    {
    try{
         selectedRows.forEach(async(ele)=>{
          let res=await menu.Delete_Menu({id:ele})
         
        })   
        toast.success(` ${selectedRows.length} items deleted successfully`)
    }
    catch(error)
    {
      console.log(error)
    }
  }
  else{
    
    toast.error("item is not selected",{position:"top-center",duration: 1000})
  }
  }


  const itemsPerPage = 6;

  const handleData=async()=>{
    setLoading(true)
    let res=await menu.getmenu()
    console.log(res.documents)
    setLoading(false)
    setData(res.documents)
    
  }
  useEffect(()=>{handleData()},[])

  const [mockData,setData]=useState("")

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
    console.log(selectedRows)
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const filteredData = useMemo(() => {
    let filtered = [...mockData];
    if (searchTerm) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [mockData, searchTerm, sortConfig]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if(loading) return <div className='flex justify-center items-center h-screen'>
  <div className='loader justify-center'></div>
</div>

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg ">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-5">
        <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
            onClick={() =>navigate("/admin/combo-create") }
          >
            Create 
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
            onClick={() => {
              DeleteListItem()
            }}
          >
            Delete 
          </button>
          <div className="relative inline-block">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
              onClick={() => document.getElementById("columnToggle").classList.toggle("hidden")}
            >
              <FiColumns /> Columns
            </button>
            <div id="columnToggle" className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
              {Object.entries(visibleColumns).map(([key, value]) => (
                <label key={key} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => toggleColumn(key)}
                    className="mr-2"
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === filteredData.length}
                />
              </th>
              {visibleColumns.name && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  Name
                </th>
              )}
              {visibleColumns.description && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("email")}
                >
                  Description
                </th>
              )}
              {visibleColumns.rating && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("role")}
                >
                  Rating
                </th>
              )}
              {visibleColumns.type && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("status")}
                >
                    Type
                </th>
              )}
              {visibleColumns.ImageId && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("lastActive")}
                >
                  ImageId
                </th>
              )}
              <th className="px-4 py-3 text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.$id}
                  className={`border-b py-3 border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors group`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.$id)}
                      onClick={() => handleRowSelect(item.$id)}
                    />
                  </td>
                  
                {visibleColumns.name && <td className="px-4 py-3">
                  <input type="text" id={item.$id+"name"} class={` ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}  group-hover:bg-gray-100 text-gray-900 text-sm rounded-lg ${edit==item.$id?"border-2 border-gray-600":""}   block w-full p-2.5 `}  required defaultValue={item.name}  disabled={edit!=item.$id}
                onChange={(e)=>{
                
                }}/>
                    </td>}
                  {visibleColumns.description && <td className="px-2 py-3 w-80 ">
                    <input type="text" id={item.$id+"description"} class={` ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}  group-hover:bg-gray-100 text-gray-900 text-sm rounded-lg ${edit==item.$id?"border-2 border-gray-600":""}   block w-full p-2.5 `}  required defaultValue={item.description}  disabled={edit!=item.$id}/>
                    </td>}
                  {visibleColumns.rating && <td className="px-4 py-3">
                    <input type="text" id={item.$id+"rating"} class={` ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}  group-hover:bg-gray-100 text-gray-900 text-sm rounded-lg ${edit==item.$id?"border-2 border-gray-600":""}   block w-16 p-2.5 `}  required defaultValue={item.rating}  disabled={edit!=item.$id}/>
                    </td>}
                  {visibleColumns.type && <td className={`px-4 py-3  cursor-pointer group ${item.type=="veg"?"text-green-400":"text-red-500"} `} ><span className=" hidden group-hover:block">{item.type=="veg"?"veg":"non-veg"}</span>{item.type=="veg"?(<IoLeaf className="text-green-400 text-2xl" />):(<FiAlertCircle className="text-red-500"/>)}</td>}
                  {visibleColumns.ImageId && 
                    <td className="px-4 py-3">
                      
                        {item.imgid}
                
                    </td>
                  }
                  {visibleColumns.lastActive && <td className="px-4 py-3">{item.lastActive}</td>}
                  <td className="px-4 py-3 ">
                    { edit!=item.$id?
                   ( <button
                      className="text-green-500 hover:text-blue-700 transition-colors"
                       onClick={()=>{setedit(item.$id)
                       }}
                    >
                      <FiEdit className="text-xl" />
                    </button>)
                    :(
                      <button className="" onClick={async()=>{
                        
                        setedit("")
                        let name=document.getElementById(item.$id+"name").value
                        let description=document.getElementById(item.$id+"description").value
                        let rating=document.getElementById(item.$id+"rating").value
                        console.log(item.$id)
                        try{
                             let res=await menu.Update_Menu(id=item.$id,{name:name,description:description,rating:rating})
                             console.log(res)
                        }
                        catch(error)
                        {
                          console.log(error)
                        }
                       
                      }}>
                        
                        <FaRegSave className="text-xl text-blue-400"/>
                        
                      </button>
                    )
}                   
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`px-3 py-1 rounded-lg border ${currentPage === page ? "bg-blue-500 text-white" : "border-gray-300 hover:bg-gray-50"}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
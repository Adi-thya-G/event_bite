import React, { useState, useMemo, useEffect } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight, FiColumns, FiTrash2, FiEdit } from "react-icons/fi";
import { FaRegSave } from 'react-icons/fa';
import { IoLeaf } from 'react-icons/io5';
import { FiAlertCircle } from 'react-icons/fi';  
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import menu from "../Appwrite/menu";

const Details = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    description: true,
    rating: true,
    type: true,
    imgid: true
  });
  const [editId, setEditId] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [mockData, setData] = useState([]);
  
  const navigate = useNavigate();
  const itemsPerPage = 6;

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await menu.getmenu();
      setData(res.documents);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete selected items
  const deleteSelectedItems = async () => {
    if (selectedRows.length === 0) {
      toast.error("Please select items to delete", { position: "top-center" });
      return;
    }

    try {
      const deletePromises = selectedRows.map(id => menu.Delete_Menu({ id }));
      await Promise.all(deletePromises);
      toast.success(`${selectedRows.length} items deleted successfully`);
      setSelectedRows([]);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting items:", error);
      toast.error("Failed to delete items");
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredData.map(item => item.$id));
    } else {
      setSelectedRows([]);
    }
  };

  // Toggle column visibility
  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  // Enable edit mode
  const enableEdit = (item) => {
    setEditId(item.$id);
    setEditableData({
      name: item.name,
      description: item.description,
      rating: item.rating
    });
  };

  // Handle edit field changes
  const handleEditChange = (field, value) => {
    setEditableData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Save edited data
  const saveEdit = async (id) => {
    try {
      const res = await menu.Update_Menu(id, editableData);
      toast.success("Item updated successfully");
      setEditId(null);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    }
  };

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...mockData];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
    
    // Sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filtered;
  }, [mockData, searchTerm, sortConfig]);

  // Paginate data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='loader justify-center'></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header with search and actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
            onClick={() => navigate("/admin/combo-create")}
          >
            Create
          </button>
          
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"
            onClick={deleteSelectedItems}
          >
            Delete
          </button>
          
          <div className="relative">
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
                    className="mr-2 rounded text-blue-500 focus:ring-blue-400"
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-3 text-left w-10">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  className="rounded text-blue-500 focus:ring-blue-400"
                />
              </th>
              
              {visibleColumns.name && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === "name" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              )}
              
              {visibleColumns.description && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("description")}
                >
                  <div className="flex items-center">
                    Description
                    {sortConfig.key === "description" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              )}
              
              {visibleColumns.rating && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("rating")}
                >
                  <div className="flex items-center">
                    Rating
                    {sortConfig.key === "rating" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              )}
              
              {visibleColumns.type && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center">
                    Type
                    {sortConfig.key === "type" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              )}
              
              {visibleColumns.imgid && (
                <th className="px-4 py-3 text-left">
                  Image ID
                </th>
              )}
              
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item.$id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    selectedRows.includes(item.$id) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.$id)}
                      onChange={() => handleRowSelect(item.$id)}
                      className="rounded text-blue-500 focus:ring-blue-400"
                    />
                  </td>
                  
                  {visibleColumns.name && (
                    <td className="px-4 py-3">
                      {editId === item.$id ? (
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editableData.name}
                          onChange={(e) => handleEditChange("name", e.target.value)}
                        />
                      ) : (
                        <span>{item.name}</span>
                      )}
                    </td>
                  )}
                  
                  {visibleColumns.description && (
                    <td className="px-4 py-3">
                      {editId === item.$id ? (
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editableData.description}
                          onChange={(e) => handleEditChange("description", e.target.value)}
                        />
                      ) : (
                        <span className="truncate max-w-xs inline-block">{item.description}</span>
                      )}
                    </td>
                  )}
                  
                  {visibleColumns.rating && (
                    <td className="px-4 py-3">
                      {editId === item.$id ? (
                        <input
                          type="text"
                          className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={editableData.rating}
                          onChange={(e) => handleEditChange("rating", e.target.value)}
                        />
                      ) : (
                        <span>{item.rating}</span>
                      )}
                    </td>
                  )}
                  
                  {visibleColumns.type && (
                    <td className="px-4 py-3">
                      <div className={`flex items-center ${item.type === "veg" ? "text-green-500" : "text-red-500"}`}>
                        {item.type === "veg" ? (
                          <IoLeaf className="text-xl" />
                        ) : (
                          <FiAlertCircle className="text-xl" />
                        )}
                        <span className="ml-2 hidden md:inline">
                          {item.type === "veg" ? "Veg" : "Non-Veg"}
                        </span>
                      </div>
                    </td>
                  )}
                  
                  {visibleColumns.imgid && (
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {item.imgid}
                    </td>
                  )}
                  
                  <td className="px-4 py-3">
                    {editId === item.$id ? (
                      <button
                        onClick={() => saveEdit(item.$id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Save"
                      >
                        <FaRegSave className="text-xl" />
                      </button>
                    ) : (
                      <button
                        onClick={() => enableEdit(item)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Edit"
                      >
                        <FiEdit className="text-xl" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 2} className="px-4 py-8 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`px-3 py-1 rounded-lg border ${
                currentPage === page
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 hover:bg-gray-100"
              } transition-colors`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <button
            className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
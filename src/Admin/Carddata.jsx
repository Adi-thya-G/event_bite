import React, { useState, useMemo } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight, FiDownload, FiColumns, FiTrash2 } from "react-icons/fi";

const Carddata = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRows, setSelectedRows] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    role: true,
    status: true,
    lastActive: true
  });

  const itemsPerPage = 5;

  const mockData = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "Admin", status: "Active", lastActive: "2024-01-20" },
    { id: 2, name: "Emma Wilson", email: "emma@example.com", role: "Editor", status: "Inactive", lastActive: "2024-01-19" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Viewer", status: "Active", lastActive: "2024-01-18" },
    { id: 4, name: "Sarah Davis", email: "sarah@example.com", role: "Admin", status: "Active", lastActive: "2024-01-17" },
    { id: 5, name: "James Johnson", email: "james@example.com", role: "Editor", status: "Active", lastActive: "2024-01-16" },
    { id: 6, name: "Lisa Anderson", email: "lisa@example.com", role: "Viewer", status: "Inactive", lastActive: "2024-01-15" },
    { id: 7, name: "Robert Wilson", email: "robert@example.com", role: "Admin", status: "Active", lastActive: "2024-01-14" }
  ];

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
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
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
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
            onClick={() => console.log("Export data")}
          >
            <FiDownload /> Export
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
              {visibleColumns.email && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("email")}
                >
                  Email
                </th>
              )}
              {visibleColumns.role && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("role")}
                >
                  Role
                </th>
              )}
              {visibleColumns.status && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("status")}
                >
                  Status
                </th>
              )}
              {visibleColumns.lastActive && (
                <th
                  className="px-4 py-3 text-left cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("lastActive")}
                >
                  Last Active
                </th>
              )}
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleRowSelect(item.id)}
                    />
                  </td>
                  {visibleColumns.name && <td className="px-4 py-3">{item.name}</td>}
                  {visibleColumns.email && <td className="px-4 py-3">{item.email}</td>}
                  {visibleColumns.role && <td className="px-4 py-3">{item.role}</td>}
                  {visibleColumns.status && (
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${item.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  )}
                  {visibleColumns.lastActive && <td className="px-4 py-3">{item.lastActive}</td>}
                  <td className="px-4 py-3">
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => console.log("Delete", item.id)}
                    >
                      <FiTrash2 />
                    </button>
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

export default Carddata;
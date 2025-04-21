import React from "react";
import faq_data from "../../Appwrite/faq_data";
import { useState, useEffect } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiPlus,
} from "react-icons/fi";

import { Flex, Spin } from "antd";
import { Button, Empty, Typography } from 'antd';
const FAQ_table = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    type: "",
  });
  const [errors, setErrors] = useState({});

  // Filter faqs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // fetch

  const handle_fetch = async () => {
    let res = await faq_data.GetFaq();
    if(res)
{
  setFaqs(res.documents);
  setLoading(false)
} 
};

  useEffect(() => {
    handle_fetch();
  }, []);
  // Sort faqs
  const sortedFaqs = [...filteredFaqs].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const direction = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.key].localeCompare(b[sortConfig.key]) * direction;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = sortedFaqs.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.question.trim()) newErrors.question = "Question is required";
    if (!formData.answer.trim()) newErrors.answer = "Answer is required";
    if (!formData.type.trim()) {
      newErrors.email = "type is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (selectedFaq) {
      setFaqs(
        faqs.map((faq) =>
          faq.$id === selectedFaq.$id ? { ...formData, id: faq.id } : faq
        )
      );
    } else {
      try {
        let res = await faq_data.CREATE_FAQ({
          question: formData.question,
          answer: formData.answer,
          type: formData.type,
        });
        setc;
      } catch (errors) {
        console.log(errors);
      }
    }

    setIsModalOpen(false);
    setSelectedFaq(null);
    setFormData({ question: "", answer: "", email: "" });
  };

  const handleEdit = (faq) => {
    setSelectedFaq(faq);
    setFormData(faq);
    setIsModalOpen(true);
  };

  const handleDelete = (faq) => {
    setSelectedFaq(faq);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      let res = await faq_data.Delete_FAQ(selectedFaq.$id);
      setFaqs(faqs.filter((ele) => ele.$id != selectedFaq.$id));
      setIsDeleteModalOpen(false);
      setSelectedFaq(null);
    } catch (errors) {
      console.log(errors);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      </div>
    );
  if (currentFaqs.length == 0)
    return (
      <div className="flex justify-center items-center h-screen">
       


  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    styles={{ image: { height: 60 } }}
    description={
      <Typography.Text>
        Customize <a href="#API">Description</a>
      </Typography.Text>
    }
  >
    <Button type="primary">Create Now</Button>
  </Empty>

      </div>
    );
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">FAQ Management</h1>
        <button
          onClick={() => {
            setSelectedFaq(null);
            setFormData({ question: "", answer: "", type: "" });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <FiPlus /> Add New FAQ
        </button>
      </div>

      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full px-4 py-2 border rounded-lg pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("question")}
              >
                <div className="flex items-center gap-2">
                  Question
                  {sortConfig.key === "question" &&
                    (sortConfig.direction === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Answer
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center gap-2">
                  Type
                  {sortConfig.key === "email" &&
                    (sortConfig.direction === "asc" ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    ))}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentFaqs.map((faq) => (
              <tr key={faq.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-normal">
                  <div className="text-sm text-gray-900">{faq.question}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {faq.answer.length > 100
                      ? `${faq.answer.substring(0, 100)}...`
                      : faq.answer}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{faq.type}</div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, sortedFaqs.length)} of {sortedFaqs.length}{" "}
          entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastItem >= sortedFaqs.length}
            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedFaq ? "Edit FAQ" : "Add New FAQ"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Question
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-2 border-black p-2"
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Answer
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  rows="4"
                  className="mt-1 block w-full rounded-md p-2 border-2 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.answer && (
                  <p className="text-red-500 text-sm mt-1">{errors.answer}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-black p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {selectedFaq ? "Update" : "Add"} FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this FAQ? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ_table;

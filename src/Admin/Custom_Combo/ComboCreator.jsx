import { useState, useRef, useCallback } from "react";
import { FaStar, FaUpload, FaTrash } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { RiLeafLine, RiLeafFill } from "react-icons/ri";
import menu from "../../Appwrite/menu";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ComboCreator = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rating: 0,
    image: null,
    imagePreview: null,
    type: "veg"
  });
  const navigate=useNavigate()
  const [errors, setErrors] = useState({});
  const [hoveredStar, setHoveredStar] = useState(0);
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.name.length > 30) newErrors.name = "Name must be less than 30 characters";
    if (!formData.price) newErrors.price = "Price is required";
    if (formData.price < 5 || formData.price > 50) newErrors.price = "Price must be between $5 and $50";
    if (formData.description.length > 150) newErrors.description = "Description must be less than 150 characters";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleImageDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0] || e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "File size must be less than 5MB" }));
        return;
      }
      if (![".jpg", ".jpeg", ".png"].some(ext => file.name.toLowerCase().endsWith(ext))) {
        setErrors(prev => ({ ...prev, image: "Only JPG, JPEG, PNG files are allowed" }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit =async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
            let img=await menu.uploadFile(formData.image)
            if(img)
            {
           let res1= await menu.createcombo({
            name:formData.name,
            image:img.$id,
            description:formData.description,
            rating:String(formData.rating),
            type:formData.type})
           if(res1)
           {
            toast.success('Created New Combo Successfully')
            navigate("/admin/custom-combo")
           }
           }
          
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Create Your Custom Combo</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Combo Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Combo Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Combo Name"
                      className={`mt-1 block w-full h-12 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your delicious combo"
                      rows="4"
                      maxLength={130}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price*</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="5"
                        max="50"
                        step="0.01"
                        className={`block w-full pl-7 h-12 pr-12 rounded-md border ${errors.price ? 'border-red-500' : 'border-gray-300'} focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`}
                      />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <div className="flex items-center mt-2 space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${star <= (hoveredStar || formData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          size={24}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <div
                      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${formData.image ? 'border-indigo-500' : 'border-gray-300'}`}
                      onDrop={handleImageDrop}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <div className="space-y-1 text-center">
                        {formData.imagePreview ? (
                          <div className="relative">
                            <img
                              src={formData.imagePreview}
                              alt="Preview"
                              className="mx-auto h-32 w-32 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: null }))}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  ref={fileInputRef}
                                  onChange={handleImageDrop}
                                  accept=".jpg,.jpeg,.png"
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                  </div>

                  {/* Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type*</label>
                    <div className="mt-2 flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: "veg" }))}
                        className={`flex items-center px-4 py-2 rounded-md ${formData.type === "veg" ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        <RiLeafFill className={`mr-2 ${formData.type === "veg" ? 'text-green-600' : 'text-gray-500'}`} />
                        Veg
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: "non-veg" }))}
                        className={`flex items-center px-4 py-2 rounded-md ${formData.type === "non-veg" ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        <MdFastfood className={`mr-2 ${formData.type === "non-veg" ? 'text-red-600' : 'text-gray-500'}`} />
                        Non-Veg
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Combo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboCreator;
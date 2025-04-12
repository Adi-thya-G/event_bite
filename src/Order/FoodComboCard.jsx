import { useState } from "react";
import { FaLeaf, FaFire, FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoNutritionOutline } from "react-icons/io5";
import Wish from "./Wish";

const FoodComboCard = () => {
  
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const comboItems = [
    {
      name: "Grilled Chicken",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
      description: "Herb-marinated tender chicken",
      isVeg: false,
      spiceLevel: 2
    },
    {
      name: "Garden Salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      description: "Fresh mixed greens",
      isVeg: true,
      spiceLevel: 0
    },
    {
      name: "Garlic Bread",
      image: "https://images.unsplash.com/photo-1619535860434-da906327e61f",
      description: "Crusty artisan bread",
      isVeg: true,
      spiceLevel: 0
    },
    {
      name: "Spicy Wings",
      image: "https://images.unsplash.com/photo-1608039755401-742074f0548d",
      description: "Buffalo style wings",
      isVeg: false,
      spiceLevel: 3
    },
    {
      name: "Pasta Alfredo",
      image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
      description: "Creamy pasta delight",
      isVeg: true,
      spiceLevel: 1
    },
    {
      name: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62",
      description: "Rich dessert slice",
      isVeg: true,
      spiceLevel: 0
    }
  ];

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const renderSpiceLevel = (level) => {
    return Array(level)
      .fill()
      .map((_, index) => (
        <FaFire
          key={index}
          className="text-red-500 inline-block"
          size={12}
        />
      ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Family Feast Combo</h2>
              <p className="text-orange-100">Perfect for 4-6 people</p>
            </div>
            <div className="text-right">
              <div className="text-lg line-through text-orange-200">$89.99</div>
              <div className="text-3xl font-bold">$69.99</div>
              <div className="bg-yellow-400 text-orange-900 text-sm font-bold px-3 py-1 rounded-full inline-block mt-2">
                Save 22%
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {comboItems.map((item, index) => (
            <div
              key={index}
              className="flex space-x-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                )}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                  onLoad={handleImageLoad}
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  {item.isVeg ? (
                    <FaLeaf className="text-green-500" size={14} />
                  ) : null}
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <div className="mt-2">{renderSpiceLevel(item.spiceLevel)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <IoNutritionOutline size={20} />
                <span className="text-sm">1200 kcal per person</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Wish id={""}/>
                <span className="text-sm">4.8 Rating</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-5 ">
               <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200">Add to Cart</button>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition-colors duration-200">
                <FaShoppingCart size={16} />
                <span>Order Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodComboCard;
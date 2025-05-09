import React from "react";
import {useNavigate} from 'react-router-dom'
const comboData = [
  {
    title: "Masala Dosa",
    description: "Crispy dosa filled with spiced potato masala, served with chutneys.",
    image: "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa.jpg",
  },
  {
    title: "Paneer Tikka",
    description: "Grilled paneer cubes marinated with yogurt and spices.",
    image: "https://images.unsplash.com/photo-1701579231320-cc2f7acad3cd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFuZWVyJTIwdGlra2F8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Vegetable Biryani",
    description: "Aromatic rice cooked with fresh vegetables and Indian spices.",
    image: "https://media.istockphoto.com/id/179085494/photo/indian-biryani.jpg?s=612x612&w=0&k=20&c=VJAUfiuavFYB7PXwisvUhLqWFJ20-9m087-czUJp9Fs=",
  },
  {
    title: "Chole Bhature",
    description: "Spicy chickpea curry served with fluffy bhature.",
    image: "https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe.jpg",
  },
];


function ComboCard({ title, description, image }) {
  const navigate=useNavigate()
  return (
    <div className="bg-zinc-50 w-full max-w-sm mx-auto p-3 rounded-xl shadow hover:shadow-md transition">
      <div className="w-full mb-2">
        <img className="rounded-lg w-full h-48 object-cover" src={image} alt={title} />
      </div>
      <div className="px-2">
        <h1 className="text-xl font-semibold font-mono">{title}</h1>
        <p className="text-orange-400 text-sm mt-1">{description}</p>
        <div className="flex justify-end mt-3">
          <button className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition tracking-wide"
          onClick={()=>navigate("/menu")}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

function Popular() {
  return (
    <div className="w-full px-4 mt-20">
      <h2 className="text-center text-3xl font-semibold mb-10 max-md:text-2xl max-sm:text-xl">
        <span className="block mb-2">Feast Your Eyes:</span>Explore Our Catering Combos!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {comboData.map((combo, index) => (
          <ComboCard key={index} {...combo} />
        ))}
      </div>
    </div>
  );
}

export default Popular;

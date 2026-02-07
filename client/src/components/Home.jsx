import { HomeIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[85vh] flex-col gap-4">
      <HomeIcon className="w-20 h-20 text-gray-600" />
      <h1 className="text-2xl font-bold">Home</h1>
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer"
        onClick={() => navigate("/shop")}
      >
        Shop Now
      </button>
    </div>
  );
};

export default Home;

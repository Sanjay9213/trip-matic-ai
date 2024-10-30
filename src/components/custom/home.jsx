import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-20 py-12 gap-10 bg-gradient-to-b from-blue-50 to-indigo-100 rounded-lg shadow-md">
    <h1 className="text-4xl font-extrabold text-gray-800 uppercase tracking-wide transform transition duration-500 hover:scale-105 hover:text-[#ff6347]">
  <span className="text-[#4f46e5]">TripMatic AI</span> 
</h1>

    <h1 className="font-bold text-[48px] text-center text-gray-900 leading-tight">
      <span className="text-[#ff6347]">Discover Your Next Adventure:</span> Tailored Itineraries with AI
    </h1>
    <p className="text-lg text-gray-600 text-center max-w-2xl">
      Let TripMatic AI be your personal trip planner, creating customized itineraries to match your unique interests and budget.
    </p>
    <Link to={'/create-trip'}>
    <Button className="mt-6 px-6 py-3 bg-[#4f46e5] hover:bg-[#3b3a99] text-white text-lg font-medium rounded-lg transition duration-300">
      Get Started – It’s Free!
    </Button>
    </Link>
  </div>
  
  );
};

export default Home;

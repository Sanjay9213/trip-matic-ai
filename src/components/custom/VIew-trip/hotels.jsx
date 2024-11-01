import React from "react";
import HotelCardItem from "./hotel-card-item";

const Hotels = ({ trip }) => {
  return (
    <div className="p-5 bg-white rounded-lg flex flex-col items-center mb-10">
    <h2 className="text-xl font-bold mb-3 text-center">
      Hotel Recommendations
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-[80%]">
      {trip?.tripData?.hotelOptions?.map((item, index) => (
        <HotelCardItem key={index} hotel={item} />
      ))}
    </div>
  </div>
  );
};

export default Hotels;

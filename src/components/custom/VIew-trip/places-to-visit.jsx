import React from "react";
import PlaceCardItem from "./place-card-item";

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md flex flex-col items-center">
    <h2 className="text-xl font-bold mb-3 text-center">Itinerary</h2>

    <div className="w-[80%]">
      {trip?.tripData?.itinerary &&
        trip.tripData.itinerary.map((item, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-medium text-lg mb-2">{item.day}</h2>
            <p className="text-sm text-gray-500 mb-3">{item.bestTime}</p>
            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((place, index) => (
                <PlaceCardItem key={index} place={place} />
              ))}
            </div>
          </div>
        ))}
    </div>
  </div>
  );
};

export default PlacesToVisit;

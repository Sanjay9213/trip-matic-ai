import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/PhotosApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.place,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );

      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md flex flex-col items-center">
      <img
        src={photoUrl ? photoUrl : "/traveler.jpg"}
        alt="Trip Image"
        className="h-[300px] w-[80%] object-cover rounded-md mb-4"
      />
<h2 className="text-2xl font-bold mb-3 text-center">
        {trip?.userSelection.place || "Unknown Location"}
      </h2>
      <div className="flex items-center justify-between w-[80%] mb-3">
        
        <div className="flex items-center gap-4">
          <span className="p-2 px-4 bg-gray-200 rounded-lg text-center">
            🕒 {trip?.userSelection?.days} Day(s)
          </span>
          <span className="p-2 px-4 bg-gray-200 rounded-lg text-center">
            💰 {trip?.userSelection?.budget || "Budget"}
          </span>
          <span className="p-2 px-4 bg-gray-200 rounded-lg text-center">
            👥 {trip?.userSelection?.companion || "N/A"} Traveler(s)
          </span>
        </div>

        <Button className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
          <IoIosSend size={24} />
        </Button>
      </div>

      
    </div>
  );
};

export default InfoSection;

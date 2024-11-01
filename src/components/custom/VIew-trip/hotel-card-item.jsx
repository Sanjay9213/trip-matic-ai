import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/PhotosApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel }) => {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
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
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel.hotelName +
        ","
      }
      target="_blank"
      className="block w-full hover:scale-105 transition-all cursor-pointer shadow-lg rounded-lg overflow-hidden bg-white"
    >
      <div className="h-72 flex flex-col">
        <img
          src={photoUrl ? photoUrl : "/traveler.jpg"}
          alt={hotel?.hotelName}
          className="h-[140px] w-full object-cover"
        />
        <div className="p-4 flex flex-col gap-2 h-[100px]">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="text-sm text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;

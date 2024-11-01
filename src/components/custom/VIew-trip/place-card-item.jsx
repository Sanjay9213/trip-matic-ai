import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/PhotosApi";

function PlaceCardItem({ place }) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (place) {
      fetchPlacePhoto();
    }
  }, [place]);

  const fetchPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };
    try {
      const result = await GetPlaceDetails(data);
      const photoName = result.data.places[0]?.photos[3]?.name;
      
      if (photoName) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };


  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName}
      target="_blank"
      className="block w-[70%] p-4 bg-white hover:scale-105 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-transform duration-200"
    >
      <div className="flex items-center gap-5">
        <img
          src={photoUrl ? photoUrl : "/traveler.jpg"}
          alt={place.placeName}
          className="w-[110px] h-[110px] rounded-lg object-cover"
        />
        <div className="flex flex-col justify-between">
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2 text-sm">🕙 {place.timeToTravel}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;

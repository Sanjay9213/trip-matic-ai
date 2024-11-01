import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/PhotosApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
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
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all  ">
        <img
          src={photoUrl ? photoUrl : "/traveler.jpg"}
          className="object-cover w-full h-[200px] rounded-xl "
        />
        <div className="p-4">
          <h2 className="font-bold text-lg truncate">
            {trip?.userSelection?.place}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.days} Days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;

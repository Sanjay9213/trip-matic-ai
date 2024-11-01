import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./VIew-trip/user-trip-card-item";

const MyTrips = () => {
  const [userTrips, setUserTrips] = useState([]);
  const navigate  = useNavigate();

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) {
      navigate("/");
      return;
    }

    setUserTrips([]);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };
  return (
    <div className="px-5 sm:px-10 md:px-20 lg:px-40 xl:px-56 mt-10">
    <h2 className="font-bold text-3xl">My Trips</h2>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
      {userTrips?.length > 0 ? (
        userTrips.map((trip, index) => (
          <UserTripCardItem trip={trip} key={index} />
        ))
      ) : (
        [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            key={index}
            className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
          />
        ))
      )}
    </div>
  </div>
  
  )
};

export default MyTrips;

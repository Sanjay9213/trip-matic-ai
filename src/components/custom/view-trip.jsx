import { toast } from "@/hooks/use-toast";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "./VIew-trip/info-section";
import Hotels from "./VIew-trip/hotels";
import PlacesToVisit from "./VIew-trip/places-to-visit";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip]= useState();

  useEffect(()=>{
tripId && getTripData();
  },[tripId])

  const getTripData =  async ()=>{
    const docRef = doc(db,'AITrips',tripId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        console.log("Document:", docSnap.data());
        setTrip(docSnap.data());
    }else {
        toast('No trip found!')
    }

  }
  return (
    <div className="">
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
    </div>
  );
  
};

export default ViewTrip;

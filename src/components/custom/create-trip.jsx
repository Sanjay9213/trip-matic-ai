import React, { useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { Input } from "../ui/input";
import {
  AI_PROMPT,
  budgetOptions,
  companionOptions,
} from "../../constants/option";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { chatSession } from "@/service/AiModal";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "@/service/firebaseConfig";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [companion, setCompanion] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!days || days <= 0 || days > 10 || !place || !budget || !companion) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please enter correct details.",
      });
      return;
    }
    setLoading(true);
    const Final_prompt = AI_PROMPT.replace(
      "{location}",
      place?.formatted_address
    )
      .replace("{totalDays}", days)
      .replace("{traveler}", companion)
      .replace("{budget}", budget);

    const result = await chatSession.sendMessage(Final_prompt);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: {
        place: place?.formatted_address,
        days: days,
        budget: budget,
        companion: companion,
    },
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => GetUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      handleGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center p-10">
      <h2 className="font-bold text-3xl text-center">
        Tell Us Your Travel Preferences
      </h2>
      <p className="mt-3 text-gray-500 text-lg text-center whitespace-nowrap">
        Provide some basic details, and TripMatic AI will create a customized
        itinerary based on your preferences.
      </p>

      <div className="mt-12 flex flex-col gap-8 w-full max-w-lg">
        <div>
          <h2 className="text-xl font-medium mb-2">
            What is your destination of choice?
          </h2>
          <ReactGoogleAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            onPlaceSelected={(place) => setPlace(place)}
            className="w-full h-12 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search for a destination..."
          />
        </div>

        <div>
          <h2 className="text-xl font-medium mb-2">
            How many days are you planning for your trip?
          </h2>
          <Input
            type="number"
            placeholder="Ex. 3"
            onChange={(e) => setDays(e.target.value)}
            className="w-full h-12 p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-4">
            {budgetOptions.map((option) => (
              <div
                key={option.label}
                onClick={() => setBudget(option.label)}
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center text-center 
                ${
                  budget === option.label
                    ? "bg-indigo-100 border-indigo-500"
                    : "bg-white border-gray-200"
                } transition-colors duration-200`}
              >
                <div className="text-3xl text-indigo-500">{option.icon}</div>
                <h3 className="font-semibold mt-2">{option.label}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Who do you plan to travel with?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {companionOptions.map((option) => (
              <div
                key={option.label}
                onClick={() => setCompanion(option.label)}
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center text-center 
                ${
                  companion === option.label
                    ? "bg-indigo-100 border-indigo-500"
                    : "bg-white border-gray-200"
                } transition-colors duration-200`}
              >
                <div className="text-3xl text-indigo-500">{option.icon}</div>
                <h3 className="font-semibold mt-2">{option.label}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        disabled={loading}
        onClick={handleGenerateTrip}
        className="mt-12 px-6 py-3 bg-[#4f46e5] hover:bg-[#3b3a99] text-white text-lg font-medium rounded-lg transition duration-300"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Generate Trip"
        )}
      </Button>

      <Dialog open={openDialog}>
        <DialogContent className="p-8 max-w-sm bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogDescription className="flex flex-col items-center text-center">
              <img src="/logo.svg" alt="App Logo" className="w-20 h-20 mb-6" />
              <h2 className="font-bold text-2xl text-gray-800 mb-2">
                Sign In With Google
              </h2>
              <p className="text-gray-600 mb-6">
                Sign in to the app with Google authentication.
              </p>
              <Button
                onClick={login}
                className="w-full mt-4 py-3 flex gap-3 items-center justify-center bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
              >
                <FcGoogle className="text-xl" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;

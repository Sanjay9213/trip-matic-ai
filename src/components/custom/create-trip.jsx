import React, { useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { Input } from "../ui/input";
import { AI_PROMPT, budgetOptions, companionOptions } from "../../constants/option";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { chatSession } from "@/service/AiModal";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [companion, setCompanion] = useState("");
  const { toast } = useToast();

  const handleGenerateTrip = async() => {
    if ((!days || days <= 0 || days > 10) || !place || !budget || !companion) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please enter correct details.",
      });
      return;
    }
    const Final_prompt = AI_PROMPT.replace('{location}', place?.formatted_address)
    .replace('{totalDays}', days)
    .replace('{traveler}', companion)
    .replace('{budget}', budget);

    const result = await chatSession.sendMessage(Final_prompt);
    console.log(result?.response?.text());
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
        onClick={handleGenerateTrip}
        className="mt-12 px-6 py-3 bg-[#4f46e5] hover:bg-[#3b3a99] text-white text-lg font-medium rounded-lg transition duration-300"
      >
        Generate Trip
      </Button>
    </div>
  );
};

export default CreateTrip;

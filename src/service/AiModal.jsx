import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GEMINI_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating , Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50-$100 per night",\n      "hotelImageURL": "https://www.thed.com/assets/images/hero-images/hero-image-home-desktop.jpg",\n      "geoCoordinates": "36.1699, -115.1423",\n      "rating": "3.5 stars",\n      "description": "A budget-friendly hotel located in the heart of Fremont Street, offering a casino, restaurants, and entertainment."\n    },\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$40-$80 per night",\n      "hotelImageURL": "https://media.ihg.com/is/image/ihg/circus-circus-hotel-casino-las-vegas-exterior-001?$snl_v1$",\n      "geoCoordinates": "36.1249, -115.1727",\n      "rating": "3 stars",\n      "description": "A classic Las Vegas hotel known for its circus-themed attractions, including the Adventuredome indoor theme park."\n    },\n    {\n      "hotelName": "Golden Nugget Hotel & Casino",\n      "hotelAddress": "129 E Fremont St, Las Vegas, NV 89101",\n      "price": "$60-$120 per night",\n      "hotelImageURL": "https://images.trvl-media.com/hotels/2000000/1948000/1947500/1947436/1947436_60_b.jpg",\n      "geoCoordinates": "36.1698, -115.1423",\n      "rating": "4 stars",\n      "description": "A historic hotel on Fremont Street with a casino, pool, and the famous Shark Tank."\n    },\n    {\n      "hotelName": "The Strat Hotel, Casino & SkyPod",\n      "hotelAddress": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",\n      "price": "$70-$150 per night",\n      "hotelImageURL": "https://www.thestrat.com/media/images/header-home.jpg",\n      "geoCoordinates": "36.1143, -115.1667",\n      "rating": "3.5 stars",\n      "description": "A towering hotel with a casino, restaurants, and the thrilling SkyPod observation deck."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "bestTime": "Morning",\n      "plan": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A vibrant pedestrian mall with live entertainment, shops, and restaurants.",\n          "placeImageURL": "https://www.vegasexperience.com/wp-content/uploads/2022/03/Fremont-Street-Experience-Las-Vegas-1024x683.jpg",\n          "geoCoordinates": "36.1698, -115.1423",\n          "ticketPricing": "Free",\n          "timeToTravel": "2-3 hours"\n        },\n        {\n          "placeName": "Golden Nugget",\n          "placeDetails": "A historic hotel and casino with the famous Shark Tank.",\n          "placeImageURL": "https://images.trvl-media.com/hotels/2000000/1948000/1947500/1947436/1947436_60_b.jpg",\n          "geoCoordinates": "36.1698, -115.1423",\n          "ticketPricing": "Free (casino)",\n          "timeToTravel": "1 hour"\n        },\n        {\n          "placeName": "Neon Museum",\n          "placeDetails": "A museum dedicated to the iconic neon signs of Las Vegas.",\n          "placeImageURL": "https://www.neonmuseum.org/wp-content/uploads/2018/04/DSC_0061-768x512.jpg",\n          "geoCoordinates": "36.1720, -115.1497",\n          "ticketPricing": "$20",\n          "timeToTravel": "1.5 hours"\n        }\n      ]\n    },\n    "day2": {\n      "bestTime": "Afternoon",\n      "plan": [\n        {\n          "placeName": "Bellagio Fountains",\n          "placeDetails": "World-famous dancing fountains with a mesmerizing water show.",\n          "placeImageURL": "https://www.bellagio.com/content/dam/mgmresorts/bellagio/images/hero/Bellagio-Fountain-Show.jpg",\n          "geoCoordinates": "36.1170, -115.1736",\n          "ticketPricing": "Free",\n          "timeToTravel": "30 minutes"\n        },\n        {\n          "placeName": "The Strip",\n          "placeDetails": "The famous Las Vegas Boulevard with world-class casinos, hotels, and entertainment.",\n          "placeImageURL": "https://www.visitlasvegas.com/sites/default/files/styles/large_hero/public/2018-06/LAS_Strip_Night_1050.jpg?itok=4f_43_W5",\n          "geoCoordinates": "36.1148, -115.1723",\n          "ticketPricing": "Free",\n          "timeToTravel": "3-4 hours"\n        },\n        {\n          "placeName": "LINQ Promenade",\n          "placeDetails": "A lively outdoor shopping and dining area with the High Roller observation wheel.",\n          "placeImageURL": "https://www.caesars.com/content/dam/caesars/linq/images/hero/HighRoller-hero.jpg",\n          "geoCoordinates": "36.1114, -115.1710",\n          "ticketPricing": "High Roller: $30",\n          "timeToTravel": "2 hours"\n        }\n      ]\n    },\n    "day3": {\n      "bestTime": "Morning",\n      "plan": [\n        {\n          "placeName": "Red Rock Canyon National Conservation Area",\n          "placeDetails": "A scenic desert landscape with hiking trails and rock formations.",\n          "placeImageURL": "https://www.nps.gov/redr/learn/nature/images/red-rock-canyon-rock-formation.jpg",\n          "geoCoordinates": "36.1454, -115.3293",\n          "ticketPricing": "$15 per vehicle",\n          "timeToTravel": "3-4 hours"\n        },\n        {\n          "placeName": "Hoover Dam",\n          "placeDetails": "A historic dam and engineering marvel on the Colorado River.",\n          "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Hoover_Dam_%282014%29.jpg/1280px-Hoover_Dam_%282014%29.jpg",\n          "geoCoordinates": "36.0003, -114.9680",\n          "ticketPricing": "Free (dam viewing), $30 (tour)",\n          "timeToTravel": "3-4 hours"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Explanation:**\n\n* **hotelOptions:** This section provides a list of budget-friendly hotels in Las Vegas with information like name, address, price range, image URL, coordinates, rating, and a brief description.\n* **itinerary:** This section outlines a 3-day itinerary for a couple traveling on a budget. Each day has a suggested best time to visit and a plan with places to visit, details, image URLs, ticket pricing, and estimated travel time.\n\n**Note:**\n\n* Prices are estimates and can fluctuate depending on season and availability.\n* Travel times are approximate and can vary depending on traffic and transportation.\n* This itinerary is just a suggestion, and you can customize it based on your interests and preferences.\n* You can use Google Maps or other navigation apps to find directions and estimated travel times.\n* You can also find more information about each location on their websites.\n\n**Remember to book accommodations and attractions in advance, especially if traveling during peak season.**\n\nEnjoy your budget-friendly trip to Las Vegas!\n',
        },
      ],
    },
  ],
});


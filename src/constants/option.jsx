
import { FaMoneyBillWave, FaBalanceScale, FaGem, FaPlane, FaHome, FaUsers, FaGlassCheers, FaShip } from 'react-icons/fa';

export const budgetOptions = [
    { label: 'Cheap', icon: <FaMoneyBillWave />, description: 'Stay conscious of costs' },
    { label: 'Moderate', icon: <FaBalanceScale />, description: 'Keep cost on the average side' },
    { label: 'Luxury', icon: <FaGem />, description: 'Don\'t worry about cost' },
  ];

  export const companionOptions = [
    { label: 'Just Me', icon: <FaPlane />, description: 'A solo traveler in exploration' },
    { label: 'A Couple', icon: <FaGlassCheers />, description: 'Two travelers in tandem' },
    { label: 'Family', icon: <FaHome />, description: 'A group of fun-loving adventurers' },
    { label: 'Friends', icon: <FaShip />, description: 'A bunch of thrill-seekers' },
  ];

  export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest list of itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating , Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format."
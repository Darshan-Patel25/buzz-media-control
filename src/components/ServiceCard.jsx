import React, { useState } from "react";
import GPSLocation from "./GPSLocation"; // Importing the GPSLocation component

const ServiceCard = ({ serviceLat, serviceLng }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleViewMap = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        console.error("Error getting user location:", error);
        alert(`Error: ${error.message}`);
        setLoading(false);
      }
    );
  };

  return (
    <div className="w-full h-24 pl-6 pt-3 pb-3 pr-6 bg-gray-300 m-1 rounded-lg shadow flex items-center justify-between">
      {/* Left Section: Name and Status */}
      <div>
        <h2 className="text-xl font-semibold text-black">Courier Service</h2>
        <p className="text-gray-600">
          Status: <span className="font-medium text-green-600">Active</span>
        </p>
      </div>

      {/* Middle Section: Service Type */}
      <div className="text-gray-600 text-center ">
        <p>Service Type:</p>
        <span className="font-medium text-black">Express Delivery</span>
      </div>

      {/* Right Section: Button */}
      <button
        onClick={handleViewMap}
        className="w-40 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        disabled={loading}
      >
        {loading ? "Locating..." : "View on Map"}
      </button>

      {/* Show GPSLocation when location is available */}
      {location && (
        <GPSLocation
          userLat={location.lat}
          userLng={location.lng}
          serviceLat={serviceLat}
          serviceLng={serviceLng}
        />
      )}
    </div>
  );
};

export default ServiceCard;

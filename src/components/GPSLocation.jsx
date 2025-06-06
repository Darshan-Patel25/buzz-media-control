import React from "react";

const GPSLocation = ({ userLat, userLng, serviceLat, serviceLng }) => {
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_GOOGLE_MAPS_API_KEY&origin=${userLat},${userLng}&destination=${serviceLat},${serviceLng}&mode=driving`;

  return (
    <div className="w-full h-[400px] mt-4">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.508738720333!2d72.9197306!3d22.5600683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e1285d628d5%3A0xe6cee346bfaa35d0!2sG%20H%20Patel%20College%20of%20Engineering%20%26%20Technology!5e0!3m2!1sgu!2sin!4v1743533257291!5m2!1sgu!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  );
};

export default GPSLocation;

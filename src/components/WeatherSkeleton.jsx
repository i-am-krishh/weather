import React from "react";
import { motion } from "framer-motion";
import { FaWind, FaTint, FaCloud, FaTemperatureHigh, FaCompress, FaEye } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const convertTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-32 flex justify-center"
    >
      <div className="glass-card p-6 rounded-3xl shadow-2xl text-white w-96 backdrop-blur-xl bg-white/10 border border-white/20">
        
        {/* City & Weather Icon */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{data.city}, {data.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt="weather-icon"
            className="w-16"
          />
        </div>

        {/* Temp */}
        <div className="flex items-center justify-center mb-4">
          <FaTemperatureHigh size={30} />
          <span className="text-5xl font-bold ml-3">{data.temp}°C</span>
        </div>
        <p className="text-center text-lg opacity-90 capitalize mb-6">
          {data.weather} | Feels like {data.feels_like}°C
        </p>

        {/* Weather Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
            <FaTint className="mx-auto mb-1" />
            <p className="font-medium">{data.humidity}%</p>
            <p className="text-xs opacity-80">Humidity</p>
          </div>

          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
            <FaWind className="mx-auto mb-1" />
            <p className="font-medium">{data.wind} m/s</p>
            <p className="text-xs opacity-80">Wind</p>
          </div>

          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
            <FaCompress className="mx-auto mb-1" />
            <p className="font-medium">{data.pressure} hPa</p>
            <p className="text-xs opacity-80">Pressure</p>
          </div>

          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
            <FaEye className="mx-auto mb-1" />
            <p className="font-medium">{data.visibility / 1000} km</p>
            <p className="text-xs opacity-80">Visibility</p>
          </div>
        </div>

        {/* Clouds, Min/Max */}
        <div className="flex justify-between text-sm opacity-90 mb-4">
          <span>Clouds: {data.clouds}%</span>
          <span>Min: {data.min}°C</span>
          <span>Max: {data.max}°C</span>
        </div>

        {/* Sunrise / Sunset */}
        <div className="flex justify-between items-center mt-3">
          <div className="text-center">
            <WiSunrise size={34} className="mx-auto" />
            <p className="text-sm mt-1">{convertTime(data.sunrise)}</p>
          </div>
          <div className="text-center">
            <WiSunset size={34} className="mx-auto" />
            <p className="text-sm mt-1">{convertTime(data.sunset)}</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default WeatherCard;

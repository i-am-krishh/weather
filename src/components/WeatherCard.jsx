import React from "react";
import { motion } from "framer-motion";
import {
  FaWind,
  FaTint,
  FaCloudSun,
  FaTemperatureHigh,
  FaEye,
  FaCompress,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

/**
 * WeatherCard Component - Displays detailed weather information
 * @param {Object} data - Weather data object from API
 */
const WeatherCard = ({ data }) => {
  // Show placeholder if no weather data
  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen"
      >
        <p className="text-white text-xl">Search for a city to see weather details</p>
      </motion.div>
    );
  }

  // Framer Motion animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  /**
   * Formats Unix timestamp to readable time format
   * @param {number} timestamp - Unix timestamp in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  /**
   * Formats Unix timestamp to readable date format
   * @param {number} timestamp - Unix timestamp in seconds
   * @returns {string} Formatted date string
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /**
   * Returns emoji icon based on weather condition
   * @param {string} main - Main weather condition from API
   * @returns {string} Emoji icon for the condition
   */
  const getWeatherIcon = (main) => {
    switch (main?.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧️";
      case "drizzle":
        return "🌦️";
      case "thunderstorm":
        return "⛈️";
      case "snow":
        return "❄️";
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
      case "sand":
      case "ash":
      case "squall":
      case "tornado":
        return "🌫️";
      default:
        return "🌤️";
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-20 pb-10 px-4"
      id="weather-results"
    >
      {/* Main Weather Card */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 rounded-3xl shadow-2xl p-8 text-white mb-8 backdrop-blur-xl"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Section - Main Weather Information */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              {/* City Name and Location */}
              <div className="flex items-center gap-3 mb-4">
                <FaMapMarkerAlt size={20} className="text-yellow-300" />
                <h1 className="text-5xl font-bold">{data.name}</h1>
              </div>

              {/* Current Date */}
              <p className="text-blue-100 mb-6 flex items-center gap-2">
                <FaClock size={16} />
                {formatDate(data.dt)}
              </p>

              {/* Large Temperature Display with Weather Icon */}
              <div className="flex items-center gap-6 mb-8">
                <div className="text-8xl">{getWeatherIcon(data.weather)}</div>
                <div>
                  <div className="text-7xl font-bold">{Math.round(data.temp)}°</div>
                  <p className="text-2xl text-blue-100 capitalize">{data.weather}</p>
                </div>
              </div>

              {/* Feels Like Temperature */}
              <div className="bg-white/50 bg-opacity-10 rounded-2xl p-4 backdrop-blur-md">
                <p className="text-sm text-blue-100 mb-2">Feels Like</p>
                <p className="text-4xl font-bold">{Math.round(data.feels_like)}°C</p>
              </div>
            </motion.div>

            {/* Right Section - Key Weather Statistics Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {/* Humidity Card */}
              <div className="bg-white/80 bg-opacity-10 rounded-2xl p-6 backdrop-blur-md hover:bg-opacity-20 transition">
                <div className="flex items-center gap-3 mb-3">
                  <FaTint className="text-blue-500 text-2xl" />
                  <p className="text-blue-500 text-sm">Humidity</p>
                </div>
                <p className="text-blue-500 text-4xl font-bold text-center">{data.humidity}%</p>
              </div>

              {/* Wind Speed Card */}
              <div className="bg-white/80 bg-opacity-10 rounded-2xl p-6 backdrop-blur-md hover:bg-opacity-20 transition">
                <div className="flex items-center gap-3 mb-3">
                  <FaWind className="text-cyan-500 text-2xl" />
                  <p className="text-cyan-500 text-sm">Wind Speed</p>
                </div>
                <p className="text-cyan-500 text-4xl font-bold text-center">{Math.round(data.wind_speed)} m/s</p>
              </div>

              {/* Atmospheric Pressure Card */}
              <div className="bg-white/80 bg-opacity-10 rounded-2xl p-6 backdrop-blur-md hover:bg-opacity-20 transition">
                <div className="flex items-center gap-3 mb-3">
                  <FaCompress className="text-purple-500 text-2xl" />
                  <p className="text-purple-500 text-sm">Pressure</p>
                </div>
                <p className="text-purple-500 text-4xl font-bold text-center">{data.pressure} hPa</p>
              </div>

              {/* Visibility Card */}
              <div className="bg-white/80 bg-opacity-10 rounded-2xl p-6 backdrop-blur-md hover:bg-opacity-20 transition">
                <div className="flex items-center gap-3 mb-3">
                  <FaEye className="text-orange-500 text-2xl" />
                  <p className="text-orange-500 text-sm">Visibility</p>
                </div>
                <p className="text-orange-500 text-4xl font-bold text-center">{(data.visibility / 1000).toFixed(1)} km</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Weather Details Grid */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Temperature Range Card */}
          <div className="bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white backdrop-blur-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaTemperatureHigh size={20} />
              Temperature
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Max Temp</span>
                <span className="text-2xl font-bold text-red-200">{Math.round(data.temp_max)}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Min Temp</span>
                <span className="text-2xl font-bold text-blue-200">{Math.round(data.temp_min)}°C</span>
              </div>
              <div className="border-t border-white border-opacity-30 pt-3 flex justify-between items-center">
                <span className="text-sm opacity-90">Current</span>
                <span className="text-2xl font-bold text-yellow-200">{Math.round(data.temp)}°C</span>
              </div>
            </div>
          </div>

          {/* Atmosphere Conditions Card */}
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg p-6 text-white backdrop-blur-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaCloudSun size={20} />
              Atmosphere
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Cloud Coverage</span>
                <span className="text-2xl font-bold text-cyan-200">{data.clouds}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Visibility</span>
                <span className="text-xl font-bold text-cyan-200">{(data.visibility / 1000).toFixed(1)} km</span>
              </div>
              <div className="border-t border-white border-opacity-30 pt-3 flex justify-between items-center">
                <span className="text-sm opacity-90">Sea Level</span>
                <span className="text-2xl font-bold text-blue-200">{data.sea_level} hPa</span>
              </div>
            </div>
          </div>

          {/* Wind and Pressure Details Card */}
          <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl shadow-lg p-6 text-white backdrop-blur-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaWind size={20} />
              Wind & Pressure
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Wind Speed</span>
                <span className="text-2xl font-bold text-cyan-200">{Math.round(data.wind_speed)} m/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Wind Direction</span>
                <span className="text-2xl font-bold text-yellow-200">{data.wind_deg}°</span>
              </div>
              <div className="border-t border-white border-opacity-30 pt-3 flex justify-between items-center">
                <span className="text-sm opacity-90">Pressure</span>
                <span className="text-2xl font-bold text-purple-200">{data.pressure} hPa</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Location Coordinates and Local Time */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Location Details</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Latitude Information */}
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-300 text-xl" />
              <div>
                <p className="text-sm opacity-90">Latitude</p>
                <p className="text-lg font-bold">{data.latitude?.toFixed(4)}</p>
              </div>
            </div>

            {/* Longitude Information */}
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-300 text-xl" />
              <div>
                <p className="text-sm opacity-90">Longitude</p>
                <p className="text-lg font-bold">{data.longitude?.toFixed(4)}</p>
              </div>
            </div>

            {/* Local Time Information */}
            <div className="flex items-center gap-3">
              <FaClock className="text-yellow-300 text-xl" />
              <div>
                <p className="text-sm opacity-90">Local Time</p>
                <p className="text-lg font-bold">{formatTime(data.dt)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
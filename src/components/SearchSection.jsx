import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";

/**
 * SearchSection Component - Main search interface with city suggestions
 * @param {Function} onSearch - Callback for search submission
 * @param {Boolean} loading - Loading state indicator
 */
const SearchSection = ({ onSearch, loading }) => {
  // Input field state
  const [city, setCity] = useState("");
  // Filtered city suggestions state
  const [suggestions, setSuggestions] = useState([]);
  // Show/hide suggestions dropdown
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Comprehensive list of world cities for autocomplete suggestions
  const worldCities = [
    { name: "Mumbai", flag: "🇮🇳" },
    { name: "Delhi", flag: "🇮🇳" },
    { name: "Bangalore", flag: "🇮🇳" },
    { name: "Kolkata", flag: "🇮🇳" },
    { name: "Chennai", flag: "🇮🇳" },
    { name: "Hyderabad", flag: "🇮🇳" },
    { name: "Pune", flag: "🇮🇳" },
    { name: "Ahmedabad", flag: "🇮🇳" },
    { name: "London", flag: "🇬🇧" },
    { name: "Manchester", flag: "🇬🇧" },
    { name: "Liverpool", flag: "🇬🇧" },
    { name: "Birmingham", flag: "🇬🇧" },
    { name: "New York", flag: "🇺🇸" },
    { name: "Los Angeles", flag: "🇺🇸" },
    { name: "Chicago", flag: "🇺🇸" },
    { name: "Houston", flag: "🇺🇸" },
    { name: "Phoenix", flag: "🇺🇸" },
    { name: "Philadelphia", flag: "🇺🇸" },
    { name: "San Francisco", flag: "🇺🇸" },
    { name: "Seattle", flag: "🇺🇸" },
    { name: "Miami", flag: "🇺🇸" },
    { name: "Boston", flag: "🇺🇸" },
    { name: "Tokyo", flag: "🇯🇵" },
    { name: "Osaka", flag: "🇯🇵" },
    { name: "Kyoto", flag: "🇯🇵" },
    { name: "Yokohama", flag: "🇯🇵" },
    { name: "Dubai", flag: "🇦🇪" },
    { name: "Abu Dhabi", flag: "🇦🇪" },
    { name: "Paris", flag: "🇫🇷" },
    { name: "Lyon", flag: "🇫🇷" },
    { name: "Marseille", flag: "🇫🇷" },
    { name: "Nice", flag: "🇫🇷" },
    { name: "Sydney", flag: "🇦🇺" },
    { name: "Melbourne", flag: "🇦🇺" },
    { name: "Brisbane", flag: "🇦🇺" },
    { name: "Perth", flag: "🇦🇺" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "Bangkok", flag: "🇹🇭" },
    { name: "Chiang Mai", flag: "🇹🇭" },
    { name: "Berlin", flag: "🇩🇪" },
    { name: "Munich", flag: "🇩🇪" },
    { name: "Hamburg", flag: "🇩🇪" },
    { name: "Cologne", flag: "🇩🇪" },
    { name: "Toronto", flag: "🇨🇦" },
    { name: "Vancouver", flag: "🇨🇦" },
    { name: "Montreal", flag: "🇨🇦" },
    { name: "Calgary", flag: "🇨🇦" },
    { name: "Moscow", flag: "🇷🇺" },
    { name: "Saint Petersburg", flag: "🇷🇺" },
    { name: "Novosibirsk", flag: "🇷🇺" },
    { name: "Beijing", flag: "🇨🇳" },
    { name: "Shanghai", flag: "🇨🇳" },
    { name: "Guangzhou", flag: "🇨🇳" },
    { name: "Chengdu", flag: "🇨🇳" },
    { name: "Hong Kong", flag: "🇭🇰" },
    { name: "Bangkok", flag: "🇹🇭" },
    { name: "Amsterdam", flag: "🇳🇱" },
    { name: "Rotterdam", flag: "🇳🇱" },
    { name: "Madrid", flag: "🇪🇸" },
    { name: "Barcelona", flag: "🇪🇸" },
    { name: "Valencia", flag: "🇪🇸" },
    { name: "Rome", flag: "🇮🇹" },
    { name: "Milan", flag: "🇮🇹" },
    { name: "Venice", flag: "🇮🇹" },
    { name: "Florence", flag: "🇮🇹" },
    { name: "Seoul", flag: "🇰🇷" },
    { name: "Busan", flag: "🇰🇷" },
    { name: "Incheon", flag: "🇰🇷" },
    { name: "Mexico City", flag: "🇲🇽" },
    { name: "Cancun", flag: "🇲🇽" },
    { name: "Monterrey", flag: "🇲🇽" },
    { name: "São Paulo", flag: "🇧🇷" },
    { name: "Rio de Janeiro", flag: "🇧🇷" },
    { name: "Salvador", flag: "🇧🇷" },
    { name: "Buenos Aires", flag: "🇦🇷" },
    { name: "Johannesburg", flag: "🇿🇦" },
    { name: "Cape Town", flag: "🇿🇦" },
    { name: "Cairo", flag: "🇪🇬" },
    { name: "Istanbul", flag: "🇹🇷" },
    { name: "Ankara", flag: "🇹🇷" },
    { name: "Dubai", flag: "🇦🇪" },
    { name: "Bangkok", flag: "🇹🇭" },
    { name: "Phuket", flag: "🇹🇭" },
    { name: "Ho Chi Minh City", flag: "🇻🇳" },
    { name: "Hanoi", flag: "🇻🇳" },
    { name: "Da Nang", flag: "🇻🇳" },
    { name: "Manila", flag: "🇵🇭" },
    { name: "Cebu", flag: "🇵🇭" },
    { name: "Jakarta", flag: "🇮🇩" },
    { name: "Surabaya", flag: "🇮🇩" },
    { name: "Bandung", flag: "🇮🇩" },
    { name: "Kuala Lumpur", flag: "🇲🇾" },
    { name: "Penang", flag: "🇲🇾" },
    { name: "Johor Bahru", flag: "🇲🇾" },
  ];

  // Popular cities for quick access
  const popularCities = [
    { name: "Mumbai", flag: "🇮🇳" },
    { name: "London", flag: "🇬🇧" },
    { name: "New York", flag: "🇺🇸" },
    { name: "Tokyo", flag: "🇯🇵" },
    { name: "Dubai", flag: "🇦🇪" },
    { name: "Paris", flag: "🇫🇷" },
    { name: "Sydney", flag: "🇦🇺" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "Bangkok", flag: "🇹🇭" },
    { name: "Berlin", flag: "🇩🇪" },
    { name: "Toronto", flag: "🇨🇦" },
    { name: "Moscow", flag: "🇷🇺" },
  ];


  /**
   * Handles search form submission
   */
  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity("");
      setShowSuggestions(false);
      setSuggestions([]);
      
      // Auto-scroll to results section
      setTimeout(() => {
        const weatherCard = document.getElementById("weather-results");
        if (weatherCard) {
          weatherCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  };

  /**
   * Handles city selection from suggestions
   * @param {string} cityName - Selected city name
   */
  const handleCityClick = (cityName) => {
    setCity(cityName);
    onSearch(cityName);
    setSuggestions([]);
    setShowSuggestions(false);
    
    // Auto-scroll to results
    setTimeout(() => {
      const weatherCard = document.getElementById("weather-results");
      if (weatherCard) {
        weatherCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);
  };

  /**
   * Handles input change and filters city suggestions
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    // Filter cities based on input
    if (value.length > 0) {
      const filtered = worldCities.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  /**
   * Handles current location detection
   * Uses browser Geolocation and Nominatim reverse geocoding
   */
  const handleCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocoding to get city name
            const nominatimUrl = import.meta.env.VITE_NOMINATIM_URL;
            const res = await fetch(
              `${nominatimUrl}/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const cityName =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "Unknown";

            handleCityClick(cityName);
          } catch (error) {
            console.error("Error getting city name:", error);
            alert("Could not determine city name from coordinates");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Please enable location services to use this feature");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto px-4 pt-20 pb-8"
    >
      {/* Search Bar Section */}
      <motion.div className="mb-12">
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 rounded-3xl shadow-2xl p-8 backdrop-blur-xl relative overflow-visible z-[25]">
          <h2 className="text-white text-3xl font-bold mb-6">Find Weather</h2>

          <div className="flex flex-col md:flex-row gap-4 relative z-[100]">
            {/* Search Input with Autocomplete */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={city}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => city.length > 0 && setShowSuggestions(true)}
                placeholder="Search for a city..."
                className="w-full px-6 py-3 rounded-2xl outline-none text-gray-800 bg-white shadow-lg placeholder-gray-500 focus:ring-4 focus:ring-yellow-300"
              />

              {/* City Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 2 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl z-[9999] overflow-hidden max-h-96 overflow-y-auto border-4 border-yellow-300"
                >
                  {suggestions.slice(0, 20).map((suggestion, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      onClick={() => handleCityClick(suggestion.name)}
                      className="w-full text-left px-6 py-3 text-gray-800 font-medium flex items-center gap-3 hover:bg-gray-100 transition border-b last:border-b-0"
                    >
                      <span className="text-2xl">{suggestion.flag}</span>
                      <span className="font-semibold">{suggestion.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Search Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 transition rounded-2xl font-bold text-gray-900 flex items-center gap-2 shadow-lg"
            >
              <FaSearch size={18} />
              Search
            </motion.button>

            {/* Current Location Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCurrentLocation}
              disabled={loading}
              className="px-8 py-3 bg-green-500 hover:bg-green-600 transition rounded-2xl font-bold text-white flex items-center gap-2 shadow-lg"
            >
              <FaLocationArrow size={18} />
              Current Location
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Popular Cities Quick Access Section */}
      <motion.div className="relative z-[1]">
        <h3 className="text-white text-2xl font-bold mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-yellow-300" />
          Popular Cities
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCities.map((cityData, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCityClick(cityData.name)}
              className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-4 shadow-lg"
            >
              <span className="text-3xl p-2">{cityData.flag}</span>
              <span className="text-sm">{cityData.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchSection;
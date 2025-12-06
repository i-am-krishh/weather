import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";

const Navbar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
    setIsOpen(false);
  };

  const handleCurrentLocation = () => {
    setLoading(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocoding to get city name from coordinates
            const nominatimUrl = import.meta.env.VITE_NOMINATIM_URL;
            const res = await fetch(
              `${nominatimUrl}/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();
            const cityName = data.address?.city || data.address?.town || data.address?.village || "Unknown";
            
            onSearch(cityName);
            setCity("");
            setIsOpen(false);
          } catch (error) {
            console.error("Error getting city name:", error);
            alert("Could not determine city name from coordinates");
          }
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Please enable location services to use this feature");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setLoading(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full top-0 left-0 z-50 backdrop-blur-lg shadow-md border-b border-blue-300 bg-gradient-to-r from-blue-600 to-blue-500"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-white cursor-pointer"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <FaSun size={30} className="text-yellow-300" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-wide">WeatherHub</h1>
        </motion.div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            type="text"
            placeholder="Search city..."
            className="px-4 py-2 rounded-lg outline-none text-black bg-white shadow-sm w-64"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 transition rounded-lg font-medium shadow text-black"
          >
            Search
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCurrentLocation}
            disabled={loading}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 transition rounded-lg font-medium shadow text-white flex items-center gap-2 disabled:opacity-50"
          >
            <FaMapMarkerAlt size={16} />
            {loading ? "Getting location..." : "Current Location"}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-blue-500"
        >
          {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
        </button>
      </div>

      {/* Mobile Search Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-blue-600 bg-opacity-90 px-4 pb-4 space-y-2"
        >
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            type="text"
            placeholder="Search city..."
            className="w-full px-4 py-3 rounded-lg outline-none text-black bg-white shadow-md"
          />
          <button
            onClick={handleSearch}
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold shadow text-black transition"
          >
            Search
          </button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCurrentLocation}
            disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold shadow text-white flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <FaMapMarkerAlt size={18} />
            {loading ? "Getting location..." : "Current Location"}
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

import { useState } from 'react';
import Navbar from "./components/Navbar";
import SearchSection from "./components/SearchSection";
import WeatherCard from "./components/WeatherCard";
import WeatherSkeleton from "./components/WeatherSkeleton";

function App() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    setLoading(true);
    setWeather(null);

    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const baseUrl = import.meta.env.VITE_OPENWEATHER_BASE_URL;
      
      const res = await fetch(
        `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather({
        name: data.name,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        sea_level: data.main.sea_level,
        grnd_level: data.main.grnd_level,
        visibility: data.visibility,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        clouds: data.clouds.all,
        weather: data.weather[0].main,
        weather_description: data.weather[0].description,
        dt: data.dt,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
        country: data.sys.country,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      <Navbar onSearch={fetchWeather} />
      <SearchSection onSearch={fetchWeather} loading={loading} />
      <main className="pt-10">
        {loading ? <WeatherSkeleton /> : <WeatherCard data={weather} />}
      </main>
    </div>
  );
}

export default App;
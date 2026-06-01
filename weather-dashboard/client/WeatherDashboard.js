import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherDashboard.css';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';

function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`/api/weather/current?city=${cityName}`),
        axios.get(`/api/weather/forecast?city=${cityName}`)
      ]);
      setCurrentWeather(currentRes.data);
      setForecast(forecastRes.data.forecast);
      setCity(cityName);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    if (cityName.trim()) {
      fetchWeatherData(cityName);
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const getWeatherBackground = () => {
    if (!currentWeather) return 'clear';
    const description = currentWeather.description.toLowerCase();
    
    if (description.includes('cloud')) return 'cloudy';
    if (description.includes('rain')) return 'rainy';
    if (description.includes('snow')) return 'snowy';
    if (description.includes('storm')) return 'stormy';
    if (description.includes('fog') || description.includes('mist')) return 'foggy';
    return 'clear';
  };

  return (
    <div className={`weather-dashboard ${getWeatherBackground()}`}>
      <div className="weather-container">
        <header className="dashboard-header">
          <h1>🌤️ Weather Dashboard</h1>
          <div className="header-controls">
            <button
              className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => handleUnitChange('metric')}
            >
              °C
            </button>
            <button
              className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => handleUnitChange('imperial')}
            >
              °F
            </button>
          </div>
        </header>

        <SearchBar onSearch={handleSearch} />

        {error && (
          <div className="error-message">
            <p>⚠️ {error}</p>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {currentWeather && (
          <>
            <CurrentWeather weather={currentWeather} unit={unit} />
            {forecast && <Forecast forecast={forecast} unit={unit} />}
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherDashboard;

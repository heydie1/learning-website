const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather by city
router.get('/current', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;
    
    res.json({
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      clouds: data.clouds.all,
      visibility: data.visibility,
      uvIndex: null // requires separate API call
    });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});

// Get 5-day forecast
router.get('/forecast', async (req, res) => {
  try {
    const { city } = req.query;
    
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const forecastData = response.data.list.filter((item, index) => index % 8 === 0);
    
    const forecast = forecastData.map(item => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temp: item.main.temp,
      tempMax: item.main.temp_max,
      tempMin: item.main.temp_min,
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
      pressure: item.main.pressure
    }));

    res.json({
      city: response.data.city.name,
      country: response.data.city.country,
      forecast: forecast
    });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
  }
});

// Get weather by coordinates
router.get('/location', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;
    
    res.json({
      city: data.name,
      country: data.sys.country,
      latitude: data.coord.lon,
      longitude: data.coord.lat,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Search cities
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const response = await axios.get(
      `${BASE_URL}/find?q=${query}&appid=${API_KEY}&units=metric`
    );

    const cities = response.data.list.slice(0, 5).map(item => ({
      id: item.id,
      name: item.name,
      country: item.sys.country,
      latitude: item.coord.lat,
      longitude: item.coord.lon,
      temperature: item.main.temp
    }));

    res.json({ cities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search cities' });
  }
});

module.exports = router;

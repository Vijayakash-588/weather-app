import { useState, useEffect } from 'react';
import { WeatherData, ForecastResponse } from '../types/weather';
import { WeatherService } from '../services/weatherService';

export const useWeather = (lat?: number, lon?: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        WeatherService.getCurrentWeather(latitude, longitude),
        WeatherService.getForecast(latitude, longitude)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      fetchWeatherData(lat, lon);
    }
  }, [lat, lon]);

  return {
    weather,
    forecast,
    loading,
    error,
    refetch: fetchWeatherData
  };
};
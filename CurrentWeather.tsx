import React from 'react';
import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset
} from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherData;
  unit: 'celsius' | 'fahrenheit';
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, unit }) => {
  const convertTemp = (temp: number) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {weather.name}, {weather.country}
          </h2>
          <p className="text-white/80 capitalize text-lg">
            {weather.weather_description}
          </p>
        </div>
        <WeatherIcon icon={weather.weather_icon} size={80} />
      </div>

      <div className="flex items-end mb-8">
        <span className="text-6xl font-thin text-white mr-2">
          {convertTemp(weather.temp)}
        </span>
        <span className="text-2xl text-white/80 mb-2">
          °{unit === 'celsius' ? 'C' : 'F'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center mb-2">
            <Thermometer size={20} className="text-white/80 mr-2" />
            <span className="text-white/80 text-sm">Feels like</span>
          </div>
          <span className="text-white text-xl font-semibold">
            {convertTemp(weather.feels_like)}°
          </span>
        </div>

        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center mb-2">
            <Droplets size={20} className="text-white/80 mr-2" />
            <span className="text-white/80 text-sm">Humidity</span>
          </div>
          <span className="text-white text-xl font-semibold">
            {weather.humidity}%
          </span>
        </div>

        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center mb-2">
            <Wind size={20} className="text-white/80 mr-2" />
            <span className="text-white/80 text-sm">Wind</span>
          </div>
          <span className="text-white text-xl font-semibold">
            {weather.wind_speed} m/s
          </span>
        </div>

        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center mb-2">
            <Gauge size={20} className="text-white/80 mr-2" />
            <span className="text-white/80 text-sm">Pressure</span>
          </div>
          <span className="text-white text-xl font-semibold">
            {weather.pressure} hPa
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Sunrise size={20} className="text-yellow-300 mr-2" />
          <span className="text-white/80 text-sm">
            {formatTime(weather.sunrise)}
          </span>
        </div>
        <div className="flex items-center">
          <Sunset size={20} className="text-orange-300 mr-2" />
          <span className="text-white/80 text-sm">
            {formatTime(weather.sunset)}
          </span>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { ForecastData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface WeatherForecastProps {
  forecast: ForecastData[];
  unit: 'celsius' | 'fahrenheit';
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, unit }) => {
  const convertTemp = (temp: number) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center space-x-4 flex-1">
              <span className="text-white font-medium w-20">
                {getDayName(day.dt)}
              </span>
              <WeatherIcon icon={day.weather[0].icon} size={32} />
              <span className="text-white/80 capitalize flex-1">
                {day.weather[0].description}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-white font-semibold">
                  {convertTemp(day.temp.max)}°
                </div>
                <div className="text-white/60 text-sm">
                  {convertTemp(day.temp.min)}°
                </div>
              </div>
              
              <div className="text-white/60 text-sm w-12 text-right">
                {Math.round(day.pop * 100)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
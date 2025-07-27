import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudDrizzle,
  Eye,
  EyeOff
} from 'lucide-react';

interface WeatherIconProps {
  icon: string;
  size?: number;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  icon, 
  size = 64, 
  className = '' 
}) => {
  const getIcon = () => {
    const iconCode = icon.slice(0, 2);
    const isDay = icon.slice(-1) === 'd';
    
    switch (iconCode) {
      case '01': // clear sky
        return <Sun size={size} className={`${className} text-yellow-400`} />;
      case '02': // few clouds
      case '03': // scattered clouds
      case '04': // broken clouds
        return <Cloud size={size} className={`${className} text-gray-400`} />;
      case '09': // shower rain
      case '10': // rain
        return <CloudRain size={size} className={`${className} text-blue-400`} />;
      case '11': // thunderstorm
        return <Zap size={size} className={`${className} text-purple-400`} />;
      case '13': // snow
        return <CloudSnow size={size} className={`${className} text-blue-200`} />;
      case '50': // mist
        return isDay ? 
          <Eye size={size} className={`${className} text-gray-300`} /> :
          <EyeOff size={size} className={`${className} text-gray-400`} />;
      default:
        return <Sun size={size} className={`${className} text-yellow-400`} />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getIcon()}
    </div>
  );
};
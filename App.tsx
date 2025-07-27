import { useState, useEffect } from 'react';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherForecast } from './components/WeatherForecast';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useWeather } from './hooks/useWeather';
import { ToggleLeft, ToggleRight, RefreshCw } from 'lucide-react';

function App() {
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);
  const [unit, setUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const { weather, forecast, loading, error, refetch } = useWeather(
    coordinates?.lat, 
    coordinates?.lon
  );

  useEffect(() => {
    // Get user's location on app load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        () => {
          // Fallback to Theni, Tamil Nadu
          setCoordinates({ lat: 10.0104, lon: 77.4977 });
        }
      );
    } else {
      setCoordinates({ lat: 10.0104, lon: 77.4977 });
    }
  }, []);

  const handleLocationSelect = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  const toggleUnit = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const handleRefresh = () => {
    if (coordinates) {
      refetch(coordinates.lat, coordinates.lon);
    }
  };

  const getBackgroundGradient = () => {
    if (!weather) return 'from-blue-400 to-blue-600';
    
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour > 18;
    
    switch (weather.weather_main.toLowerCase()) {
      case 'clear':
        return isNight 
          ? 'from-indigo-900 via-purple-900 to-pink-800'
          : 'from-yellow-400 via-orange-400 to-pink-400';
      case 'clouds':
        return isNight
          ? 'from-gray-800 via-gray-700 to-gray-600'
          : 'from-gray-400 via-gray-500 to-gray-600';
      case 'rain':
      case 'drizzle':
        return 'from-gray-600 via-blue-700 to-indigo-800';
      case 'thunderstorm':
        return 'from-gray-900 via-purple-900 to-indigo-900';
      case 'snow':
        return 'from-blue-200 via-blue-300 to-blue-400';
      case 'mist':
      case 'fog':
        return 'from-gray-300 via-gray-400 to-gray-500';
      default:
        return isNight
          ? 'from-indigo-900 to-purple-900'
          : 'from-blue-400 to-blue-600';
    }
  };

  if (loading && !weather) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-400 to-blue-600`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center`}>
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={handleRefresh}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-2xl backdrop-blur-lg border border-white/20 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">WeatherPro</h1>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw size={20} className={`text-white ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchBar onLocationSelect={handleLocationSelect} loading={loading} />
            
            <button
              onClick={toggleUnit}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-lg border border-white/20 transition-all duration-300"
            >
              {unit === 'celsius' ? (
                <>
                  <span className="text-white font-medium">°C</span>
                  <ToggleLeft size={20} className="text-white" />
                </>
              ) : (
                <>
                  <ToggleRight size={20} className="text-white" />
                  <span className="text-white font-medium">°F</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Weather Content */}
        {weather && forecast && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CurrentWeather weather={weather} unit={unit} />
            </div>
            
            <div className="lg:col-span-1">
              <WeatherForecast forecast={forecast.list} unit={unit} />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            Weather data provided by OpenWeatherMap API
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
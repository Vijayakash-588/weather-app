import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { WeatherService } from '../services/weatherService';

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface SearchBarProps {
  onLocationSelect: (lat: number, lon: number) => void;
  loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect, loading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setSearchLoading(true);
    try {
      const cities = await WeatherService.searchCity(searchQuery);
      setSuggestions(cities);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCitySelect = (city: City) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    onLocationSelect(city.lat, city.lon);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to default location (Theni, Tamil Nadu)
          onLocationSelect(10.0104, 77.4977);
        }
      );
    } else {
      // Fallback to default location
      onLocationSelect(10.0104, 77.4977);
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {searchLoading ? (
            <Loader2 size={20} className="text-white/60 animate-spin" />
          ) : (
            <Search size={20} className="text-white/60" />
          )}
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search for a city..."
          className="w-full pl-12 pr-12 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
          disabled={loading}
        />
        
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-white transition-colors duration-300 disabled:opacity-50"
        >
          <MapPin size={20} />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50">
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => handleCitySelect(city)}
              className="w-full px-4 py-3 text-left hover:bg-white/20 transition-colors duration-200 text-gray-800 hover:text-gray-900"
            >
              <div className="font-medium">{city.name}</div>
              <div className="text-sm text-gray-600">{city.country}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
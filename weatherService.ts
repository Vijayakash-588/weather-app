const API_KEY = '286b764021cdc71b2bf5aac49ecb0efb'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://username.github.io/repository-name/';

export class WeatherService {
  static async getCurrentWeather(lat: number, lon: number) {
    // For demo purposes, return mock data using lat and lon
    return {
      name: 'Theni',
      country: 'IN',
      temp: 22 + lat * 0.01,
      feels_like: 25 + lat * 0.01,
      temp_min: 18 + lat * 0.01,
      temp_max: 26 + lat * 0.01,
      humidity: 65,
      pressure: 1013,
      visibility: 10000,
      wind_speed: 3.5,
      wind_deg: 230,
      weather_main: 'Clear',
      weather_description: 'clear sky',
      weather_icon: '01d',
      sunrise: Date.now() / 1000 - 3600,
      sunset: Date.now() / 1000 + 7200,
      timezone: -14400,
    };
  }

  static async getForecast(lat: number, lon: number) {
    // For demo purposes, return mock forecast data
    const mockForecast = [];
    for (let i = 0; i < 5; i++) {
      mockForecast.push({
        dt: Date.now() / 1000 + (i * 24 * 3600),
        temp: {
          day: 22 + Math.random() * 10 + lat * 0.01,
          min: 15 + Math.random() * 5 + lat * 0.01,
          max: 25 + Math.random() * 8 + lat * 0.01,
          night: 18 + Math.random() * 4 + lat * 0.01,
          eve: 20 + Math.random() * 5 + lat * 0.01,
          morn: 16 + Math.random() * 4 + lat * 0.01,
        },
        feels_like: {
          day: 24 + Math.random() * 8 + lat * 0.01,
          night: 20 + Math.random() * 4 + lat * 0.01,
          eve: 22 + Math.random() * 5 + lat * 0.01,
          morn: 18 + Math.random() * 4 + lat * 0.01,
        },
        pressure: 1010 + Math.random() * 20 + lat * 0.01,
        humidity: 50 + Math.random() * 30 + lat * 0.01,
        weather: [{
          id: 800,
          main: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
          description: 'clear sky',
          icon: ['01d', '02d', '10d'][Math.floor(Math.random() * 3)],
        }],
        speed: 2 + Math.random() * 5 + lat * 0.01,
        deg: Math.random() * 360,
        gust: 3 + Math.random() * 7 + lat * 0.01,
        clouds: Math.random() * 100,
        pop: Math.random() * 0.8,
      });
    }

    return {
      city: {
        name: 'Theni',
        country: 'IN',
        timezone: -14400,
      },
      list: mockForecast,
    };
  }

  static async searchCity(query: string) {
    // Mock city search results
    return [
      { name: 'Theni', country: 'IN', lat: 10.0104, lon: 77.4977 },
      { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
      { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
      { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
    ].filter(city => 
      city.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
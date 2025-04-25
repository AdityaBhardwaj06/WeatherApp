// weatherStore.js
import { create } from 'zustand';
import { MY_API_KEY } from '../../utils/WeatherAPIKey';
const API_KEY = MY_API_KEY;

const useWeatherStore = create((set) => ({
  weather: null,
  loading: false,
  error: null,
  lastUpdated: null,

  // Fetch weather by coordinates
  fetchWeather: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather');
      }
      const data = await response.json();
      console.log(data)
      set({
        weather: {
          temp: data.main.temp,
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure,
          city: data.name, // <-- use 'city' in BOTH functions
        },
        lastUpdated: new Date().toISOString(),
        loading: false,
        error: null,
      });
      
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Optionally, fetch weather by city name
  fetchWeatherByCity: async (city) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather');
      }
      const data = await response.json();
      set({
        weather: {
          temp: data.main.temp,
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          city: data.name, // <-- use 'city' in BOTH functions
        },
        lastUpdated: new Date().toISOString(),
        loading: false,
        error: null,
      });

    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useWeatherStore;

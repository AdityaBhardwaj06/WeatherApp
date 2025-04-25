import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useWeatherStore = create(
  persist(
    (set) => ({
      location: null,
      weather: null,
      error: null,
      loading: false,
      fetchWeather: async (coords) => {
        set({ loading: true, error: null });
        try {
          const apiKey = 'YOUR_OPENWEATHER_API_KEY';
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`
          );
          const data = await response.json();
          set({
            location: {
              lat: coords.latitude,
              lon: coords.longitude,
              city: data.name,
            },
            weather: {
              temp: data.main.temp,
              condition: data.weather[0].main,
              icon: data.weather[0].icon,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              updatedAt: new Date().toISOString(),
            },
            loading: false,
          });
        } catch (error) {
          set({ error: 'Failed to fetch weather', loading: false });
        }
      },
    }),
    {
      name: 'weather-storage',
      getStorage: () => AsyncStorage,
    }
  )
);

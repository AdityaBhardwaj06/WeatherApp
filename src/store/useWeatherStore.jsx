import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MY_API_KEY } from "../utils/WeatherAPIKey";
const API_KEY = MY_API_KEY;

function getLocalDateParts(dt, timezone) {
  // dt and timezone are in seconds, JavaScript Date expects ms
  const utcMilliseconds = dt * 1000;
  const offsetMilliseconds = timezone * 1000;
  const localMilliseconds = utcMilliseconds + offsetMilliseconds;
  const date = new Date(localMilliseconds);

  // Extract parts
  return {
    day: date.getUTCDate(),
    month: date.toLocaleString("default", { month: "long", timeZone: "UTC" }),
    monthNum: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    iso: date.toISOString(),
    formattedDate: `${date.getUTCDate()} ${date.toLocaleString("default", {
      month: "short",
      timeZone: "UTC",
    })} ${date.getUTCFullYear()}`,
  };
}

const useWeatherStore = create((set) => ({
  weather: null,
  loading: false,
  error: null,
  lastUpdated: null, // { day, month, year, hour, minute, second, ... }
  // Load last weather from AsyncStorage
  loadLastWeather: async () => {
    try {
      const lastWeatherStr = await AsyncStorage.getItem("@last_weather");
      if (lastWeatherStr) {
        const { weather, lastUpdated } = JSON.parse(lastWeatherStr);
        set({
          weather,
          lastUpdated,
          loading: false,
          error: null,
        });
        return weather?.city;
      }
    } catch (e) {
      // Optionally handle error
    }
    return null;
  },

  // Set weather directly (for restoring from storage)
  setWeather: (weatherObj, lastUpdatedObj) =>
    set({
      weather: weatherObj,
      lastUpdated: lastUpdatedObj,
      loading: false,
      error: null,
    }),

  // Fetch weather by coordinates
  fetchWeather: async (lat, lon) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather");
      }
      const data = await response.json();
      const lastUpdated = getLocalDateParts(data.dt, data.timezone);
      const weatherObj = {
        temp: data.main.temp,
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        city: data.name,
      };

      set({
        weather: weatherObj,
        lastUpdated,
        loading: false,
        error: null,
      });

      // Save last city and weather to AsyncStorage
      await AsyncStorage.setItem("@last_city", data.name);
      await AsyncStorage.setItem(
        "@last_weather",
        JSON.stringify({
          weather: weatherObj,
          lastUpdated,
        })
      );
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch weather by city name
  fetchWeatherByCity: async (city) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather");
      }
      const data = await response.json();
      const lastUpdated = getLocalDateParts(data.dt, data.timezone);
      const weatherObj = {
        temp: data.main.temp,
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        city: data.name,
      };

      set({
        weather: weatherObj,
        lastUpdated,
        loading: false,
        error: null,
      });

      // Save last city and weather to AsyncStorage
      await AsyncStorage.setItem("@last_city", data.name);
      await AsyncStorage.setItem(
        "@last_weather",
        JSON.stringify({
          weather: weatherObj,
          lastUpdated,
        })
      );
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useWeatherStore;

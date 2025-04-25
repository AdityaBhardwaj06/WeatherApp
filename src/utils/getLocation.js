// import { create } from "zustand";
// import { API_KEY, API_KEY, API_KEY } from "./WeatherAPIKey";

// // utils/getWeather.js
// export const getWeatherByCity = async (city) => {
//     const API_KEY = API_KEY; 
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.cod && data.cod !== 200) {
//         throw new Error(data.message || 'Failed to fetch weather data');
//       }
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const getWeatherByCoords = async (lat, lon) => {
//     const API_KEY = API_KEY;
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.cod && data.cod !== 200) {
//         throw new Error(data.message || 'Failed to fetch weather data');
//       }
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };
  



  import * as Location from 'expo-location';

export const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission denied');
  }
  return await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
};


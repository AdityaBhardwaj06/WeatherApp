import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useWeatherStore } from '../store';
import { getLocation } from '../utils/getLocation';

export default function WeatherScreen() {
  const { location, weather, error, loading, fetchWeather } = useWeatherStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const location = await getLocation();
        await fetchWeather(location.coords);
      } catch (err) {
        // Handle error or redirect to city search
      }
    };
    loadData();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>{location?.city}</Text>
      <Text>Temperature: {weather?.temp}°C</Text>
      <Text>Humidity: {weather?.humidity}%</Text>
      <Text>Wind Speed: {weather?.windSpeed} m/s</Text>
    </View>
  );
}

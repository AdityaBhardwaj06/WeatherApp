import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import useLocationStore from "../../../store/useLocationStore";
import FetchLocation from "../../../utils/FetchLocation";
import useWeatherStore from "../../../store/useWeatherStore";

export default function Page() {
  const headerHeight = useHeaderHeight();
  const { latitude, longitude, success } = useLocationStore();
  const { weather, lastUpdated, fetchWeather, fetchWeatherByCity } = useWeatherStore();
  const [refreshing, setRefreshing] = useState(false);

  // State for background image
  const [backgroundImage, setBackgroundImage] = useState(require("C:/Users/Asus/WeatherApp/src/assets/clouds.jpeg"));

  // Change background image based on weather condition
  useEffect(() => {
    if (weather && weather.condition) {
      switch (weather.condition.toLowerCase()) {
        case "clear":
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/clear.jpg"));
          break;
        case "haze":
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/haze.jpg"));
          break;
        case "snow":
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/snow.jpeg"));
          break;
        case "rain":
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/rain.jpeg"));
          break;
        case "clouds":
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/clouds.jpeg"));
          break;
        case "thunderstorm":
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/thunderstorm.jpg"));
          break;
        case "drizzle":
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/drizzle.jpeg"));
          break;
        case "fog":
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/fog.jpeg"));
          break;
        default:
          setBackgroundImage(require("C:/Users/Asus/WeatherApp/src/assets/clear.jpg"));
          break;
      }
    }
  }, [weather]);

  // Fetch weather when page mounts or location changes
  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  // Pull-to-refresh handler: use city name if available, else location
  const onRefresh = async () => {
    setRefreshing(true);
    if (weather && weather.city) {
      await fetchWeatherByCity(weather.city);
    } else if (latitude && longitude) {
      await fetchWeather(latitude, longitude);
    }
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={headerHeight}
        />
      }
    >
      <FetchLocation />
      <ImageBackground
        source={backgroundImage}
        style={[styles.background, { paddingTop: headerHeight }]}
        resizeMode="cover"
      >
        <Text style={styles.date}>
          {lastUpdated ? `${lastUpdated.formattedDate}` : `Loading...`}
        </Text>
        <Text style={styles.bigTemperature}>
          {weather?.temp !== undefined ? Math.floor(weather.temp) : "--"}
        </Text>
        <Text style={styles.date}>{weather?.condition || "Loading..."}</Text>

        <View style={styles.iconRowContainer}>
          <View style={styles.iconItem}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="weather-windy"
                size={22}
                color="#a26b1f"
              />
            </View>
            <Text style={styles.iconLabel}>Wind Speed</Text>
            <Text>
              {weather?.windSpeed !== undefined ? weather.windSpeed : "--"}
            </Text>
          </View>
          <View style={styles.iconItem}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="water" size={22} color="#a26b1f" />
            </View>
            <Text style={styles.iconLabel}>Humidity</Text>
            <Text>
              {weather?.humidity !== undefined ? weather.humidity : "--"}
            </Text>
          </View>
          <View style={styles.iconItem}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="shield-sun"
                size={22}
                color="#a26b1f"
              />
            </View>
            <Text style={styles.iconLabel}>Pressure</Text>
            <Text>
              {weather?.pressure !== undefined ? weather.pressure : "--"}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#ffe9a7",
  },
  date: {
    fontSize: 18,
    color: "#a26b1f",
    fontWeight: "500",
    marginBottom: 12,
    marginTop: 10,
  },
  bigTemperature: {
    fontSize: 120,
    fontWeight: "bold",
    color: "#3e2c14",
    marginBottom: 10,
    lineHeight: 130,
  },
  iconRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff3cd",
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
    shadowColor: "#a26b1f",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  iconItem: {
    alignItems: "center",
    flex: 1,
  },
  iconCircle: {
    backgroundColor: "#ffe9a7",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  iconLabel: {
    color: "#a26b1f",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 2,
    textAlign: "center",
  },
});

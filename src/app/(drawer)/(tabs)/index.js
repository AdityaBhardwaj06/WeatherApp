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
import { Switch } from "react-native-paper";
import useLocationStore from "../../../store/useLocationStore";
import FetchLocation from "../../../utils/FetchLocation";
import useWeatherStore from "../../../store/useWeatherStore";

const weatherImages = {
  clear: require("../../../assets/clear.jpg"),
  haze: require("../../../assets/haze.jpg"),
  snow: require("../../../assets/snow.jpeg"),
  rain: require("../../../assets/rain.jpeg"),
  clouds: require("../../../assets/clouds.jpeg"),
  thunderstorm: require("../../../assets/thunderstorm.jpg"),
  drizzle: require("../../../assets/drizzle.jpeg"),
  fog: require("../../../assets/fog.jpeg"),
  default: require("../../../assets/clear.jpg"),
};

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export default function Page() {
  const headerHeight = useHeaderHeight();
  const { latitude, longitude } = useLocationStore();
  const {
    weather,
    lastUpdated,
    fetchWeather,
    fetchWeatherByCity,
    loadLastWeather,
  } = useWeatherStore();
  const [refreshing, setRefreshing] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(weatherImages.default);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (weather && weather.condition) {
      const key = weather.condition.toLowerCase();
      setBackgroundImage(weatherImages[key] || weatherImages.default);
    }
  }, [weather]);

  useEffect(() => {
    (async () => {
      const lastCity = await loadLastWeather();
      if (!lastCity && latitude && longitude) {
        fetchWeather(latitude, longitude);
      }
    })();
  }, [latitude, longitude]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (weather && weather.city) {
      await fetchWeatherByCity(weather.city);
    } else if (latitude && longitude) {
      await fetchWeather(latitude, longitude);
    }
    setRefreshing(false);
  };

  const displayTemp = () => {
    if (weather?.temp === undefined) return "--";
    return isCelsius
      ? Math.floor(weather.temp)
      : Math.floor(celsiusToFahrenheit(weather.temp));
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
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <Text style={styles.bigTemperature}>
            {displayTemp()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
            <Text style={{ fontSize: 24, color: "#a26b1f", fontWeight: "bold" }}>
              {isCelsius ? "°C" : "°F"}
            </Text>
            <Switch
              value={!isCelsius}
              onValueChange={() => setIsCelsius((prev) => !prev)}
              color="#a26b1f"
            />
          </View>
        </View>
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

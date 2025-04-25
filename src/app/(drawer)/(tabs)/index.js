import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import WeatherScreen from "../../../components/WeatherScreen";

export default function Page() {
  const headerHeight = useHeaderHeight();

  return (
    <ImageBackground
      source={{ uri: "https://picsum.photos/800/1600" }}
      style={[styles.background, { paddingTop: headerHeight }]}
      resizeMode="cover"
    >
      <Text style={styles.date}>October 25, Friday</Text>
      <Text style={styles.bigTemperature}>3</Text>
      <Text style={styles.date}>Rainy</Text>

      <View style={styles.iconRowContainer}>
        <View style={styles.iconItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="weather-windy" size={22} color="#a26b1f" />
          </View>
          <Text style={styles.iconLabel}>Wind Speed</Text>
            <Text>1</Text>
        </View>
        <View style={styles.iconItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="water" size={22} color="#a26b1f" />
          </View>
          <Text style={styles.iconLabel}>Humidity</Text>
            <Text>1</Text>
        </View>
        <View style={styles.iconItem}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="shield-sun" size={22} color="#a26b1f" />
          </View>
          <Text style={styles.iconLabel}>Pressure</Text>
            <Text>1</Text>
        </View>
      </View>

      <WeatherScreen />
    </ImageBackground>
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

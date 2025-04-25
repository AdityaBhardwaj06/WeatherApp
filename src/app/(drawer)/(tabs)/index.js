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
import useLocationStore from "../../store/useLocationStore";
import FetchLocation from "../../../utils/FetchLocation";
import useWeatherStore from "../../store/useWeatherStore";

export default function Page() {
  const headerHeight = useHeaderHeight();
  const { latitude, longitude, success } = useLocationStore();
  const { weather,lastUpdated, loading, error, fetchWeather } = useWeatherStore();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch weather when page mounts or location changes
  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  // Pull-to-refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    if (latitude && longitude) {
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
        source={{ uri: "https://picsum.photos/800/1600" }}
        style={[styles.background, { paddingTop: headerHeight }]}
        resizeMode="cover"
      >
        <Text style={styles.date}>{lastUpdated}</Text>
        <Text style={styles.bigTemperature}>
          {weather?.temp !== undefined ? weather.temp : "--"}
        </Text>
        <Text style={styles.date}>
          {weather?.condition || "Loading..."}
        </Text>

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
            <Text>{weather?.windSpeed !== undefined ? weather.windSpeed : "--"}</Text>
          </View>
          <View style={styles.iconItem}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="water" size={22} color="#a26b1f" />
            </View>
            <Text style={styles.iconLabel}>Humidity</Text>
            <Text>{weather?.humidity !== undefined ? weather.humidity : "--"}</Text>
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
            <Text>{weather?.presssure !== undefined ? weather.presssure : "--"}</Text>
          </View>
        </View>

        {/* Location info */}
        <View>
          {success ? (
            <Text>
              Lat: {latitude}, Lon: {longitude}
            </Text>
          ) : (
            <Text>Location not available</Text>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

// ...styles remain unchanged



// import React, { useState, useEffect } from "react";
// import {
//   ImageBackground,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   RefreshControl,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useHeaderHeight } from "@react-navigation/elements";
// import useLocationStore from "../../store/useLocationStore";
// import FetchLocation from "../../../utils/FetchLocation";
// import useWeatherStore from "../../store/useWeatherStore";


// export default function Page() {

  
  
//   const headerHeight = useHeaderHeight();
//   const { latitude, longitude, success } = useLocationStore();
//   const { weather, loading, error, fetchWeather } = useWeatherStore();
//   const [refreshing, setRefreshing] = useState(false);

//   // Replace this with your actual data reload logic
//   const onRefresh = async () => {
//     setRefreshing(true);
//     // Simulate network request or call your fetchWeather function here
//     // await fetchWeather();
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1500);
//   };

//   useEffect(() => {
//     if (latitude && longitude) {
//       fetchWeather(latitude, longitude);
//     }
//   }, [latitude, longitude]);

//   return (
    
//     <ScrollView
//       style={{ flex: 1 }}
//       contentContainerStyle={{ flexGrow: 1 }}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           progressViewOffset={headerHeight}
//         />
//       }
//     >
//       <FetchLocation />
//       <ImageBackground
//         source={{ uri: "https://picsum.photos/800/1600" }}
//         style={[styles.background, { paddingTop: headerHeight }]}
//         resizeMode="cover"
//       >
//         <Text style={styles.date}>October 25, Friday</Text>
//         <Text style={styles.bigTemperature}>{weather.temp}</Text>
//         <Text style={styles.date}>Rainy</Text>

//         <View style={styles.iconRowContainer}>
//           <View style={styles.iconItem}>
//             <View style={styles.iconCircle}>
//               <MaterialCommunityIcons
//                 name="weather-windy"
//                 size={22}
//                 color="#a26b1f"
//               />
//             </View>
//             <Text style={styles.iconLabel}>Wind Speed</Text>
//             <Text>1</Text>
//           </View>
//           <View style={styles.iconItem}>
//             <View style={styles.iconCircle}>
//               <MaterialCommunityIcons name="water" size={22} color="#a26b1f" />
//             </View>
//             <Text style={styles.iconLabel}>Humidity</Text>
//             <Text>1</Text>
//           </View>
//           <View style={styles.iconItem}>
//             <View style={styles.iconCircle}>
//               <MaterialCommunityIcons
//                 name="shield-sun"
//                 size={22}
//                 color="#a26b1f"
//               />
//             </View>
//             <Text style={styles.iconLabel}>Pressure</Text>
//             <Text>1</Text>
//           </View>
//         </View>

//         {/* Location info */}
//         <View>
//           {success ? (
//             <Text>
//               Lat: {latitude}, Lon: {longitude}
//             </Text>
//           ) : (
//             <Text>Location not available</Text>
//           )}
//         </View>
//       </ImageBackground>
//     </ScrollView>
//   );
// }

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

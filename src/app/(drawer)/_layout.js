/*  Drawer Layout */ 

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import useWeatherStore from "../../store/useWeatherStore";

export default function Layout() {
  const city = useWeatherStore((state) => state.weather?.city)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            headerTitle: city || "Home", // In case city name not available
            title: city || "Home",       
            headerTransparent: true,
            headerTitleAlign: "center"
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: '',  // NO title for About page
            headerTransparent: true,
            headerTitleStyle: { opacity: 0 }
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

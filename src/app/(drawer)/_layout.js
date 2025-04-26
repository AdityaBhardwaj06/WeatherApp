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
            headerTitle: city || "Home", // Use string fallback
            title: city || "Home",       // Use string fallback
            headerTransparent: true,
            headerTitleAlign: "center"
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: '', // removes text from the header
            headerTransparent: true,
            headerTitleStyle: { opacity: 0 }
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

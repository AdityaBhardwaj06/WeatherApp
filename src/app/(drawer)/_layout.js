import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            headerTitle: "City", // removes text from the header
            title: "hello", // removes text from the header
            headerTransparent: true, // makes header background transparent
            headerTitleAlign : "center"
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            title: '', // removes text from the header
    headerTransparent: true, // makes header background transparent
    headerTitleStyle: { opacity: 0 }, // hides the title visually
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

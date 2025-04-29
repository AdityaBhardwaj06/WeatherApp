/* TAbs Layout */
import { Tabs } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "rgba(20,20,20,0.85)", 
          borderTopWidth: 0,
          height: 64,
          position: "absolute",
          elevation: 0, 
        },
        tabBarActiveTintColor: "#bfa77a", 
        tabBarInactiveTintColor: "#fff", 
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 13,
          marginBottom: 6,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
        tabBarHideOnKeyboard: true
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Weather",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cloud-sun" size={22} color={color} />
          ),
          headerShown : false,
          
        }}
      />

      <Tabs.Screen
        name="Cities"
        options={{
          title: "Cities",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="city-variant-outline" size={22} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

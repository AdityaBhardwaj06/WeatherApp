import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Weather App</Text>
        <Text style={styles.description}>
          Get real-time weather updates based on your current location or your favourite cities.
        </Text>
      </View>
      <Text style={styles.copyright}>
      <Text style={styles.strikethroughText}>© 2025 Aditya Bhardwaj. All rights reserved.</Text>
        <Text>{'\n'}Lite</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
    color: "#555",
    marginTop: 12,
    lineHeight: 30,
  },
  copyright: {
    fontSize: 16,
    color: "#888",
    marginBottom: 12,
    textAlign: "center",
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black', 
  },
});

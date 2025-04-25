import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const CITY_LIST = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Mumbai",
  "Sydney",
  "Moscow",
  "Beijing",
  "Cairo",
  "Rio de Janeiro",
  // Add more cities as needed
];

export default function CitySearchBar({ onCitySelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = CITY_LIST.filter((city) =>
        city.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setQuery("");
    setSuggestions([]);
    onCitySelect(city);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search for a city"
        value={query}
        onChangeText={handleChange}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    fontSize: 16,
  },
  suggestion: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

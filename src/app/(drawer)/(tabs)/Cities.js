import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderHeight } from '@react-navigation/elements';
import {  } from '@react-navigation/elements';
import { Snackbar } from 'react-native-paper';

const STORAGE_KEY = '@recent_cities';

const CityPage = () => {
  const headerHeight = useHeaderHeight();
  const [searchText, setSearchText] = useState('');
  const [recentCities, setRecentCities] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  // Snackbar show helper
  const showError = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarVisible(true);
  };

  // Load recent cities from AsyncStorage on mount
  useEffect(() => {
    const loadRecentCities = async () => {
      try {
        const storedCities = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedCities !== null) {
          setRecentCities(JSON.parse(storedCities));
        }
      } catch (e) {
        showError('Failed to load recent cities');
      }
    };
    loadRecentCities();
  }, []);

  // Add city to recent searches (called on submit)
  const addCityToRecent = async (city) => {
    if (!city) return;
    try {
      let updatedCities = [city, ...recentCities.filter(c => c.toLowerCase() !== city.toLowerCase())];
      setRecentCities(updatedCities);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCities));
    } catch (e) {
      showError('Failed to save city');
    }
  };

  // Clear all recent searches
  const clearRecentCities = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setRecentCities([]);
      showError(' clear recent cities')
    } catch (e) {
      showError('Failed to clear recent cities');
    }
  };

  // Handle submit (Enter key)
  const handleSubmit = () => {
    const city = searchText.trim();
    if (city) {
      addCityToRecent(city);
      setSearchText('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search city"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />

      {/* Recent Search Label and Clear Button */}
      <View style={styles.recentHeaderRow}>
        <Text style={styles.recentLabel}>Recent Search</Text>
        <TouchableOpacity onPress={clearRecentCities}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Recently Displayed Cities */}
      <FlatList
        data={recentCities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.cityName}>{item}</Text>
            <View style={styles.separator} />
          </View>
        )}
      />

      {/* Snackbar for errors */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => setSnackbarVisible(false),
        }}>
        {snackbarMsg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  recentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    fontSize: 14,
    color: '#ff4444',
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  cityName: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#444',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 2,
  },
});

export default CityPage;

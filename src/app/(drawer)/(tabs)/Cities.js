import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderHeight } from '@react-navigation/elements';
import { Snackbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import useWeatherStore from '../../../store/useWeatherStore';

const STORAGE_KEY = '@recent_cities';

const CityPage = () => {
  const headerHeight = useHeaderHeight();
  const router = useRouter();
  const fetchWeatherByCity = useWeatherStore(state => state.fetchWeatherByCity);

  const [searchText, setSearchText] = useState('');
  const [recentCities, setRecentCities] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  const showError = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarVisible(true);
  };

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

  const clearRecentCities = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setRecentCities([]);
      showError('Cleared recent cities');
    } catch (e) {
      showError('Failed to clear recent cities');
    }
  };

  const handleSubmit = async () => {
    const city = searchText.trim();
    if (city) {
      await addCityToRecent(city);
      setSearchText('');
      Keyboard.dismiss();
      await fetchWeatherByCity(city);
      router.navigate('/(drawer)/(tabs)/'); // Go to Weather page
    }
  };

  const handleCityPress = async (city) => {
    await fetchWeatherByCity(city);
    router.navigate('/(drawer)/(tabs)/'); // Go to Weather page
  };

  return (
    <View style={[styles.container, { paddingTop: headerHeight }]}>
      <TextInput
        style={styles.input}
        placeholder="Search city"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />

      <View style={styles.recentHeaderRow}>
        <Text style={styles.recentLabel}>Recent Search</Text>
        <TouchableOpacity onPress={clearRecentCities}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recentCities}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => handleCityPress(item)}>
              <Text style={styles.cityName}>{item}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
          </View>
        )}
      />

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

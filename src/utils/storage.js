import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recentCities';

export const getRecentCities = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

export const saveCity = async (city) => {
  try {
    let cities = await getRecentCities();
    // Remove duplicates, add to top
    cities = [city, ...cities.filter((c) => c !== city)];
    // Limit to 10
    cities = cities.slice(0, 10);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  } catch (e) {
    // handle error
  }
};

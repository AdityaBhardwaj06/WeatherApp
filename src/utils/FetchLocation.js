import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import useLocationStore from '../store/useLocationStore';


const FetchLocation = () => {
  const setLocation = useLocationStore((state) => state.setLocation);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation({ latitude: null, longitude: null, success: false });
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude, success: true });
    })();
  }, []);

  return null; // This component only fetches and stores location hence return null
};

export default FetchLocation;

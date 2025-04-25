// import React, { useEffect, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import * as Location from 'expo-location';

// export default function LocationComponent() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       // Request foreground location permission
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       // Get current position
//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc);
//     })();
//   }, []);

//   return (
//     <View>
//       {errorMsg ? <Text>{errorMsg}</Text> : null}
//       {location ? (
//         <Text>
//           Latitude: {location.coords.latitude}{'\n'}
//           Longitude: {location.coords.longitude}
//         </Text>
//       ) : (
//         <Text>Fetching location...</Text>
//       )}
//     </View>
//   );
// }



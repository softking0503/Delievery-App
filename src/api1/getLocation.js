// src/api/getLocation.js
import * as Location from 'expo-location';

async function getLocation() {
  return new Promise(async (resolve, reject) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        reject(new Error('Permission to access location was denied'));
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 5000,
        maximumAge: 0,
      });
      resolve(location);
    } catch (error) {
      reject(error);
    }
  });
}

export default getLocation;

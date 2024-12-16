import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import { updateUserAddress } from "../api1/UserAPI";
import { setUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import SuccessModal from "../modals/success";
import ErrorModal from "../modals/error";

// Import the API key from the .env file
import { GOOGLE_MAP_API_KEY } from '@env';

export default function StylishMap({ route }) {
  const navigation = useNavigation();
  const { userId } = route.params;
  const dispatch = useDispatch();

  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");

        if (userData) {
          const user = JSON.parse(userData);
          setIsLoggedIn(true);
          setCity(user.city);
          setStreet(user.street);
          setAddress(user.address);
          setPostCode(user.postalCode);
          setCountry(user.country);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch token", error);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem("userData");
        const savedLocation = await AsyncStorage.getItem("location");
        console.log(savedLocation);

        let latitude, longitude;

        if (savedUserData) {
          const parsedUserData = JSON.parse(savedUserData);

          if (parsedUserData.latitude && parsedUserData.longitude) {
            latitude = parsedUserData.latitude;
            longitude = parsedUserData.longitude;
          }
        }

        if ((!latitude || !longitude) && savedLocation) {
          const parsedLocation = JSON.parse(savedLocation);

          if (parsedLocation.coords) {
            latitude = parsedLocation.coords.latitude;
            longitude = parsedLocation.coords.longitude;
          }
        }

        if (latitude && longitude) {
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          console.warn("No location data found.");
        }
      } catch (error) {
        console.error("Error loading location:", error);
      }
    };

    loadSavedLocation();
  }, []);

  const handleLocationChange = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    setLocation({
      ...location,
      latitude: lat,
      longitude: lng,
    });

    if (details) {
      const addressComponents = details.address_components;
      const getAddressComponent = (types) =>
        addressComponents.find((component) => types.every((type) => component.types.includes(type)))?.long_name || '';

      const city = getAddressComponent(['locality']);
      const street = getAddressComponent(['route']);
      const postalCode = getAddressComponent(['postal_code']);
      const address = getAddressComponent(['street_address']) || `${street} ${getAddressComponent(['sublocality', 'political'])}`;
      const country = getAddressComponent(['country']);

      setCity(city);
      setAddress(address);
      setPostCode(postalCode);
      setCountry(country)
    }
  };

  const handleSaveLocation = async () => {
    try {
      const userData = {
        country: country,
        city: city,
        address: address,
        postalCode: postalCode,
        street: street,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      const storedUserData = await AsyncStorage.getItem("userData");

      let parsedUserData = {};
      if (storedUserData) {
        parsedUserData = JSON.parse(storedUserData);
      }
      const result = await updateUserAddress(userId, userData);
      if (result && result.success) {
        const updatedUserData = {
          ...parsedUserData,
          ...userData,
        };
        dispatch(setUser({ ...updatedUserData }));
        await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));
        setModalMessage(result.message);
        setModalVisible(true);
        setTimeout(() => {
          navigation.navigate("UserScreen");
        }, 2000);
      } else {
        alert(result ? result.message : "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error while saving profile:", error);
      alert("An error occurred while saving the profile. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={location} customMapStyle={customMapStyle}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Selected Location"
            image={require("../../assets/custom-marker.png")}
          />
        </MapView>
      </View>
      <View
        style={{
          position: "absolute",
          top: 42,
          right: 10,
          width: "80%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search for a place"
          onPress={(data, details = null) => {
            if (details) {
              handleLocationChange(data, details);
            }
          }}
          fetchDetails={true}
          query={{
            key: GOOGLE_MAP_API_KEY
            , // Replace with your Google Maps API Key
            language: "en",
            components: 'country:us',
          }}
          onFail={(error) => console.error(error)}
          enablePoweredByContainer={false}
          styles={{
            textInput: styles.searchInput,
            listView: { borderRadius: 10 },
          }}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>City:</Text>
        <TextInput
          placeholder="Enter street"
          style={styles.input}
          value={city}
          editable={false}
          selectTextOnFocus={false} />
        <Text style={styles.label}>Address:</Text>
        <TextInput placeholder="Enter street"
          style={styles.input}
          value={address}
          editable={false}
          selectTextOnFocus={false} />
        <Text style={styles.label}>Post Code:</Text>
        <TextInput placeholder="Enter post code"
          style={styles.input}
          value={postalCode}
          editable={false}
          selectTextOnFocus={false} />
        <TouchableOpacity style={styles.button} onPress={handleSaveLocation}>
          <Text style={styles.buttonText}>Save Location</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        message={modalMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: "50%",
  },
  map: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 5,
    zIndex: 1000,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    color: "#4C5058",
    fontWeight: "500",
    marginBottom: 5,
    marginLeft: 1,
  },
});

const customMapStyle = [
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }] // Hides points of interest labels
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffffff" }] // Change road color
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#aadaff" }] // Change water color
  }
];

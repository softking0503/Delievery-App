import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default function StylishMap({ }) {

    const [shopname, setShopname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    useEffect(() => {
        const loadShopName = async () => {
            try {
                const userData = await AsyncStorage.getItem("userData");
                if (userData) {
                    const parsedUserData = JSON.parse(userData);
                    
                    const shopname = parsedUserData?.shop?.shopname || "Unknown Shop";
                    const firstName = parsedUserData.firstName;
                    const lastName = parsedUserData.lastName;
                    setShopname(shopname);
                    setFirstName(firstName);
                    setLastName(lastName);
                }
            } catch (error) {
                console.error("Error loading shop name:", error);
            }
        };

        loadShopName();
    }, []);

    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        const loadSavedLocation = async () => {
            try {
                const savedUserData = await AsyncStorage.getItem("userData");
                if (savedUserData) {
                    const parsedUserData = JSON.parse(savedUserData);
                    const coordinates = parsedUserData?.shop?.shopaddress?.location?.coordinates;
                    console.log(coordinates);
                    
                    if (coordinates && coordinates.length === 2) {
                        const longitude = coordinates[0];
                        const latitude = coordinates[1];
                        setLocation({
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        });
                    } else {
                        console.warn("No valid coordinates found in shop data.");
                    }
                }
            } catch (error) {
                console.error("Error loading location:", error);
            }
        };

        loadSavedLocation();
    }, []);

    return (
        <View>
            <Text className="text-xl font-semibold mt-2 mb-2 text-gray-600">My Location</Text>
            <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="map-marker" size={20} color="#33D69F" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.locationDetails}>ShopName:</Text>
                            <Text style={styles.locationDetails}>{shopname}</Text>
                            <Text style={styles.personDetails}>deliveryman:</Text>
                            <Text style={styles.personDetails}>{capitalizeFirstLetter(firstName)} {capitalizeFirstLetter(lastName)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.mapContainer}>
                    <View style={styles.mapWrapper}>
                        <MapView
                            style={styles.map}
                            region={location}  // Set the map region to the location state
                            customMapStyle={customMapStyle}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                                title="Shop Location"
                                description="This is the location of the shop."
                                image={require("../../../assets/custom-marker.png")}
                            />
                        </MapView>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        width: "65%",
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        overflow: "hidden",
        height: 250,
        marginBottom: 30
    },
    mapWrapper: {
        width: "100%",
        height: "100%",
    },
    map: {
        flex: 1,
    },
    container: {
        width: "35%",
        backgroundColor: "#1E1E1E",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 15,
        height: 250,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    trackingIdContainer: {
        marginBottom: 20,
    },
    trackingText: {
        fontSize: 14,
        color: "#B0B0B0",
    },
    trackingId: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    iconContainer: {
        paddingRight: 10,
    },
    infoTextContainer: {
        flex: 1,
    },
    locationTitle: {
        fontSize: 14,
        color: "#B0B0B0",
        marginBottom: 3,
    },
    locationDetails: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    personDetails: {
        fontSize: 13,
        color: "#B0B0B0",
    },
    dottedLine: {
        width: 1,
        height: 10,
        backgroundColor: "#33D69F",
        borderRadius: 1,
        marginLeft: 10,
        marginVertical: 10,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#33D69F",
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
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { GOOGLE_MAP_API_KEY } from '@env';
import 'nativewind'; // nativewind 스타일을 사용하기 위한 import
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

const DeliveryRouteMap = ({ route }) => {
  const navigation = useNavigation();
  const { OrderMap } = route.params;
  const [orderMapDetails, setOrderMapDetails] = useState(OrderMap);

  const [shopLocation, setShopLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem('userData');
        if (savedUserData) {
          const parsedUserData = JSON.parse(savedUserData);
          const coordinates = parsedUserData?.shop?.shopaddress?.location?.coordinates;
          if (coordinates && coordinates.length === 2) {
            const [longitude, latitude] = coordinates;
            setShopLocation({ latitude, longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA });
          } else {
            console.warn('No valid coordinates found in shop data.');
          }
        }
      } catch (error) {
        console.error('Error loading shop location:', error);
      }
    };
    loadSavedLocation();
  }, []);

  useEffect(() => {
    if (OrderMap?.address) {
      const { lng: longitude, lat: latitude } = OrderMap.address;
      setCustomerLocation({ latitude, longitude, latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA });
    }
  }, [OrderMap]);


  useEffect(() => {
    if (shopLocation && customerLocation) {
      fetchRouteData(shopLocation, customerLocation);
    }
  }, [shopLocation, customerLocation]);

  const fetchRouteData = async (origin, destination) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAP_API_KEY}`
      );

      if (response.data && response.data.routes.length > 0) {
        const points = decodePolyline(response.data.routes[0].overview_polyline.points);
        setRouteCoordinates(points);
        setLoading(false);
      } else {
        console.warn('No routes found');
        setLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch route data:', error);
      setLoading(false);
    }
  };

  const decodePolyline = (t, e = 5) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < t.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  return (
    <View className="flex-1">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4285f4" />
        </View>
      ) : (
        <MapView
          className="w-full h-full"
          region={shopLocation || customerLocation}
        >
          {shopLocation && (
            <Marker
              coordinate={shopLocation}
              title="Shop Location"
              description="This is where the shop is located."
              image={require('../../assets/shop-location.png')}
            />
          )}

          {customerLocation && (
            <Marker
              coordinate={customerLocation}
              title="Customer Location"
              description="This is where the customer is located."
              image={require('../../assets/w.png')}
            />
          )}

          {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeColor="#4285f4" strokeWidth={5} />
          )}
        </MapView>
      )}

      <View className="absolute top-12 left-4 bg-white p-2 rounded-full shadow-lg">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={25} color="#4C5058" />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-0 w-full bg-white p-6 rounded-t-3xl shadow-xl flex flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-bold">{orderMapDetails.customer?.username} House</Text>
          <Text className="text-gray-500">Ordered At: {orderMapDetails.updated_at}</Text>
          <Text className="text-base mt-1">Total Price: ${orderMapDetails.totalPrice}</Text>
        </View>
        <View className="w-[100px] h-[100px] rounded-md overflow-hidden">
          <Image source={{ uri: 'https://i.postimg.cc/rwj0LpfX/man.jpg' }} className="w-full h-full" />
        </View>
      </View>
    </View>
  );
};

export default DeliveryRouteMap;

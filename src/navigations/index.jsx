import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AddressScreen from "../screens/AddressScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import UserInfoScreen from "../screens/UserInfoScreen";
import UserScreen from "../screens/UserScreen";
import AboutUs from "../screens/AboutUsScreen";
import SplashScreen from "../screens/SplashScreen";
import OrderDetailsPage from "../screens/OrderDetail";
import NotificationsScreen from "../screens/Notification";
import DeliveriesScreen from "../screens/Delivery";
import DataHistoryPage from "../screens/History";
import GoogleMp from "../screens/GoogleMap"
import { setUser } from "../features/userSlice";

const Stack = createNativeStackNavigator();
const RootStack = createStackNavigator();

export default function index({ location }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserInfo = async () => {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        return;
      }
      const user = JSON.parse(userData);

      dispatch(setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone_number: user.phone_number,
        name: user.name,
        token: user.token,
        userId: user.userId,
      }));
    }

    loadUserInfo();
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <RootStack.Group>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="UserScreen" component={UserScreen} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="SignUp" component={SignUp} />
        <RootStack.Screen name="AddressScreen" component={AddressScreen} />
        <RootStack.Screen name="UserInfoScreen" component={UserInfoScreen} />
        <RootStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <RootStack.Screen name="AboutUs" component={AboutUs} />
        <RootStack.Screen name="OrderDetailsPage" component={OrderDetailsPage} />
        <RootStack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <RootStack.Screen name="DataHistoryPage" component={DataHistoryPage} />
        <RootStack.Screen name="DeliveriesScreen" component={DeliveriesScreen} />
        <RootStack.Screen name="GoogleMp" component={GoogleMp} />

      </RootStack.Group>
    </RootStack.Navigator>
  );
}

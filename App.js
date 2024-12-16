import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from 'react';
// import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import getLocation from "./src/api1/getLocation"; // Import getLocation function
import CartToast from "./src/components/CartToast/CartToast";
import AppNavigation from "./src/navigations";
import store from "./store";
import 'react-native-get-random-values';

// const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    handleLocation();
  }, []);
  const handleLocation = async () => {
    try {
      const location = await getLocation();
      await AsyncStorage.setItem("location", JSON.stringify(location));
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppNavigation />
        <CartToast />
      </Provider>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });





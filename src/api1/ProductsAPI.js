// src/api/ProductsAPI.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const getProducts = async () => {
  try {
    const locationString = await AsyncStorage.getItem("location");
    const location = JSON.parse(locationString); // Parse location
    const latitude = location?.coords?.latitude;
    const longitude = location?.coords?.longitude;
    // const latitude = 34.0653347;
    // const longitude = -118.243891;

    const data = JSON.stringify({
      searchText: "",
    });
    const response = await axiosInstance.post("/product/products", data, {
      headers: {
        "x-user-latitude": latitude,
        "x-user-longitude": longitude,
      },
    });
    return response.data.products;
  } catch (error) {
    console.error("Error sending request:", error);

    if (error.response) {
      console.error(
        "Server responded with status code:",
        error.response.status
      );
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
  }
};

export const getProductsByCategory = async (category, shopId) => {
  try {
    const locationString = await AsyncStorage.getItem("location");
    const location = JSON.parse(locationString); // Parse location
    const latitude = location?.coords?.latitude;
    const longitude = location?.coords?.longitude;
    
    // const latitude = 34.0653347;
    // const longitude = -118.243891;

    const data = JSON.stringify({
      shopId: shopId,
    });

    const response = await axiosInstance.get(`/product/products/shopId/${shopId}/category/${category}`, data, {
      headers: {
        "x-user-latitude": latitude,
        "x-user-longitude": longitude,
      },
    });
    return response.data.products;
  } catch (error) {
    console.log(error);
  }
};
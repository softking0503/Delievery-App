import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from './axiosInstance';
import { message } from "antd";

export const getOrders = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      return {
        success: false,
        message: "User not authenticated. Please log in.",
      };
    }

    const response = await axiosInstance.get("/orders/", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      message:
        "An error occurred while fetching the profile. Please try again later.",
    };
  }
};
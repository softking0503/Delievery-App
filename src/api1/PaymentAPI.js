import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from './axiosInstance'; // Assuming this is configured

export const orderCreate = async (amount) => {
  try {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      const accessToken = JSON.parse(userData);

      const response = await axiosInstance.post(
        "/orders/create-order",
        {
          amount: amount,
          currency: "INR",
          receipt: "receipt#1",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.token}`,
          },
        }
      );
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "User not logged in",
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Access token may be invalid or expired.");
    } else {
      console.error("Error creating order:", error.message || error); // Log any other errors
    }
    throw error;
  }
};



// this is payment API
// Oh network speed is very poor.
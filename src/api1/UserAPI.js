import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../features/userSlice";
import axiosInstance from './axiosInstance';
import { message } from "antd";

// Register user
export const register = async (FormData) => {
  try {
    const response = await axiosInstance.post("/auth/deliverymanRegister", FormData, {
      headers: {
        "Content-Type": "multipart/form-data",  // Ensure multipart/form-data
      },
    });

    if (response.data.message === "Success") {
      return { success: true, message: "Account created successfully!" };
    } else {
      return {
        success: false,
        message: response.data.message || "Sign up failed. Please try again.",
      };
    }
  } catch (error) {
    console.error("Error in signup:", error); // Log error for debugging
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};



// Loin user
export const login = async (loginData, dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/deliverymanLogin", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.access_token) {
      console.log(response.data);

      const {
        access_token,
        first_name,
        username,
        last_name,
        email,
        phone_number,
        userId,
        shopData,  // Assuming shopData is returned from backend
      } = response.data;

      await AsyncStorage.setItem("userToken", access_token);

      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          name: username,
          firstName: first_name,
          lastName: last_name,
          email: email,
          token: access_token,
          phone_number: phone_number,
          userId: userId,
          shop: shopData,  // Assuming shopData contains the shop info like shopname, address, etc.
        })
      );

      dispatch(
        setUser({
          name: username,
          firstName: first_name,
          lastName: last_name,
          email: email,
          token: access_token,
          phone_number: phone_number,
          userId: userId,
          shop: shopData,  // Add shop data to Redux store if needed
        })
      );

      return {
        success: true,
        message: "Login successful!",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Login failed. Please try again.",
      };
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessage = error.response.data.errors[0].detail;
      return {
        success: false,
        message: errorMessage,
      };
    }

    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
};

// Logout user
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userData");

    return {
      success: true,
      message: "Logout successful!",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: "An error occurred during logout. Please try again later.",
    };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      return {
        success: false,
        message: "User not authenticated. Please log in.",
      };
    }
    const response = await axiosInstance.get("/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data, // User profile data from backend
        message: "User profile retrieved successfully!",
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to retrieve user profile.",
      };
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      message:
        "An error occurred while fetching the profile. Please try again later.",
    };
  }
};

// put update user profile
export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(
      `/users/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        message: response.data.message || "Profile updated successfully!",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update profile.",
      };
    }
  } catch (error) {
    console.error("Error updating profile:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data.message : "An error occurred while updating the profile.",
    };
  }
};

// put update userAddress profile
export const updateUserAddress = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(
      `/users/users/${userId}/address`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.success) {
      return {
        success: true,
        message: response.data.message || "Profile updated successfully!",
        data: response.data.data,
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update profile.",
      };
    }
  } catch (error) {
    console.error("Error updating profile:", error.response ? error.response.data : error.message);
    return {
      success: false,
      message: error.response ? error.response.data.message : "An error occurred while updating the profile.",
    };
  }
};
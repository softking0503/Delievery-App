import axios from "axios";
import { SERVER_URL } from "@env";

const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}`, // Ensure this is correct
  timeout: 10000, // Increase the timeout if necessary
  headers: {
    "Content-Type": "multipart/form-data",  // Use multipart/form-data for file uploads
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error("Server responded with:", error.response.data);
    } else if (error.request) {
      console.error("Request made but no response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

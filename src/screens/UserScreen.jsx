import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from "../api1/UserAPI";
import MyInfo from "../components/Userdata/MyInfo";
import Header from "../components/Userdata/UserHeader";
import ErrorModal from "../modals/error";
import SuccessModal from "../modals/success";
import { useSelector } from "react-redux";

export default function UserScreen() {
  const navigation = useNavigation();

  const { userId } = useSelector(
    (state) => state.user
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      setModalMessage(result.message);
      setModalVisible(true);
      AsyncStorage.removeItem("userToken");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } else {
      console.error(result.message);
    }
  };
  const handlemove = async () => {
    setModalMessage("First please login!");
    setErrorModalVisible(true);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch token", error);
      }
    };

    checkToken();
  }, []);
  return (
    <View className="mt-10 p-3 space-y-3">
      <View className="flex-row space-x-3 items-center p-2 bg-white rounded-md">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", {});
          }}
        >
          <Icon name="arrow-left" size={20} color="#4C5058" />
        </TouchableOpacity>
        <Text className="text-[23px] font-medium text-[#4C5058]">
          My Profile
        </Text>
      </View>
      <>
        <View className="bg-white rounded-md py-4 px-2 space-y-1 mt-5">
          <View className="rounded-md space-y-3">
            <Header />
          </View>
        </View>
        <View className="bg-white rounded-md py-4 px-2 space-y-1 mt-5">
          <View className="rounded-md space-y-3">
            <TouchableOpacity
              className="flex flex-row justify-between items-center"
              onPress={() => navigation.navigate("UserInfoScreen")}
            >
              <View className="flex flex-row justify-start items-center">
                <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                  <MaterialIcon name="user" size={18} color="#FB6F3D" />
                </View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  Personal Info
                </Text>
              </View>
              <MaterialIcon name="chevron-right" size={18} color="#747783" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row justify-between items-center "
              onPress={() => {
                navigation.navigate("AddressScreen", { userId });
              }}
            >
              <View className="flex flex-row justify-start items-center">
                <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                  <MaterialIcon name="map" size={18} color="#413DFB" />
                </View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  Address
                </Text>
              </View>
              <MaterialIcon name="chevron-right" size={18} color="#747783" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-white rounded-md py-4 px-2 space-y-1 mt-5">
          <View className="rounded-md space-y-3">
            <TouchableOpacity className="flex flex-row justify-between items-center " onPress={() => navigation.navigate("DataHistoryPage")}>
              <View className="flex flex-row justify-start items-center">
                <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                  <MaterialIcon
                    name="shopping-bag"
                    size={18}
                    color="#369BFF"
                  />
                </View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  Delivery History
                </Text>
              </View>
              <MaterialIcon name="chevron-right" size={18} color="#747783" />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row justify-between items-center" onPress={() => navigation.navigate("AboutUs")}>
              <View className="flex flex-row justify-start items-center">
                <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                  <MaterialIcon name="command" size={18} color="#B33DFB" />
                </View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  About Us
                </Text>
              </View>
              <MaterialIcon name="chevron-right" size={18} color="#747783" />
            </TouchableOpacity>

            <TouchableOpacity className="flex flex-row justify-between items-center" onPress={() => navigation.navigate("payment")}>
              <View className="flex flex-row justify-start items-center">
                <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                  <MaterialIcon name="bell" size={18} color="#FFAA2A" />
                </View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  Notifications
                </Text>
              </View>
              <MaterialIcon name="chevron-right" size={18} color="#747783" />
            </TouchableOpacity>

          </View>
        </View>
        <View className="bg-white rounded-md py-4 px-2 space-y-1 mt-5">
          <View className="rounded-md space-y-3">
            <TouchableOpacity
              className="flex flex-row justify-between items-center "
              onPress={handleLogout}
            >
              <View className="flex flex-row justify-start items-center">
                <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                  <MaterialIcon name="log-out" size={18} color="#FB4A59" />
                </View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  Log out
                </Text>
              </View>
              <MaterialIcon name="chevron-right" size={18} color="#747783" />
            </TouchableOpacity>
          </View>
        </View>
      </>

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

import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import Header from "../components/Userdata/UserHeader";
import { useSelector } from "react-redux";
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export default function UserInfoScreen() {
  const { firstName, lastName, email, phone_number, userId } = useSelector(
    (state) => state.user
  );
  const navigation = useNavigation();

  return (
    <View className="mt-10 p-3 space-y-3">
      <View className="flex-row space-x-3 justify-between items-center p-2 bg-white rounded-md">
        <View className="flex-row flex space-x-3 items-center bg-white rounded-md">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserScreen");
            }}
          >
            <Icon name="arrow-left" size={20} color="#4C5058" />
          </TouchableOpacity>
          <Text className="text-[23px] font-medium text-[#4C5058]">
            Personal Info
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfileScreen", { userId });
            }}
          >
            <Text className="font-medium text-[#FF7622]">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white rounded-md py-4 px-2 space-y-1 mt-5">
        <View className="rounded-md space-y-3">
          <Header />
        </View>
      </View>

      <View className="bg-white rounded-md py-4 px-2 space-y-1 mt-5">
        <View className="rounded-md space-y-3">
          <View className="flex flex-row justify-between items-center ">
            <View className="flex flex-row justify-start items-center">
              <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                <MaterialIcon name="user" size={18} color="#FB6F3D" />
              </View>
              <View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  FULL NAME
                </Text>
                <Text className="text-[#4C5058] ml-2 text-[15px]">
                  {capitalizeFirstLetter(firstName)}{" "}
                  {capitalizeFirstLetter(lastName)}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center ">
            <View className="flex flex-row justify-start items-center">
              <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                <MaterialIcon name="mail" size={18} color="#413DFB" />
              </View>
              <View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  EMAIL
                </Text>
                <Text className="text-[#4C5058] ml-2 text-[15px]">
                  {email}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex flex-row justify-between items-center ">
            <View className="flex flex-row justify-start items-center">
              <View className="bg-[#faf9f9] rounded-full py-3 px-3">
                <MaterialIcon name="phone" size={18} color="#369BFF" />
              </View>
              <View>
                <Text className="text-[#4C5058] ml-2 text-[17px] font-medium">
                  PHONE NUMBER
                </Text>
                <Text className="text-[#4C5058] ml-2 text-[15px]">
                  +{phone_number}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import MaterialIcon from "react-native-vector-icons/Feather";
import SearchBar from "./SearchBar";

export default function Header() {
  const navigation = useNavigation();
  return (
    <View className="w-full">
      {/* Header Container */}
      <View className="w-full flex flex-row justify-between items-center mt-1 mb-2">
        {/* Logo and Title */}
        <View className="flex flex-row items-center">
          <Image
            source={require('../../../assets/motorcycle.png')}
            className="w-12 h-12 mr-3"
            resizeMode="contain"
          />
          <Text className="text-[20px] font-bold text-gray-600">Belly Basket</Text>
        </View>

        {/* Notification Bell */}
        <View className="flex flex-row justify-center items-center">
          <TouchableOpacity onPress={() => navigation.navigate("NotificationsScreen")}>
            <View className="relative bg-gray-100 rounded-full p-2 mr-1">
              <MaterialIcon name="bell" size={22} color="#575555" />
              {/* Badge */}
              <View className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 flex justify-center items-center">
                <Text className="text-white text-[10px] font-bold">3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <SearchBar />
    </View>
  );
}

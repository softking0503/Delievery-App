import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontistoIcon from "react-native-vector-icons/Fontisto";

export default function CartScreen() {
  const navigation = useNavigation();

  return (
    <View className="mt-10 flex-1">
      <View className="flex flex-row items-center justify-between py-3 px-3 bg-white">
        <View className="flex flex-row items-center space-x-3">
          <TouchableOpacity onPress={()=>navigation.navigate("UserScreen")}>
            <Icon name="arrow-left" size={20} color="#4C5058" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-[#4C5058]">My Order</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("UserScreen")}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className="px-4 py-3 bg-white mt-2 space-y-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row space-x-2 items-center">
          <FontistoIcon name="stopwatch" size={30} color="#4C5058" />
          <View>
            <Text className="text-lg font-semibold text-[#4C5058]">My Orders</Text>
            <Text>Shipment of 80 item(s)</Text>
          </View>
        </View>
        <View>
          <View className="flex-row justify-between items-center bg-[#F8F8F8] p-3 rounded-lg">
            <View className="border border-gray-200 rounded-xl p-1">
              <Image
                source={{
                  uri: "https://i.postimg.cc/D0BvgPWG/download.webp",
                }}
                className="w-20 h-20"
              />
            </View>
            <View className="flex-1 mx-3">
              <Text className="w-48 h-auto text-[15px] text-[#4C5058] font-semibold">
                Man Avatar
              </Text>
              <Text className="text-sm">That is very good!</Text>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ fontWeight: "500", color: "#4C5058" }}>₹80</Text>
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    color: "#7D8288",
                  }}
                >
                  ₹80
                </Text>
              </View>
            </View>

            <View className="flex-col items-center rounded-lg">
              <TouchableOpacity className="px-2 py-1 bg-[#FF7622] w-full flex justify-center items-center rounded-md font-medium">
                <Text className="text-white text-[15px] font-medium">Done</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-2 py-1 mt-1 w-full flex justify-center items-center rounded-md font-medium"
                style={{ borderColor: "#FF7622", borderWidth: 1 }}
              >
                <Text className="text-[#4C5058] text-[15px] font-medium">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "white",
    zIndex: 50,
  },
};

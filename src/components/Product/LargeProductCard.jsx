import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Fontisto";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, cleanCart } from "../../features/cartSlice";
import {SERVER_URL} from "@env"


export default function LargeProductCard({ product, shopId }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleAddToCart = (product, quantity) => {
    dispatch(addProduct({ product, quantity }));
  };

  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercent / 100)
  );
  return (
    <View className="bg-white rounded-md p-2">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductDetailsScreen", {
            productItem: product,
            shopId: shopId
          });
        }}
      >
        <Image
          source={{ uri: `${SERVER_URL}/${product.image[0]}` }}
          alt={product.name}
          className="w-40 h-40"
        />
      </TouchableOpacity>
      <View className="flex flex-row items-center bg-[#F4F5F9] w-20 px-2 rounded-md">
        <Icon name="stopwatch" size={11} color="#000" />
        <Text className="text-sm">17 Mins</Text>
      </View>
      <Text className="w-40 h-8 text-[#333333] font-semibold">{`${product.name.substring(
        0,
        43
      )} ${product.name.length > 43 ? "..." : ""}`}</Text>
      <Text className="text-[#7D8288]">{`${product.description.substring(
        0,
        43
      )} ${product.description.length > 43 ? "..." : ""}`}</Text>
      <View className="flex-row justify-between items-center">
        <View>
          {product.discountPercent > 0 ? (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "500" }}>₹{discountedPrice}</Text>
              <Text
                style={{ textDecorationLine: "line-through", color: "#7D8288" }}
              >
                ₹{product.price}
              </Text>
            </View>
          ) : (
            <Text style={{ fontWeight: "500" }}>₹{product.price}</Text>
          )}
        </View>
        <TouchableOpacity
          className="border border-[#539645] rounded-md px-2 py-1"
          onPress={() => handleAddToCart(product, 1)}
        >
          <Text className="text-[#539645] font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
      {product.discountPercent > 0 && (
        <View className="absolute top-0 right-0" style={{ zIndex: 1000 }}>
          <Image
            source={require("../../../assets/discount-badge.png")} // Use your local image file path here
            style={{ width: 55, height: 55, zIndex: 40 }} // Adjust the size as needed
          />
          <View
            className="absolute text-white font-bold text-center"
            style={{
              zIndex: 50, // Ensures the text is above the badge
              top: "13%", // Centering the text vertically
              left: "30%", // Centering the text horizontally
            }}
          >
            <Text style={{ fontSize: 10, color: "white", fontWeight: "500" }}>
              {product.discountPercent}%
            </Text>
            <Text style={{ fontSize: 10, color: "white", fontWeight: "500" }}>
              OFF
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import { useDispatch } from "react-redux";
import {
  addProduct,
  updateCartToast
} from "../../features/cartSlice";
import { IMAGE_URL } from "@env"


export default function ProductCard({ productItem, shopId }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addOrUpdateProductInStorage = async (product) => {
    try {
      const savedProducts = await AsyncStorage.getItem("cartProducts");
      let productsArray = savedProducts ? JSON.parse(savedProducts) : [];
      const existingProduct = productsArray.find((p) => p._id === product._id);

      if (existingProduct) {
        productsArray = productsArray.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        productsArray.push({ ...product, quantity: 1 });
      }
      await AsyncStorage.setItem("cartProducts", JSON.stringify(productsArray));
    } catch (error) {
      console.error("Error updating product in AsyncStorage:", error);
    }
  };

  const handleAddToCart = (productItem) => {
    dispatch(addProduct({ product: productItem }));
    dispatch(updateCartToast(true));

    addOrUpdateProductInStorage(productItem);
  };

  const discountedPrice = Math.round(
    productItem.price * (1 - productItem.discountPercent / 100)
  );

  return (
    <View key={productItem._id} className="space-y-2">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductDetailsScreen", {
            productItem: productItem,
            shopId: shopId
          });
        }}
      >
        <View className="p-2 border border-[#F3F3F3] rounded-md">
          <Image
            source={{
              uri: `${IMAGE_URL}/${productItem.image[0]}`,
            }}
            alt={productItem.name}
            className="w-28 h-28"
          />
        </View>
      </TouchableOpacity>
      <View className="flex flex-row items-center bg-[#F4F5F9] w-20 px-2 rounded-md">
        <Icon name="stopwatch" size={11} color="#000" />
        <Text className="text-sm">17 Mins</Text>
      </View>
      <Text className="w-32 h-8 text-[#333333] font-semibold">
        {`${productItem.name.substring(0, 25)} ${productItem.name.length > 25 ? "..." : ""
          }`}
      </Text>

      <View className="flex-row justify-between items-center">
        <View>
          {productItem.discountPercent > 0 ? (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "500" }}>₹{discountedPrice}</Text>
              <Text
                style={{ textDecorationLine: "line-through", color: "#7D8288" }}
              >
                ₹{productItem.price}
              </Text>
            </View>
          ) : (
            <Text style={{ fontWeight: "500" }}>₹{productItem.price}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => handleAddToCart(productItem)}
          className="border border-[#539645] rounded-md px-2 py-1"
        >
          <Text className="text-[#539645] font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      {productItem.discountPercent > 0 && (
        <View className="absolute top-0 right-0" style={{ zIndex: 1000 }}>
          <Image
            source={require("../../../assets/discount-badge.png")} // Use your local image file path here
            style={{ width: 45, height: 45, zIndex: 40 }} // Adjust the size as needed
          />
          <View
            className="absolute text-white font-bold text-center"
            style={{
              zIndex: 50, // Ensures the text is above the badge
              top: "13%", // Centering the text vertically
              left: "30%", // Centering the text horizontally
            }}
          >
            <Text style={{ fontSize: 8, color: "white", fontWeight: "500" }}>
              {productItem.discountPercent}%
            </Text>
            <Text style={{ fontSize: 8, color: "white", fontWeight: "500" }}>
              OFF
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

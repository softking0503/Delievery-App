import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { updateCartToast } from "../../features/cartSlice"; // Import the new action
import { SERVER_URL } from "@env"

export default function CartToast() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { products, totalQuantity, totalPrice, CartToast } = useSelector(
    (state) => state.cart
  );

  // Hide if no products in the cart
  if (products.length < 1 || !CartToast) {
    return null;
  }

  return (
    <View style={styles.container} className="mx-2">
      <TouchableOpacity
        onPress={() => {
          // Dispatch the action to hide the CartToast
          dispatch(updateCartToast(false));
          navigation.navigate("CartScreen");
        }}
      >
        <View className="flex-row justify-between items-center bg-green-500 px-2 py-2 rounded-lg">
          <View className="flex-row items-center space-x-2">
            <View>
              {products.length >= 1 && (
                <Image
                  source={{
                    uri: `${SERVER_URL}/${products[products.length - 1].image[0]
                      }`,
                  }}
                  alt={products[0].name} // Show the name of the last product.
                  className="w-10 h-10 rounded-lg"
                />
              )}
            </View>
            <View>
              <Text className="text-white">{totalQuantity} Items</Text>
              <Text className="text-white">₹ {totalPrice}</Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-2">
            <Text className="text-white">View Cart</Text>
            <Text>
              <Icon name="caretright" size={10} color="#fff" />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
};


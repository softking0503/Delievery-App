import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const OrderDetailsPage = ({ route }) => {
  const { orderId, customerName, orderDate, orders, totalPrice } = route.params;
  const [OrderDetail, setOrderDetail] = useState([]);
  const [OrderList, setOrderList] = useState([]);
  useEffect(() => {
    setOrderDetail(orders.items);
    setOrderList(orders)
  }, [])

  const navigation = useNavigation();

  return (
    <ScrollView>
      <>
        <View className="mt-12 px-4">
          <View className="w-full py-2 px-2 flex flex-row items-center justify-between mb-3 bg-white rounded-md shadow-sm">
            <View className="flex flex-row items-center">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="mr-2"
              >
                <Icon name="arrow-left" size={20} color="#4b5563" />
              </TouchableOpacity>
              <Text className="font-bold text-xl text-gray-600">
                Order Details
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text className="text-[#FF8C42] font-bold"
                  onPress={() => {
                    navigation.navigate('GoogleMp',
                      {
                        OrderMap: OrderList
                      });
                  }}
                >View Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-4 mb-4">
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <View className="flex flex-row items-center gap-2">
              <Text className="font-semibold text-lg text-gray-600">Order ID:</Text>
              <Text className="text-[15px] font-medium text-gray-600">{orderId}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Text className="font-semibold text-lg text-gray-600">Customer Name:</Text>
              <Text className="text-[15px] font-medium text-gray-600">{customerName}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Text className="font-semibold text-lg text-gray-600">Order Date:</Text>
              <Text className="text-[15px] font-medium text-gray-600">{orderDate}</Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Text className="font-semibold text-lg text-gray-600">Status:</Text>
              <Text className="text-[15px] font-medium text-gray-600">{orders.status}</Text>
            </View>

            <View className="flex flex-col justify-start">
              <Text className="font-semibold text-lg text-gray-600">Customer Address:</Text>
              <Text className="text-[15px] font-medium text-gray-600">123 Main St, New York, NY 1000</Text>
            </View>
          </View>
        </View>
      </>
      <View className="px-4">
        <View className="bg-white p-2 rounded-lg shadow-sm mb-4">
          <View className="flex flex-row p-2 pb-0 pt-2 justify-between items-center w-full">
            <Text className="font-bold text-lg mb-2 text-gray-600">Items</Text>
            <View className="flex-row items-center justify-center">
              <Text className="text-lg font-bold text-right mr-2 text-gray-600">Total:</Text>
              <Text className="font-semibold text-sm text-gray-600">${totalPrice}</Text>
            </View>
          </View>

          <View className="border-b border-gray-200 mb-2 flex-row py-2 bg-gray-100 rounded-lg">
            <Text className="flex-1 text-base font-semibold text-center text-gray-600">Product</Text>
            <Text className="flex-1 text-base font-semibold text-center text-gray-600">Quantity</Text>
            <Text className="flex-1 text-base font-semibold text-center text-gray-600">Price</Text>
            <Text className="flex-1 text-base font-semibold text-center text-gray-600">Total</Text>
          </View>

          <View className="flex-col">
            {OrderDetail && OrderDetail.map((OrderDetailItem, index) => {
              return (
                <View key={OrderDetailItem._id || index} className="flex-row py-2 border-b border-gray-200">
                  <Text
                    className="flex-1 text-base text-center text-gray-600"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {OrderDetailItem.productId.name}
                  </Text>
                  <Text className="flex-1 text-base text-center text-gray-600">{OrderDetailItem.quantity}</Text>
                  <Text className="flex-1 text-base text-center text-gray-600">${OrderDetailItem.price}</Text>
                  <Text className="flex-1 text-base text-center text-gray-600">${OrderDetailItem.price * OrderDetailItem.quantity}</Text>
                </View>
              )
            })}
          </View>
        </View>
        <View className="bg-white p-2 rounded-lg shadow-sm mb-4">
          <View>
            <Text className="font-bold text-lg mb-2 text-gray-600">Order Summary</Text>
            <View className="border-b border-gray-200 mb-2" />
            <View className="p-2">
              <View className="flex-row justify-between mb-2">
                <Text className="text-lg text-gray-600">Subtotal</Text>
                <Text className="text-lg text-gray-600">${totalPrice}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-lg text-gray-600">Shipping</Text>
                <Text className="text-lg text-gray-600">$2.00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold text-lg text-gray-600">Total</Text>
                <Text className="font-bold text-lg text-gray-600">
                  ${totalPrice + 2}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

export default OrderDetailsPage;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getOrders } from '../../api1/OrderAPI';
import { IMAGE_URL } from "@env"

const OrderList = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const featureOrders = async () => {
      try {
        const result = await getOrders();
        setOrders(result.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    featureOrders();
  }, []);

  return (
    <View className="mt-2 px-0">
      <View className="flex justify-between items-center flex-row mb-2 px-2">
        <Text className="text-xl font-semibold text-gray-600">Orders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DeliveriesScreen')}>
          <Text className="text-[#539645] font-medium">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-[#F3F4F8] px-2 pt-2 pb-0 rounded-lg">
        {orders.length === 0 ? (
          <View className="p-6">
            <Text className="text-gray-500 text-center">There are no orders to display.</Text>
          </View>
        ) : (
          orders.slice(0, 5).map((orderItem, index) => {
            const firstItem = orderItem.items && orderItem.items[0];
            const imageUrl = firstItem ? `${IMAGE_URL}/${firstItem.productId.image[0]}` : 'https://via.placeholder.com/150';
            return (
              <TouchableOpacity
                key={orderItem._id || index}
                className="bg-white rounded-lg p-2 flex-row items-center shadow-sm mb-2"
                onPress={() => {
                  navigation.navigate('OrderDetailsPage',
                    {
                      orderId: orderItem._id,
                      customerName: orderItem.customer?.username,
                      orderDate: orderItem.updated_at,
                      orders: orderItem,
                      totalPrice: orderItem.totalPrice
                    });
                }}
              >
                <View className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image source={{ uri: 'https://i.postimg.cc/rwj0LpfX/man.jpg' }} className="w-full h-full" />
                </View>
                <View className="flex-1 flex-col">
                  <Text className="font-bold text-lg text-gray-800">
                    {orderItem.customer?.username || 'Unknown User'}
                  </Text>
                  <Text className="text-sm text-gray-500">{new Date(orderItem.updated_at).toLocaleString()}</Text>
                  <Text className="text-sm text-gray-500">Total: ${orderItem.totalPrice}</Text>
                </View>
                <View className="w-16 h-16 rounded-md overflow-hidden ml-4">
                  <Image source={{ uri: imageUrl }} className="w-full h-full" />
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
};

export default OrderList;

// import React, { useEffect, useState } from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import FontistoIcon from "react-native-vector-icons/Fontisto";
// import { useNavigation } from "@react-navigation/native";
// import { getOrders } from "../api1/OrderAPI";
// import { IMAGE_URL } from "@env"

// export default function DeliveriesScreen() {
//   const navigation = useNavigation();

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const featureOrders = async () => {
//       try {
//         const result = await getOrders();
//         setOrders(result.data.orders);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };
//     featureOrders();
//   }, []);

//   return (
//     <View className="mt-8 flex-1 p-2">
//       <View className="flex flex-row items-center justify-between py-3 px-3 bg-white rounded-md">
//         <View className="flex flex-row items-center space-x-3">
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Icon name="arrow-left" size={20} color="#4C5058" />
//           </TouchableOpacity>
//           <Text className="text-lg font-semibold text-[#4C5058]">Deliveries</Text>
//         </View>
//       </View>
//       <ScrollView className="px-4 py-3 bg-white mt-2 space-y-4 rounded-md" contentContainerStyle={{ paddingBottom: 100 }}>
//         {orders.length === 0 ? (
//           <View className="p-6">
//             <Text className="text-gray-500 text-center">There are no orders to display.</Text>
//           </View>
//         ) : (
//           orders.slice(0, 5).map((orderItem, index) => {
//             const firstItem = orderItem.items && orderItem.items[0];
//             const imageUrl = firstItem ? `${IMAGE_URL}/${firstItem.productId.image[0]}` : 'https://via.placeholder.com/150';
//             return (
//               <View key={orderItem._id || index}>
//                 <View className="flex-row space-x-2 items-center mb-2">
//                   <FontistoIcon name="stopwatch" size={30} color="#4C5058" />
//                   <View>
//                     <Text className="text-lg font-semibold text-[#4C5058]">All Deliveries</Text>
//                     <Text className="text-[15px] font-medium text-[#4C5058]">
//                       Currently <Text className="text-[#FF8C42] font-bold">{orders.length} orders</Text> are displayed.
//                     </Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity
//                   key={orderItem._id || index}
//                   className="bg-[#F3F4F8] rounded-lg p-2 flex-row items-center shadow-sm mb-2"
//                   onPress={() => {
//                     navigation.navigate('OrderDetailsPage',
//                       {
//                         orderId: orderItem._id,
//                         customerName: orderItem.customer?.username,
//                         orderDate: orderItem.updated_at,
//                         orders: orderItem,
//                         totalPrice: orderItem.totalPrice
//                       });
//                   }}
//                 >
//                   <View className="w-12 h-12 rounded-full overflow-hidden mr-4">
//                     <Image source={{ uri: 'https://i.postimg.cc/rwj0LpfX/man.jpg' }} className="w-full h-full" />
//                   </View>
//                   <View className="flex-1 flex-col">
//                     <Text className="font-bold text-lg text-gray-800">
//                       {orderItem.customer?.username || 'Unknown User'}
//                     </Text>
//                     <Text className="text-sm text-gray-500">{new Date(orderItem.updated_at).toLocaleString()}</Text>
//                     <Text className="text-sm text-gray-500">Total: ${orderItem.totalPrice}</Text>
//                   </View>
//                   <View className="w-16 h-16 rounded-md overflow-hidden ml-4">
//                     <Image source={{ uri: imageUrl }} className="w-full h-full" />
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             );
//           })
//         )}

//       </ScrollView>
//     </View>
//   );
// }





import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { getOrders } from "../api1/OrderAPI";
import { IMAGE_URL } from "@env";

export default function DeliveriesScreen() {
  const navigation = useNavigation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const featureOrders = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const result = await getOrders();
        setOrders(result.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      }
    };
    featureOrders();
  }, []);

  return (
    <View className="mt-8 flex-1 p-2">
      <View className="flex flex-row items-center justify-between py-3 px-3 bg-white rounded-md">
        <View className="flex flex-row items-center space-x-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#4C5058" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-[#4C5058]">Deliveries</Text>
        </View>
      </View>

      {loading ? ( // Show loader while data is being fetched
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4C5058" />
          <Text className="text-gray-500 mt-2">Loading orders...</Text>
        </View>
      ) : (
        <ScrollView className="px-4 py-3 bg-white mt-2 space-y-4 rounded-md" contentContainerStyle={{ paddingBottom: 100 }}>
          {orders.length === 0 ? (
            <View className="p-6">
              <Text className="text-gray-500 text-center">There are no orders to display.</Text>
            </View>
          ) : (
            orders.slice(0, 5).map((orderItem, index) => {
              const firstItem = orderItem.items && orderItem.items[0];
              const imageUrl = firstItem ? `${IMAGE_URL}/${firstItem.productId.image[0]}` : 'https://via.placeholder.com/150';
              return (
                <View key={orderItem._id || index}>
                  <View className="flex-row space-x-2 items-center mb-2">
                    <FontistoIcon name="stopwatch" size={30} color="#4C5058" />
                    <View>
                      <Text className="text-lg font-semibold text-[#4C5058]">All Deliveries</Text>
                      <Text className="text-[15px] font-medium text-[#4C5058]">
                        Currently <Text className="text-[#FF8C42] font-bold">{orders.length} orders</Text> are displayed.
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    key={orderItem._id || index}
                    className="bg-[#F3F4F8] rounded-lg p-2 flex-row items-center shadow-sm mb-2"
                    onPress={() => {
                      navigation.navigate("OrderDetailsPage", {
                        orderId: orderItem._id,
                        customerName: orderItem.customer?.username,
                        orderDate: orderItem.updated_at,
                        orders: orderItem,
                        totalPrice: orderItem.totalPrice,
                      });
                    }}
                  >
                    <View className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image source={{ uri: 'https://i.postimg.cc/rwj0LpfX/man.jpg' }} className="w-full h-full" />
                    </View>
                    <View className="flex-1 flex-col">
                      <Text className="font-bold text-lg text-gray-800">
                        {orderItem.customer?.username || "Unknown User"}
                      </Text>
                      <Text className="text-sm text-gray-500">{new Date(orderItem.updated_at).toLocaleString()}</Text>
                      <Text className="text-sm text-gray-500">Total: ${orderItem.totalPrice}</Text>
                    </View>
                    <View className="w-16 h-16 rounded-md overflow-hidden ml-4">
                      <Image source={{ uri: imageUrl }} className="w-full h-full" />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
}

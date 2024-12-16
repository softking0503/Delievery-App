import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DataHistoryPage = () => {
  const navigation = useNavigation();

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setData((prevData) => prevData.filter());
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="flex flex-row items-center justify-between py-3 px-3 bg-white rounded-md mt-10 mb-3">
        <View className="flex flex-row items-center space-x-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#4C5058" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-[#4C5058]">Deliveries</Text>
        </View>
      </View>

      {/* List Container */}
      <ScrollView className="pb-5">
        {/* Card Item */}
        <View className="bg-white p-2 rounded-lg mb-4 shadow-md flex flex-row items-center justify-between relative">
          {/* Card Content */}
          <View className="flex-1">
            <View className="flex-row justify-between mb-2">
              <Text className="text-lg font-bold text-gray-800">Order #101</Text>
              <Text className="text-sm text-gray-500">23/09/2024</Text>
            </View>
            <Text className="text-base text-gray-600 mb-1">Order delivered</Text>
            <Text className="text-sm text-orange-500 font-bold">Delivered</Text>
          </View>

          {/* Delete Button */}
          <TouchableOpacity onPress={() => handleDelete()} className="absolute top-[50px] right-[30px]">
            <FeatherIcon name="trash-2" size={20} color="#ff5252" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DataHistoryPage;

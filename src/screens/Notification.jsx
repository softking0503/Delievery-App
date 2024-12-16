import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function NotificationsScreen() {
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
        <View className="flex-1 bg-white p-3">
            {/* Header */}
            <View className="flex-row space-x-3 items-center p-2 bg-white rounded-md mt-10">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="#4C5058" />
                </TouchableOpacity>
                <Text className="text-[23px] font-medium text-[#4C5058]">Notification</Text>
            </View>

            {/* Subheader */}
            <View className="mt-3 mb-3 ml-3">
                <Text className="text-[15px] font-medium text-[#4C5058]">
                    Currently <Text className="text-[#FF8C42] font-bold">8 notifications</Text> are displayed.
                </Text>
            </View>

            {/* Notifications List */}
            <View className="bg-[#F3F4F8] px-4 py-2 mb-4 rounded-lg">
                <View className="flex-row items-center py-2">
                    <Image source={{ uri: 'https://via.placeholder.com/150' }} className="w-12 h-12 rounded-full mr-4" />
                    <View className="flex-1">
                        <Text className="text-lg text-[#4C5058] font-bold">Tanbir Ahmed</Text>
                        <Text className="text-[#555]">Placed a new order</Text>
                        <Text className="text-sm text-[#999] mt-1">20 min ago</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => handleDelete()} className="absolute top-[50px] right-[30px]">
                    <FeatherIcon name="trash-2" size={20} color="#ff5252" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

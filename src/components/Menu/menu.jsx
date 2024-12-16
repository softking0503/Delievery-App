import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can use any icon package
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
export default function MenuScreen() {
    const navigation = useNavigation();
    const { userId, firstName, lastName, email } = useSelector(
        (state) => state.user
    );

    return (
        <View>
            <Text className="text-xl font-semibold text-gray-600">User Information</Text>
            <View style={styles.container}>
                <View style={styles.userInfo}>
                    <View className="flex justify-center items-center ml-2 mr-2">
                        <Image
                            source={{ uri: 'https://i.postimg.cc/rwj0LpfX/man.jpg' }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.userName}>
                            {capitalizeFirstLetter(firstName)} {capitalizeFirstLetter(lastName)}
                        </Text>
                    </View>
                </View>

                <View style={styles.menuGrid}>
                    <View className="w-[35%]">
                        <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#6B5420' }]} onPress={() => navigation.navigate("UserScreen")}>
                            <Icon name="file-tray-full" size={30} color="#fff" />
                            <Text style={styles.menuText}>My Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#4D6B22' }]} onPress={() => navigation.navigate("NotificationsScreen")}>
                            <Icon name="notifications-outline" size={30} color="#fff" />
                            <Text style={styles.menuText}>Notification</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="w-[35%]">
                        <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#245973' }]}
                            onPress={() => {
                                navigation.navigate("AddressScreen", { userId });
                            }}>
                            <Icon name="map-outline" size={30} color="#fff" />
                            <Text style={styles.menuText}>Address</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.menuItem, { backgroundColor: '#5A1B29' }]} onPress={() => navigation.navigate("DeliveriesScreen")}>
                            <Icon name="file-tray-stacked" size={30} color="#fff" />
                            <Text style={styles.menuText}>Deliveries</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5,
        backgroundColor: '#F3F4F8',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    userInfo: {
        width: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 5
    },
    userName: {
        fontSize: 15,
        color: '#575555',
        fontWeight: 'bold',
        width: '100%'
    },
    location: {
        fontSize: 14,
        color: '#575555',
        marginTop: 5,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuGrid: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 10
    },
    menuItem: {
        height: 100,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    menuText: {
        fontSize: 14,
        color: '#fff',
        marginTop: 10,
    },
});

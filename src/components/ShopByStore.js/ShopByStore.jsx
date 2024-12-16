import React from "react";
import { Image, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function ShopByStore() {
  return (
    <View style={{ padding: 16, marginTop: 32, backgroundColor: '#E6FFFA', borderRadius: 16 }}>
      {/* Text Section */}
      <View>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Get the bellybasket app</Text>
        
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Icon name="checkmark-circle" size={24} color="#34D399" style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16 }}>Miss live order tracking</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="checkmark-circle" size={24} color="#34D399" style={{ marginRight: 12 }} />
            <Text style={{ fontSize: 16 }}>Miss latest feature updates</Text>
          </View>
        </View>
      </View>

      {/* QR Code Section */}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#C7F9E8', padding: 16, borderRadius: 16 }}>
        <Image
          source={require('../../../assets/qrcode.png')} // Adjust the path according to your project structure
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        />
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontWeight: '800', fontSize: 18 }}>Simple way to download the BellyBasket App</Text>
          <Text style={{ fontSize: 14 }}>Scan QR code and download now</Text>
        </View>
      </View>
    </View>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import brandInFocusData from "../../data/brandInFocusData";

const { width } = Dimensions.get("window");

export default function BrandFocus() {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % brandInFocusData.length;
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const handleScroll = (direction) => {
    let newIndex = currentIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % brandInFocusData.length;
    } else if (direction === 'prev') {
      newIndex = (currentIndex - 1 + brandInFocusData.length) % brandInFocusData.length;
    }
    setCurrentIndex(newIndex);
    scrollViewRef.current.scrollTo({ x: newIndex * width, animated: true });
  };

  return (
    <View className="space-y-2" style={{ position: 'relative', width, height: 250 }}>
      <Text className="text-xl font-semibold">Brands in focus</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width, height: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }} // Center content vertically
      >
        {brandInFocusData.map((brandInFocus) => (
          <View
            key={brandInFocus.id}
            style={{
              width, // Full width of the screen
              justifyContent: 'center', // Center content horizontally
              alignItems: 'center', // Center content vertically
              height: '100%', // Match the height of the parent container
            }}
          >
            <Image
              source={{ uri: brandInFocus.image }}
              alt={brandInFocus.title}
              style={{
                width: '100%',
                height: '100%', // Fill the height of the parent container
                borderRadius: 5, // Rounded corners if needed
              }}
              resizeMode="cover" // Ensure the image covers the container
            />
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity 
        style={{ 
          position: 'absolute', 
          top: '50%', 
          left: 5, 
          transform: [{ translateY: -10 }], 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          borderRadius: 50, 
          padding: 5,
          zIndex: 1 
        }} 
        onPress={() => handleScroll('prev')}
      >
        <Icon name="chevron-back" size={20} color="#fff" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={{ 
          position: 'absolute', 
          top: '50%', 
          right: 30, 
          transform: [{ translateY: -10 }], 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          borderRadius: 50, 
          padding: 5,
          zIndex: 1 
        }} 
        onPress={() => handleScroll('next')}
      >
        <Icon name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
